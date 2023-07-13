"use client";
import React, { useContext, createContext, useEffect } from "react";
import { useConfig, useDisconnect } from "wagmi";
const AuthContext = createContext<{ logout: () => void }>({} as any);

export const useAuth = () => {
  const authCtx = useContext(AuthContext);
  return authCtx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { disconnectAsync } = useDisconnect();
  const config = useConfig();

  useEffect(() => {
    if (!window) return;
    if (!window.ethereum) return;
    const timeout = setTimeout(async () => {
      try {
        console.log("auto connect");
        const connectingTo = await config.autoConnect();
        console.log(connectingTo);
      } catch (e) {
        console.log("error", e);
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [config]);

  const logout = async () => {
    await disconnectAsync();
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ logout }}>{children}</AuthContext.Provider>
  );
};
