"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const container = cva(["mx-auto my-0 px-8"], {
  variants: {
    size: {
      small: ["max-w-xl"],
      medium: ["max-w-3xl"],
      modal: ["max-w-5xl"],
      large: ["max-w-7xl"],
    },
  },
});

interface IContainerProps extends VariantProps<typeof container> {}

const Container: React.FC<
  IContainerProps & { children: React.ReactNode; className?: string }
> = ({ size, children, className }) => {
  return <div className={container({ size, className })}>{children}</div>;
};

export default Container;
