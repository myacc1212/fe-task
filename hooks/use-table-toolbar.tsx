"use client";
import React from "react";
import {
  DEFAULT_REFRESH_INTERVAL,
  RefreshInterval,
} from "@/components/views/home/constants";
import { Column, VisibilityState } from "@tanstack/react-table";
import { useLocalStorage } from "./use-local-storage";
export type Updater<T> = T | ((old: T) => T);
export type OnChangeFn<T> = (updaterOrValue: Updater<T>) => void;
interface TableToolbarContext {
  refreshInterval: RefreshInterval;
  updateRefreshInterval: (value: RefreshInterval) => void;
  columnVisibility: VisibilityState;
  updateColumnVisibility: OnChangeFn<VisibilityState>;
}
export const TableToolbarContext = React.createContext<TableToolbarContext>(
  {} as TableToolbarContext
);

export const useTableToolbar = () => {
  const context = React.useContext(TableToolbarContext);
  if (context === undefined) {
    throw new Error(
      "useTableToolbar must be used within a TableToolbarProvider"
    );
  }
  return context;
};

interface ToolbarStorage {
  refreshInterval: RefreshInterval;
  columnVisibility: VisibilityState;
}

export function TableToolbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toolbarData, setToolbarData] = useLocalStorage<ToolbarStorage>(
    "toolbarStorage",
    {
      refreshInterval: DEFAULT_REFRESH_INTERVAL,
      columnVisibility: {},
    }
  );

  const updateRefreshInterval = (value: RefreshInterval) => {
    setToolbarData((prev) => ({ ...prev, refreshInterval: value }));
  };

  const updateColumnVisibility = (updaterOrValue: Updater<VisibilityState>) => {
    setToolbarData((prev) => {
      const value =
        typeof updaterOrValue === "function"
          ? updaterOrValue(prev.columnVisibility)
          : updaterOrValue;
      return { ...prev, columnVisibility: value };
    });
  };

  return (
    <TableToolbarContext.Provider
      value={{ ...toolbarData, updateColumnVisibility, updateRefreshInterval }}
    >
      {children}
    </TableToolbarContext.Provider>
  );
}
