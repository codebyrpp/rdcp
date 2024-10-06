import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Delete } from "lucide-react";
import { formatDate } from "@/utils";

export const defaultColumns: ColumnDef<any>[] = [
  // {
  //   id:"Submitted By",
  //   accessorKey: "userId",
  //   header: "Submitted By",
  // },
  {
    id: "submittedTime",
    accessorKey: "submittedTime",
    header: "Submitted At",
    cell: ({ row }) => {
      const formatted = formatDate(row.getValue("submittedTime"))
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: "Remove",
    cell: ({ row }) => {
      const user = row.original;
      return <Button size={"icon"} variant={"icon"}>
        <Delete className="text-red-500" />
      </Button>
    },
  },
];
