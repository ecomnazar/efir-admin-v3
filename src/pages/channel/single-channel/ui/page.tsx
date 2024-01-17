import { deleteChannel, getChannel } from '@/entities/channel/api/channelApi'
import { HistoryCard } from '@/entities/history'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { Button } from '@/shared/ui/button'
import { Hr } from '@/shared/ui/hr'
import { Input } from '@/shared/ui/input'
import { PrimaryLayout, SecondaryLayout } from '@/shared/ui/layouts'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'

interface FormProps {
    name: string;
}

export const SingleChannelPage = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, reset } = useForm<FormProps>()
    const channel = useAppSelector((state) => state.channelSlice.channel.data)
    const loading = useAppSelector((state) => state.channelSlice.channel.loading)

    const onEditChannel = () => { }

    const ondeleteChannel = async () => {
        await dispatch(deleteChannel(id!))
        navigate('/channel/list')
    }

    const onAddChannel = () => navigate(`/history/create/${id}`)

    React.useEffect(() => {
        dispatch(getChannel(id!))
    }, [])

    React.useEffect(() => {
        const defaultValue = {
            name: channel.name
        }
        reset(defaultValue)
    }, [channel])

    return (
        loading ? <div className="text-3xl">Loading...</div> : <div className='flex items-start justify-between flex-wrap'>
            <SecondaryLayout>
                {channel?.avatar ? (
                    <img
                        className="w-[125px] h-[125px] rounded-md object-cover object-center mx-auto"
                        src={channel.avatar}
                    />
                ) : (
                    <div className="w-[125px] h-[125px] rounded-md bg-background mx-auto"></div>
                )}
                <h1 className="text-center text-textColor text-[28px] font-[500]">
                    {channel?.name}
                </h1>
                <Hr />
                <div>
                    <h3 className="text-primary/70 text-[14px]">DETAILS</h3>
                    <div className="flex items-center gap-x-2">
                        <Input register={register} registerName="name" placeholder="Channel name" variant="secondary" />
                    </div>
                    <Button onClick={onEditChannel} className="mt-2 w-full bg-primary/30" title={"Save profile changes"} />
                    <Button onClick={ondeleteChannel} className="mt-2 w-full bg-red/30" title={"Delete channel"} />
                    <Button onClick={onAddChannel} className="mt-2 w-full" title={"Add history"} />
                </div>
            </SecondaryLayout>
            <PrimaryLayout className="grid grid-cols-3 gap-4 mt-4">
                {channel?.stories?.map((story) => {
                    return (
                        <HistoryCard key={story.id} history={story} />
                    )
                })}
                {/*       
      {hasNext && (
        <Button
          loading={loading}
          onClick={loadMore}
          className="mx-auto block mt-4"
          title={"Load more"}
        />
      )} */}
            </PrimaryLayout>
        </div>
    )
}
