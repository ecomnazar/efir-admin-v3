import React from 'react'
import clsx from 'clsx'
import { Loading } from '../loading';
interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    title: string;
}
export const Button: React.FC<ButtonProps> = ({ className, disabled=false, loading=false, title, ...props }) => {
  return (
    <button disabled={loading === true} {...props} className={clsx("relative text-textColor bg-primary text-[14px] h-[40px] rounded-md px-8", className, {
        ['opacity-70']: disabled === true || loading === true
    })}>
        {loading ? <Loading /> : title}
    </button>
  )
}