import clsx from 'clsx'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    title: string;
}

export const Badge = ({ className, title }: Props) => {
    return (
        <div
            className={clsx("inline-block  text-[13px] rounded-md py-1 min-w-[65px] text-center px-3 bg-primary/30", className)}>
            {title}
        </div>
    )
}
