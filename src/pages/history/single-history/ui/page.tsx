import React from "react"
import { deleteHistory, getHistory } from "@/entities/history/api/historyApi"
import { SelectFileButton } from "@/entities/select-file-button"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch"
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { PrimaryLayout, SecondaryLayout } from "@/shared/ui/layouts"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

interface FormProps {
    link: string;
}

export const SingleHistoryPage = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { register, reset } = useForm<FormProps>()
    const loadingHistory = useAppSelector((state) => state.historySlice.history.loading)
    const deleteHistoryLoading = useAppSelector((state) => state.historySlice.deleteHistoryLoading)
    const history = useAppSelector((state) => state.historySlice.history.data)
    const [previewContent, setPreviewContent] = React.useState<(string | File)>()
    const [isVideo, setIsVideo] = React.useState(false)

    const onDelete = () => {
        dispatch(deleteHistory(id!))
        navigate(-1)
    }

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event?.target?.files) {
            setPreviewContent(event.target.files[0])
        }
    };

    React.useEffect(() => {
        dispatch(getHistory(id!))
    }, [])

    React.useEffect(() => {
        const defaultValue: FormProps = {
            link: history?.link || ''
        }
        if (history?.type === 'video') {
            setPreviewContent(history?.video)
            setIsVideo(true)
        } else {
            setPreviewContent(history?.image)
        }
        reset(defaultValue)
    }, [history])

    const classNames = "rounded-md aspect-[9/16] object-cover object-center"
    let formatedImage;
    if (previewContent) {
        formatedImage = typeof (previewContent) === 'string' ? previewContent : URL.createObjectURL(previewContent || '')
    }

    return (
        loadingHistory ? <div className="text-3xl">Loading...</div> :
            <div><PrimaryLayout className="">
                <div className="flex items-center justify-between flex-wrap">
                    <h2 className="text-lg">Edit history</h2>
                </div>
                <div className="gap-x-4 grid grid-cols-2">
                    <Input
                        register={register('link')}
                        labelText="Link"
                        variant="secondary"
                        placeholder="Link"
                    />
                </div>
                <Button
                    onClick={onDelete}
                    className="mt-2 !bg-red/30"
                    title={"Delete"}
                    loading={deleteHistoryLoading}
                />
            </PrimaryLayout>
                <SecondaryLayout className="mt-4">
                    <div className="flex items-center gap-x-2">
                        <Badge title={isVideo ? 'Video' : 'Image'} />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        <div className="rounded-md bg-background p-2">
                            {history.type === 'video' ?
                                <video className={classNames} src={formatedImage} controls /> :
                                <img className={classNames} src={formatedImage} />}
                        </div>
                    </div>
                    <SelectFileButton onFileChange={onFileChange} contentType={isVideo ? 'video' : 'image'} isMultiple={false} />
                </SecondaryLayout></div>
    )
}
