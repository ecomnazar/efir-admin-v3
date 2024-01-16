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
    const [isVideo, setIsVideo] = React.useState()
    const [images, setImages] = React.useState<File[]>([]);
    const loadingHistory = useAppSelector((state) => state.historySlice.history.loading)

    const history = useAppSelector((state) => state.historySlice.history.data)

    const onSubmit = () => {

    }

    const onChangeContentType = () => {

    }

    const onFileChange = () => { }

    React.useEffect(() => {
        dispatch(getHistory(id!))
    }, [])

    React.useEffect(() => {
        const defaultValue: FormProps = {
            link: history?.link
        }
        //@ts-ignore
        setImages([history.image])
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
                        <Switch
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
                        </Switch>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {images &&
                            images.map((image, i) => {
                                return (
                                    <div key={i} className="rounded-md bg-background p-2">
                                        {isVideo ? <video
                                            controls
                                            className="rounded-md aspect-square object-cover object-center"
                                            src={URL.createObjectURL(image)}
                                        /> : <img
                                            className="rounded-md aspect-square object-cover object-center"
                                            src={image}
                                        />}
                                        <Hr className="!my-2" />
                                        <button
                                            // onClick={() => onDeleteImage(i)}
                                            className="text-[13px] text-center mx-auto block"
                                        >
                                            Delete file
                                        </button>
                                    </div>
                                );
                            })}
                    </div>
                    <SelectFileButton onFileChange={onFileChange} contentType={isVideo ? 'video' : 'image'} />
                </SecondaryLayout></div>
    )
}
