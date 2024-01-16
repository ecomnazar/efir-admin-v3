import clsx from "clsx";
import React from "react"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const PrimaryLayout = ({ className, children }: Props) => {
  return (
    <div className={clsx("bg-secondary basis-[100%] rounded-md p-4", className)}>{children}</div>
  )
}