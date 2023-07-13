"use client";
import { configureChains, createConfig } from "wagmi";
import { arbitrum, optimism, mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";

// Connector Names
export enum CONNECTOR_NAMES {
  MetamaskConnector = "MetamaskConnector",
}

export interface IConnectorsByWallet {
  name: string;
  icon: string;
  connectorId: CONNECTOR_NAMES;
  connector?: MetaMaskConnector;
}

const { publicClient, chains } = configureChains(
  [arbitrum, mainnet, optimism],
  [publicProvider()]
);

export const coinbaseConnector = new CoinbaseWalletConnector({
  chains,
  options: {
    appName: "pokedex",
  },
});
export const metaMaskConnector = new MetaMaskConnector({
  chains,
  options: {
    shimDisconnect: true,
  },
});

export const wagmiConfig = createConfig({
  autoConnect: false,
  publicClient,
  connectors: [metaMaskConnector],
});

export const connectors: {
  [connectorName in CONNECTOR_NAMES]: MetaMaskConnector;
} = {
  [CONNECTOR_NAMES.MetamaskConnector]: metaMaskConnector,
};

export const connectorsByWallet: IConnectorsByWallet[] = [
  {
    name: "Metamask",
    icon: "/metamask.svg",
    connectorId: CONNECTOR_NAMES.MetamaskConnector,
    connector: metaMaskConnector,
  },
];
