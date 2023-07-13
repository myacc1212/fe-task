import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export interface Currency {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}
const data: { eur: number; usd: number; gbp: number }[] = [
  {
    eur: 29776.0344,
    usd: 30566.2954,
    gbp: 25540.9519,
  },
];

export interface Time {
  updated: string;
  updatedISO: string;
  updateduk: string;
}

export interface Bpi {
  USD: Currency;
  GBP: Currency;
  EUR: Currency;
}

export interface PriceIndex {
  time: Time;
  disclaimer: string;
  chartName: string;
  bpi: Bpi;
}

const url = "https://api.coindesk.com/v1/bpi/currentprice.json";

const fetchPriceIndex = async () => {
  const res = await fetch(url);
  const data: PriceIndex = await res.json();
  return data;
};

export const useBtcPrice = (options?: UseQueryOptions<PriceIndex, Error>) => {
  return useQuery<PriceIndex, Error>(["priceIndex"], fetchPriceIndex, {
    ...options,
  });
};
