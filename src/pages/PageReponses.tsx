import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import useProjectNavigation from "@/hooks/useProjectNavigation";
import { useParams } from "react-router-dom";
import Loading from "@/components/common/Loading";
import { DataTable } from "@/components/responses/data-table";
import { useGetResponsesMutation } from "@/state/apiSlices/responsesApi";
import { defaultColumns } from "@/components/responses/columns";
import { formatDate } from "@/utils";


type FormRecordData = {
  field: string;
  label: string;
  value: string | undefined;
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
        submittedTime: formatDate(record.createdAt),
        ...record.record.reduce((acc, field) => {
          //@ts-ignore
          acc[field.field] = field.value;
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
        // @ts-ignore
        if (!acc.find((col) => col.accessorKey === field.field)) {
          if (!field.field || !field.value) return;
          // @ts-ignore
          acc.push({
            id: field.field,
            accessorKey: field.field, header: field.label
          });
        }
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
      console.log("Columns", columns);
      console.log("Data", data);
      // @ts-ignore
      setData(data);
      setColumns(columns);
    });

  }, [formId, getResponses]);

  if (isLoading) return <Loading />;

  return (
    <section className="">
      <div className="flex justify-between">
        <BackToProjectButton />
      </div>
      <DataTable columns={columns} data={data} />
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