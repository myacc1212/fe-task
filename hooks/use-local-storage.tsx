"use client";
import { useState } from "react";

type SetStoredValue<T> = (value: T | ((val: T) => T)) => void;
type UseLocalStorageReturn<T> = [T, SetStoredValue<T>];

function isFunction<T>(value: T | ((val: T) => T)): value is (val: T) => T {
  return typeof value === "function";
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue: SetStoredValue<T> = (value) => {
    try {
      const valueToStore = isFunction(value) ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
