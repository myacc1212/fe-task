import { ColumnDef } from "@tanstack/react-table";

export interface Price {
  eur: number;
  usd: number;
  gbp: number;
}

export const priceTableColumns: ColumnDef<Price>[] = [
  {
    accessorKey: "usd",
    header: () => <div className="text-center">USD</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("usd"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium text-center">{formatted}</div>;
    },
  },
  {
    accessorKey: "eur",
    header: () => <div className="text-center">EUR</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("eur"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(amount);

      return <div className="font-medium text-center">{formatted}</div>;
    },
  },
  {
    accessorKey: "gbp",
    header: () => <div className="text-center">GBP</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("gbp"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "GBP",
      }).format(amount);

      return <div className="font-medium text-center">{formatted}</div>;
    },
  },
];
