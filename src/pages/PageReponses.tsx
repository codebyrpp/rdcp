import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import useProjectNavigation from "@/hooks/useProjectNavigation";
import { useParams } from "react-router-dom";
import Loading from "@/components/common/Loading";
import { DataTable } from "@/components/responses/data-table";
import { columns } from "@/components/responses/columns";
import { useGetResponsesMutation } from "@/state/apiSlices/responsesApi";

export function PageResponses() {
  const [data, setData] = useState([]);
  const { formId } = useParams<{ formId: string }>();
  const [getResponses, { isLoading }] = useGetResponsesMutation();
  useEffect(() => {
    if (!formId) return;

    getResponses({ formId }).unwrap().then((res) => {
      setData(res);
      console.log(res);
    });
    
  }, [formId, getResponses]);

  if (isLoading) return <Loading />;

  return (
    <section className="">
      <div className="flex justify-between">
        <BackToProjectButton />
        <div className="flex gap-2">
          <Button variant={"outline"}>
            Export History
          </Button>
          <Button>
            Export Data to CSV
          </Button>
        </div>
      </div>
      {/* <DataTable columns={columns} data={data} /> */}
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