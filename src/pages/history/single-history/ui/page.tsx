import React from "react"
import { getHistory } from "@/entities/history/api/historyApi"
import { SelectFileButton } from "@/entities/select-file-button"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch"
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Hr } from "@/shared/ui/hr"
import { Input } from "@/shared/ui/input"
import { PrimaryLayout, SecondaryLayout } from "@/shared/ui/layouts"
import { Switch } from "@headlessui/react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

interface FormProps {
    link: string;
}

export const SingleHistoryPage = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const { register, handleSubmit, reset } = useForm<FormProps>()
    const [isVideo, setIsVideo] = React.useState(false)
    const loadingHistory = useAppSelector((state) => state.historySlice.history.loading)
    const history = useAppSelector((state) => state.historySlice.history.data)
    const [previewContent, setPreviewContent] = React.useState<any[]>([])
    const [uploadContent, setUploadContent] = React.useState<any[]>([])

    const onSubmit = () => { }

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event?.target?.files) {
            const uploadFiles = [];
            const previewFiles = [];
            console.log(event.target.files);

            for (let index = 0; index < event.target.files.length; index++) {
                const file = event.target.files[index]
                uploadFiles.push(file);
                previewFiles.push(URL.createObjectURL(file))
            }
            setUploadContent(uploadFiles)
            setPreviewContent(previewFiles)
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
            setPreviewContent([history?.video])
            setUploadContent([history?.video])
            setIsVideo(true)
        } else {
            setPreviewContent([history?.image])
            setUploadContent([history?.image])
        }
        reset(defaultValue)
    }, [history])

    return (
        loadingHistory ? <div className="text-3xl">Loading...</div> :
            <div><PrimaryLayout className="">
                <div className="flex items-center justify-between flex-wrap">
                    <h2 className="text-lg">Edit history</h2>
                </div>
                <div className="gap-x-4 grid grid-cols-2">
                    <Input
                        register={register}
                        registerName="link"
                        labelText="Link"
                        variant="secondary"
                        placeholder="Link"
                    />
                </div>
                <Button
                    onClick={handleSubmit(onSubmit)}
                    className="mt-2"
                    title={"SUBMIT"}
                // loading={loading}
                />
            </PrimaryLayout>
                <SecondaryLayout className="mt-4">
                    <div className="flex items-center gap-x-2">
                        <Badge title={isVideo ? 'Video' : 'Image'} />
                        {/* <Switch
                            checked={isVideo}
                            onChange={onChangeContentType}
                            className={`${isVideo ? 'bg-primary' : 'bg-primary/30'}
    relative inline-flex h-[28px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                        >
                            <span className="sr-only">Use setting</span>
                            <span
                                aria-hidden="true"
                                className={`${isVideo ? 'translate-x-5' : 'translate-x-0'}
      pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                            />
                        </Switch> */}
                    </div>
                    <div className="grid grid-cols-4 gap-2">

                        {previewContent &&
                            previewContent.map((elem, i) => {
                                const classNames = "rounded-md aspect-[9/16] object-cover object-center"
                                return <React.Fragment key={i}>
                                    {history.type === 'video' ?
                                        <video className={classNames} src={elem} controls /> :
                                        <img className={classNames} src={elem} />}
                                </React.Fragment>
                            })
                        }
                    </div>
                    <SelectFileButton onFileChange={onFileChange} contentType={isVideo ? 'video' : 'image'} />
                </SecondaryLayout></div>
    )
}
