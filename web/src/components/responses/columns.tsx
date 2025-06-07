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
    id: "submittedAt",
    accessorKey: "submittedAt",
    header: "Submitted At",
    cell: ({ row }) => {
      return <div className="w-[150px]">
        {row.original.submittedAt}
      </div>;
    }
  },
];
