"use client";
import {
  UseQueryOptions,
  useQuery,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  GetNftsForOwnerOptions,
  Network,
  OwnedNftsResponse,
} from "alchemy-sdk";
import { log } from "console";
import queryString from "query-string";

export type GetUserNftsParams = {
  owner: string;
  network: Network;
  options?: GetNftsForOwnerOptions | undefined;
};
interface Error {
  error: { message: string; stack: string };
}

const fetchUserNfts = async ({
  owner,
  network,
  options,
}: GetUserNftsParams): Promise<OwnedNftsResponse> => {
  const query = queryString.stringify({ owner, network, ...options });

  const res = await fetch(`/api/nfts?${query}`);

  const data = await res.json();
  if (data.error) {
    throw data.error;
  }

  return data;
};

export const useUserNfts = (
  variables: GetUserNftsParams,
  options?: UseQueryOptions<OwnedNftsResponse, Error>
) => {
  return useQuery<OwnedNftsResponse, Error>(
    ["ownedNfts", { ...variables }],
    async () => await fetchUserNfts(variables),
    {
      ...options,
    }
  );
};
