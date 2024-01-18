import React from 'react'

interface Props {
    avatar: string;
}

export const UserAvatar: React.FC<Props> = ({ avatar }) => {
    return (
        avatar ? (
            <img
                className="w-[125px] h-[125px] rounded-md object-cover object-center mx-auto"
                src={avatar}
            />
        ) : (
            <div className="w-[125px] h-[125px] rounded-md bg-background mx-auto"></div>
        )
    )
}
