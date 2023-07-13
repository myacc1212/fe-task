import PriceIndexView from "@/components/views/home/price-index";
import { TableToolbarProvider } from "@/hooks/use-table-toolbar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <TableToolbarProvider>
        <PriceIndexView />
      </TableToolbarProvider>
    </main>
  );
}
