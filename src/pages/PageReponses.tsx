import { Button } from "@/components/ui/button";
import { ReactNode, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import useProjectNavigation from "@/hooks/useProjectNavigation";
import { useParams } from "react-router-dom";
import Loading from "@/components/common/Loading";
import { DataTable } from "@/components/responses/data-table";
import { useGetResponsesMutation } from "@/state/apiSlices/responsesApi";
import { defaultColumns } from "@/components/responses/columns";
import { formatDate } from "@/utils";
import { ElementsType } from "@/components/builder/components/FormElements";


type FormRecordData = {
  field: string;
  label: string;
  value: string | undefined;
  type: ElementsType;
}

type FormRecord = {
  createdAt: string;
  record: FormRecordData[];
  userId: string;
}

export function PageResponses() {
  const [data, setData] = useState([]);
  const { formId } = useParams<{ formId: string }>();
  const [getResponses, { isLoading }] = useGetResponsesMutation();
  const [columns, setColumns] = useState<any>([]);

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

    // create unique columns from the records data label
    // columns is an array of objects with accessor and header
    const columns = records.reduce((acc, record) => {
      record.record.forEach((field) => {

        //@ts-ignore
        if (acc.find((col) => col.accessorKey === field.field))
          return acc;

        if (!field.field || !field.value) return;

        const col = {
          id: field.field,
          accessorKey: field.field,
          header: field.label
        };

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

    return [...columns, ...defaultColumns];
  };

  useEffect(() => {
    if (!formId) return;

    getResponses({ formId }).unwrap().then((res) => {
      const data = processData(res.responses.items as FormRecord[]);
      const columns = prepareColumns(res.responses.items as FormRecord[]);
      // @ts-ignore
      setData(data);
      setColumns(columns);
    });

  }, [formId]);

  if (isLoading) return <Loading />;

  return (
    <section className="">
      <div className="flex justify-between">
        <BackToProjectButton />
      </div>
      <div className="flex">
        <div className="w-3/4">
          <DataTable columns={columns} data={data} />
        </div>
        <div className="flex-1">
          {/* Summary */}
        </div>
      </div>
    </section>
  );
}


export const BackToProjectButton = () => {
  const projectId = useParams<{ projectId: string }>().projectId;
  const { navigateToProject } = useProjectNavigation();

  return (<Button variant={"link"} className="flex gap-2"
    onClick={() => {
      if (projectId)
        navigateToProject(projectId);
    }}
  >
    <FaArrowLeft />
    Back to Project
  </Button>);
}