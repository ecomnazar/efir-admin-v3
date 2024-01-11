import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import React from 'react'
import { useParams } from 'react-router-dom'

export const SingleChannelPage = () => {
    const { id } = useParams()
    // const channel = useAppSelector((state) => state.)


    return (
        <div>SingleChannel {id}</div>
    )
}
