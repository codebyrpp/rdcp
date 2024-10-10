import { Button } from "@/components/ui/button";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import useProjectNavigation from "@/hooks/useProjectNavigation";
import { useParams } from "react-router-dom";
import Loading from "@/components/common/Loading";
import { DataTable } from "@/components/responses/data-table";
import { useGetAllResponsesMutation, useGetResponsesMutation } from "@/state/apiSlices/responsesApi";
import { defaultColumns } from "@/components/responses/columns";
import { formatDate } from "@/utils";
import { ElementsType } from "@/components/builder/components/FormElements";
import { set, sum } from "lodash";
import ClearableSelect from "@/components/common/ClearableSelect";
import ResponsesSummary, { isChartSupportedField } from "@/components/responses/summary";
import { Form } from "@/models/forms";
import { FormPrivacyBadge, FormPublishStateBadge } from "@/components/feats/forms/ListItemForm";


type FormRecordData = {
  field: string;
  label: string;
  value: string | undefined;
  type: ElementsType;
}

export type Field = Pick<FormRecordData, "field" | "label" | "type">;

type FormRecord = {
  createdAt: string;
  record: FormRecordData[];
  userId: string;
}

export type FormSummary = {
  total: number;
}

export function PageResponses() {
  const [data, setData] = useState([]);
  const { formId } = useParams<{ formId: string }>();
  const [getResponses, { isLoading }] = useGetAllResponsesMutation(); //TODO: Change to useGetResponsesMutation
  const [columns, setColumns] = useState<any>([]);
  const [fields, setFields] = useState<Field[]>();
  const [form, setForm] = useState<Form>();
  const [summary, setSummary] = useState<FormSummary>({
    total: 0,
  });

  const processData = (records: FormRecord[]) => {
    const data = records.map((record) => {
      return {
        submittedAt: formatDate(record.createdAt),
        ...record.record.reduce((acc, field) => {
          let value = field.value;
          //@ts-ignore
          acc[field.field] = value;
          return acc;
        }, {}),
        userId: record.userId,
      };
    });
    return data;
  }

  // prepareColumns
  const prepareColumns = (records: FormRecord[]) => {
    const _fields: Field[] = [];
    // create unique columns from the records data label
    // columns is an array of objects with accessor and header
    const columns = records.reduce((acc, record) => {
      record.record.forEach((field) => {

        //@ts-ignore
        if (acc.find((col) => col.accessorKey === field.field))
          return acc;

        if (!field.field) return;

        const col = {
          id: field.field,
          accessorKey: field.field,
          header: field.label
        };

        _fields.push({ field: field.field, type: field.type, label: field.label });

        let cell: any = ({ row }: any) => {
          return <div className="w-[150px]">{row.original[field.field]}</div>;
        };

        if (field.type === "DateField") {
          cell = ({ value }: { value: string }) => <div className="w-[150px]">
            {formatDate(value)}
          </div>;
        } else if (field.type === "FileUploadField") {
          cell = ({ row }: any) => {
            const value = row.original[field.field];
            if (!value) return null;
            return <div className="w-[150px]">
              <Button variant="link" onClick={() => {
                window.open(value, "_blank");
              }}>View</Button>
            </div>
          }
        }

        // @ts-ignore
        acc.push({ ...col, cell });

      });

      return acc;
    }, []);

    setFields(_fields);

    return [...columns, ...defaultColumns];
  };


  useEffect(() => {
    if (!formId) return;

    getResponses({ formId }).unwrap().then((res) => {
      setForm(res.form);
      setSummary({
        total: res.responses.total,
      })
      const data = processData(res.responses.items as FormRecord[]);
      const columns = prepareColumns(res.responses.items as FormRecord[]);
      // @ts-ignore
      setData(data);
      setColumns(columns);
    });

  }, [formId]);

  const chartSupportFields = useMemo(() => {
    return fields?.filter(isChartSupportedField);
  }, [fields]);

  if (isLoading) return <Loading />;

  return (
    <div className="h-full flex flex-col">
      <div className="flex gap-2 items-center">
        <BackToProjectButton />
        {
          isLoading ? <Loading /> : <div className="flex gap-1 items-center">
            <h4 className="text-sm font-semibold mb-0">{form?.name}</h4>
            <FormPrivacyBadge isPrivate={form?.isPrivate!} />
            <FormPublishStateBadge isPublished={form?.isPublished!} />
          </div>
        }
      </div>

      {
        !form?.isPublished && <div className="text-sm text-muted-foreground p-2">
          This form is not published yet.
        </div>
      }
      {
        form?.isPublished && summary.total == 0 && <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-muted-foreground">No responses found</p>
          <p className="text-muted-foreground mb-3">Responses will appear here once submitted</p>
        </div>
      }
      {
        summary.total > 0 && <div className="flex flex-1">
          {/* Form name and description */}
          <div className="w-3/4">
            <DataTable columns={columns} data={data} />
          </div>
          {
            chartSupportFields && <div className="flex-1 ml-4 my-3 ">
              <ResponsesSummary
                summary={summary!}
                formId={formId!}
                fields={chartSupportFields} />
            </div>
          }
        </div>
      }
    </div>
  );
}


export const BackToProjectButton = () => {
  const projectId = useParams<{ projectId: string }>().projectId;
  const { navigateToProject } = useProjectNavigation();

  return (
    <Button variant={"icon"} className="text-sm flex gap-2 p-0"
      onClick={() => {
        if (projectId)
          navigateToProject(projectId);
      }}
    >
      <FaArrowLeft />
      Back to Project /
    </Button>
  );
}