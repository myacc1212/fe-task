"use client";
import React from "react";
import Container from "../../ui/container";
import { Typography } from "../../ui/typography";
import { DataTable } from "./components/data-table";
import { Price, priceTableColumns } from "./components/columns";
import { useBtcPrice } from "@/hooks/use-btc-price";
import { Skeleton } from "../../ui/skeleton";
import { useTableToolbar } from "@/hooks/use-table-toolbar";

const PriceIndexView = () => {
  const { refreshInterval } = useTableToolbar();
  const { data: btcPrice, isLoading } = useBtcPrice({
    refetchInterval: Number(refreshInterval) * 1000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
  });

  const [priceTable, setPriceTable] = React.useState({} as Price[]);
  React.useEffect(() => {
    if (!btcPrice) return;
    if (isLoading) return;

    const newPriceTable = [
      {
        eur: btcPrice.bpi.EUR.rate_float,
        usd: btcPrice.bpi.USD.rate_float,
        gbp: btcPrice.bpi.GBP.rate_float,
      },
    ];
    setPriceTable(newPriceTable);
  }, [btcPrice, isLoading]);
  return (
    <Container size={"large"}>
      <Typography.H3 className="mt-3">BTC Price Index</Typography.H3>
      {isLoading ? (
        <Skeleton className="w-[350px] h-6 mt-3" />
      ) : (
        <Typography.Lead className="mt-3">
          Last Refreshed: {btcPrice?.time.updated}
        </Typography.Lead>
      )}
      {isLoading ? (
        <div className="mt-6">
          <Skeleton className="w-full h-[64px] mt-3" />
          <Skeleton className="w-full h-[32px] mt-3" />
          <Skeleton className="w-full h-[32px] mt-3" />
        </div>
      ) : (
        <DataTable columns={priceTableColumns} data={priceTable} />
      )}
    </Container>
  );
};

export default PriceIndexView;
