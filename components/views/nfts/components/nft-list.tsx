import React from "react";
import Container from "@/components/ui/container";
import NftCard from "./nft-card";
import { OwnedNftsResponse } from "alchemy-sdk";
import { Typography } from "@/components/ui/typography";

interface NftListProps {
  nftList?: OwnedNftsResponse;
}

const NftList: React.FC<NftListProps> = ({ nftList }) => {
  return (
    <Container size={"large"} className="pb-[92px]">
      <Typography.H3 className="my-6 flex items-center">
        NFTs of <Typography.Lead className="ml-2">0x0...123</Typography.Lead>
      </Typography.H3>
      {nftList?.ownedNfts?.length === 0 ? (
        <>No NFTs found</>
      ) : (
        <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          {nftList?.ownedNfts?.map((nft) => (
            <NftCard key={`${nft.contract.address}-${nft.tokenId}`} nft={nft} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default NftList;
