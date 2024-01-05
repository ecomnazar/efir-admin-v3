import clsx from "clsx";

interface Props extends React.HTMLAttributes<HTMLHRElement> {
    className?: string;
}

export const Hr = ({ className }: Props) => {
  return (
    <hr className={clsx("w-full h-[1px] outline-none border-none bg-primary/20 my-4", className)} />
  )
}
