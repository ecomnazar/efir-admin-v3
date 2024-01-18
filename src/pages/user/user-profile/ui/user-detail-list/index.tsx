import React from 'react'

interface Props {
    title: string;
    span?: string | number;
    children?: React.ReactNode;
}

export const UserDetailList: React.FC<Props> = ({ title, span, children }) => {
    return (
        <li className="text-md">{title + ': '}<span className="text-[13px] ml-1">{span}</span>{children}</li>
    )
}
