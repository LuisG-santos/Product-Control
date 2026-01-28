"use client";

import { products } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/app/_components/ui/badge";
import { FaCircle } from "react-icons/fa";

const translateStatus = (status: string) => {
  switch (status) {
    case "in_stock":
      return (
        <Badge className="bg-green-100 text-[#00A180] hover:bg-green-100">
          <FaCircle className="mr-1.5 inline" size={6} />
          Em estoque
        </Badge>
      );
    case "out_of_stock":
      return (
        <Badge className="bg-red-200 text-red-600 hover:bg-red-200">
          <FaCircle className="mr-1.5 inline" size={6} />
          Esgotado
        </Badge>
      );
    default:
      return status;
  }
};

export const productsTableCol: ColumnDef<products>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "price",
    header: "Preço",
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return translateStatus(status);
    },
  },
];
