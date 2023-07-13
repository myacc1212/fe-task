"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useAccount, useConnect } from "wagmi";
import { useAuth } from "@/hooks/use-auth";
import { shortenAddress } from "@/lib/utils";
import { connectors, connectorsByWallet } from "@/config";
import { Dialog, DialogContent, DialogTrigger  } from "@/components/ui/dialog";

const ConnectWallet = () => {
  const { connectAsync } = useConnect();
  const { address, isConnected } = useAccount();
  const { logout } = useAuth();
  const [isHydrated, setIsHydrated] = React.useState(false);
  React.useEffect(() => {
    if (!window) return;
    setIsHydrated(true);
  }, []);
  if (!isHydrated) return null;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="lg">
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div>
          {isConnected ? (
            <>
              <Typography.Lead>{shortenAddress(address)}</Typography.Lead>
              <Button variant="secondary" size="lg" onClick={logout}>
                Connected to {address}
                Disconnect
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              {connectorsByWallet.map((connector) => (
                <Button
                  key={connector.name}
                  onClick={async () => {
                    localStorage.clear();
                    const _current = connectors[connector.connectorId];
                    const response = await connectAsync({
                      connector: _current,
                    });
                    console.log(response);
                  }}
                  variant={"secondary"}
                  size={"lg"}
                  className="flex items-center justify-center gap-2"
                >
                  <img
                    width={32}
                    height={32}
                    src={connector.icon}
                    alt={connector.name}
                  />
                  {connector.name}
                </Button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectWallet;
