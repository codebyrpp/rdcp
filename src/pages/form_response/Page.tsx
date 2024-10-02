import { Button } from "@/components/ui/button";
import { User, columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import useProjectNavigation from "@/hooks/useProjectNavigation";
import { useParams } from "react-router-dom";
import Loading from "@/components/common/Loading";

export default function Page() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://66c47daeb026f3cc6cef91ac.mockapi.io/user"
      );
      const data = await response.json();
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <Loading/>;

  return (
    <section className="">
      <div className="flex justify-between">
        <BackToProjectButton/> 
        <div className="flex gap-2">
          <Button variant={"outline"}>
            Export History
          </Button>
          <Button>
            Export Data to CSV
          </Button>
        </div>
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