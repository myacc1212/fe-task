import React from "react";
import { useUserNfts } from "@/hooks/use-user-nfts";
import { Typography } from "@/components/ui/typography";
import NftCard from "./components/nft-card";
import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Network, NftFilters, NftOrdering } from "alchemy-sdk";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContainerIcon } from "lucide-react";
import { useAccount, useDisconnect } from "wagmi";
import { shortenAddress } from "@/lib/utils";
import ConnectWallet from "./components/connect-wallet";

const UserNfts = () => {
  const [excludeFilters, setExcludeFilters] = React.useState<NftFilters[]>([
    NftFilters.AIRDROPS,
    NftFilters.SPAM,
  ]);
  const { disconnect } = useDisconnect();

  const { isConnected, address: account } = useAccount();
  const [orderBy, setOrderBy] = React.useState<NftOrdering | undefined>(
    NftOrdering.TRANSFERTIME
  );
  const [network, setNetwork] = React.useState<Network>(Network.ETH_MAINNET);

  const { data, isLoading, isFetching, error } = useUserNfts(
    {
      owner: account || "",
      network,
      options: { pageSize: 50, excludeFilters, orderBy },
    },
    { refetchOnWindowFocus: false, retry: false, enabled: !!isConnected }
  );
  if (!isConnected)
    return (
      <Container size={"large"} className="text-center">
        <Typography.H3 className="my-8">
          Please connect your wallet to view your NFTs
        </Typography.H3>
        <ConnectWallet />
      </Container>
    );

  return (
    <Container size={"large"} className="pb-[92px]">
      <header className="my-6 flex items-center">
        <Typography.H3>NFTs of </Typography.H3>
        <Typography.Lead className="ml-2">
          {shortenAddress(account)}
        </Typography.Lead>
        <Button
          variant={"secondary"}
          className="ml-4"
          onClick={() => {
            disconnect();
          }}
        >
          Disconnect
        </Button>
      </header>
      <div className="flex items-center mb-6">
        <Select
          defaultValue={Network.ETH_MAINNET}
          onValueChange={(val) => {
            setNetwork(val as Network);
          }}
          value={network}
        >
          <SelectTrigger className="w-[180px] mr-3">
            <SelectValue placeholder="Select refresh rate" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Refreshes in</SelectLabel>
              <SelectItem value={Network.ETH_MAINNET}>Ethereum</SelectItem>
              <SelectItem value={Network.ARB_MAINNET}>Arbitrum</SelectItem>
              <SelectItem value={Network.OPT_MAINNET}>Optimism</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="default" className="lg:flex">
              <MixerHorizontalIcon className="mr-2 h-4 w-4" />
              Exclude
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Exclude below</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Object.entries(NftFilters).map(([key, value]) => (
              <DropdownMenuCheckboxItem
                key={key}
                checked={excludeFilters.includes(key as NftFilters)}
                onCheckedChange={(val) => {
                  val
                    ? setExcludeFilters(
                        (prev: NftFilters[]) => [...prev, key] as NftFilters[]
                      )
                    : setExcludeFilters((prev) =>
                        prev.filter((v) => v !== key)
                      );
                }}
              >
                {value}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="default" className="lg:flex">
              <ContainerIcon className="mr-2 h-4 w-4" />
              Order By
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Exclude below</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuCheckboxItem
              checked={orderBy === NftOrdering.TRANSFERTIME}
              onCheckedChange={(val) => {
                val
                  ? setOrderBy(NftOrdering.TRANSFERTIME)
                  : setOrderBy(undefined);
              }}
            >
              {NftOrdering.TRANSFERTIME}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {error && <Typography.Lead>{error as unknown as string}</Typography.Lead>}
      {isLoading || isFetching ? (
        <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          {new Array(50).fill("").map((_, i) => (
            <Skeleton key={i} className="w-full h-[500px] sm:h-[250px]" />
          ))}
        </div>
      ) : data?.ownedNfts?.length === 0 ? (
        <Typography.Lead>No NFTs found</Typography.Lead>
      ) : (
        <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          {data?.ownedNfts?.map((nft) => (
            <NftCard key={`${nft.contract.address}-${nft.tokenId}`} nft={nft} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default UserNfts;
