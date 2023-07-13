import React from "react";
import { Typography } from "@/components/ui/typography";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { OwnedNft } from "alchemy-sdk";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
const NftCard: React.FC<{ nft: OwnedNft; key: string }> = ({ nft }) => {
  const collectionImage =
    typeof nft?.contract?.openSea?.imageUrl === "string"
      ? nft.contract.openSea.imageUrl
      : "https://via.placeholder.com/100x100";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <div className="group rounded-xl border-2 border-transparent p-2 outline outline-1 outline-regent-gray-300 transition-all duration-300 hover:cursor-pointer hover:border-indigo-400 hover:outline-0 hover:outline-transparent">
            <figure className="w-full">
              <img
                src={collectionImage}
                alt={nft.title}
                className="block h-auto w-full rounded-xl aspect-square object-cover transition-all duration-300 group-hover:opacity-80"
              />
            </figure>
            <div className="max-w-full px-4 py-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button>
                      <Typography.P className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap break-words transition-all duration-300 group-hover:text-indigo-300 md:max-w-[calc(230px-48px)]">
                        {nft.contract?.name || nft.title}
                      </Typography.P>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <Typography.Small className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap break-words transition-all duration-300 group-hover:text-indigo-300 md:max-w-[calc(230px-48px)]">
                      {nft.contract?.name || nft.title}
                    </Typography.Small>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <figure className="w-full">
            <img
              src={collectionImage}
              alt={nft.title}
              className="block h-auto w-full rounded-xl aspect-square object-cover transition-all duration-300 group-hover:opacity-80"
            />
          </figure>
        </DialogHeader>
        <DialogDescription>
          <ScrollArea className="max-h-[200px] w-[350px] rounded-md border p-4 overflow-auto">
            {nft.description ||
              nft.contract.openSea?.description ||
              "No description found"}
          </ScrollArea>
        </DialogDescription>
        <DialogFooter>
          <Typography.Small>
            Contract address: {nft.contract.address}
          </Typography.Small>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NftCard;
