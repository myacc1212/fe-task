import { NextResponse } from "next/server";
import { Alchemy, NftFilters, NftOrdering } from "alchemy-sdk";
import queryString from "query-string";
import { GetUserNftsParams } from "@/hooks/use-user-nfts";

export async function GET(request: Request) {
  const parsed = queryString.parseUrl(request.url);
  const { owner, network } = parsed.query as unknown as GetUserNftsParams;
  const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network,
  };

  const alchemy = new Alchemy(settings);
  try {
    const response = await alchemy.nft.getNftsForOwner(owner, {
      pageSize: Number(parsed.query.pageSize),
      excludeFilters: parsed.query.excludeFilters as NftFilters[],
      orderBy: (parsed.query.orderBy as NftOrdering) || "",
    });
    return NextResponse.json({ ...response });
  } catch (error) {
    const _error = {
      error: JSON.parse(
        JSON.stringify(error, Object.getOwnPropertyNames(error))
      ).message,
    };

    return NextResponse.json({ ..._error }, { status: 400 });
  }
}
