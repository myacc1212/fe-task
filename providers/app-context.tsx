"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "@/config";
const queryClient = new QueryClient();

export const AppContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiConfig>
  );
};
