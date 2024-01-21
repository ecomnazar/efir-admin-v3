import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteChannel, getChannel, updateChannel } from '@/entities/channel/api/channelApi'
import { HistoryCard } from '@/entities/history'
import { SelectFileButton } from '@/entities/select-file-button'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { Button } from '@/shared/ui/button'
import { Hr } from '@/shared/ui/hr'
import { Input } from '@/shared/ui/input'
import { PrimaryLayout, SecondaryLayout } from '@/shared/ui/layouts'

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
    const updateLoading = useAppSelector((state) => state.channelSlice.updateChannelLoading)
    const deleteLoading = useAppSelector((state) => state.channelSlice.deleteChannelLoading)
    const [previewContent, setPreviewContent] = React.useState<(string | File)[]>([''])

    const onEditChannel: SubmitHandler<FormProps> = async ({ name }) => {
        const fd = new FormData() as FormData;
        fd.append('id', id!)
        fd.append('name', name)
        fd.append('avatar', previewContent[0])
        await dispatch(updateChannel(fd))
    }

    const onDeleteChannel = async () => {
        await dispatch(deleteChannel(id!))
        navigate('/channel/list')
    }

    const onAddChannel = () => navigate(`/history/create/${id}`)

    React.useEffect(() => {
        dispatch(getChannel(id!))
    }, [])

    React.useEffect(() => {
        const defaultValue = {
            name: channel?.name
        }
        setPreviewContent([channel?.avatar!])
        reset(defaultValue)
    }, [channel])

    return (
        loading ? <div className="text-3xl">Loading...</div> : <div className='flex items-start justify-between flex-wrap'>
            <SecondaryLayout>
                {previewContent.length !== 0 ? (
                    <img
                        className="w-[125px] h-[125px] rounded-md object-cover object-center mx-auto"
                        src={typeof (previewContent[0]) === 'object' ? URL.createObjectURL(previewContent[0]) : previewContent[0]}
                    />
                ) : (
                    <div className="w-[125px] h-[125px] rounded-md bg-background mx-auto"></div>
                )}
                <SelectFileButton onFileChange={() => { }} className='w-fit mx-auto block' setPreviewContent={setPreviewContent} isMultiple={false} />
                <h1 className="text-center text-textColor text-[28px] font-[500]">
                    {channel?.name}
                </h1>
                <Hr />
                <div>
                    <h3 className="text-primary/70 text-[14px]">DETAILS</h3>
                    <div className="flex items-center gap-x-2">
                        <Input register={register('name')} placeholder="Channel name" variant="secondary" />
                    </div>
                    <Button onClick={handleSubmit(onEditChannel)} className="mt-2 w-full bg-primary/30" title={"Save profile changes"} loading={updateLoading} />
                    <Button onClick={onDeleteChannel} className="mt-2 w-full bg-red/30" title={"Delete channel"} loading={deleteLoading} />
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
