import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Delete } from "lucide-react";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "submittedTime",
    header: "Submitted Time",
    cell: ({ row }) => {
      const date = new Date(row.getValue("submittedTime"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: "Remove",
    cell: ({ row }) => {
      const user = row.original;
      return <Button size={"icon"}>
        <Delete className="text-red-500" />
      </Button>
    },
  },
];
