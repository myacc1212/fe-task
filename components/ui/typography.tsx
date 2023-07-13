import * as React from "react";
import { cn } from "@/lib/utils";
interface Props {
  children?: React.ReactNode;
  className?: string;
}

function H1({ children, className }: Props) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

function H2({ children, className }: Props) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
}

function H3({ children, className }: Props) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}

function P({ children, className }: Props) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </p>
  );
}

function Lead({ children, className }: Props) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)}>{children}</p>
  );
}

function Large({ children, className }: Props) {
  return (
    <div className={cn("text-lg font-semibold", className)}>{children}</div>
  );
}

function Small({ children, className }: Props) {
  return (
    <small className={cn("text-sm font-medium leading-none", className)}>
      {children}
    </small>
  );
}

function Muted({ children, className }: Props) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}

export const Typography = {
  H1,
  H2,
  H3,
  P,
  Lead,
  Large,
  Small,
  Muted,
};
