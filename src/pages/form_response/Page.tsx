// Page.tsx

import { User, columns } from "./columns";
import { DataTable } from "./data-table";
import logo from "@/assets/logo.svg";
import { useEffect, useState } from "react";

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

  if (loading) return <div>Loading...</div>;

  return (
    <section className="py-24 pt-0">
      <div className="flex justify-center items-center bg-gray-100 p-4 w-full">
        <img src={logo} alt="logo" className="w-16 h-16" />
        <h1 className="text-4xl font-bold text-slate-900 ml-4">
          Research Data Collector Platform
        </h1>
      </div>
      <div className="container mx-auto pt-2 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Form Response</h1>
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
}
