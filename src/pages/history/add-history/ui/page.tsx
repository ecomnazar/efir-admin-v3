import React from 'react'
import { addHistoryImage } from '@/entities/history/api/historyApi'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useNavigate, useParams } from 'react-router-dom'
import { PrimaryLayout, SecondaryLayout } from '@/shared/ui/layouts'
import { Input } from '@/shared/ui/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@/shared/ui/button'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { Switch } from '@headlessui/react'
import { SelectFileButton } from '@/entities/select-file-button'
import { Badge } from '@/shared/ui/badge'
import { Hr } from '@/shared/ui/hr'

interface FormProps {
    link: string;
}

export const AddHistoryPage = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<FormProps>()
    const loading = useAppSelector((state) => state.historySlice.addHistoryLoading)
    const [isVideo, setIsVideo] = React.useState(false)
    const [images, setImages] = React.useState<File[]>([]);


    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event?.target?.files) {
            const files = [];
            for (let index = 0; index < event.target.files.length; index++) {
                files.push(event?.target?.files[index]);
            }
            setImages(files);
        }
    };

    const onChangeContentType = () => {
        setIsVideo(!isVideo)
        setImages([])
    }

    const onSubmit: SubmitHandler<FormProps> = async ({ link }) => {
        const fd = new FormData()
        fd.append('channel', id!)
        fd.append('type', isVideo ? 'video' : 'image')
        fd.append('link', link)
        isVideo ? fd.append('video', images[0]) : fd.append('image', images[0])
        await dispatch(addHistoryImage(fd))
        navigate(`/channel/single/${id}`)
    }

    return (
        <div>
            <PrimaryLayout className="">
                <div className="flex items-center justify-between flex-wrap">
                    <h2 className="text-lg">Add post</h2>
                </div>
                <div className="gap-x-4 grid grid-cols-2">
                    <Input
                        register={register}
                        registerName="description"
                        labelText="Description"
                        variant="secondary"
                        placeholder="Link"
                    />
                </div>
                <Button
                    onClick={handleSubmit(onSubmit)}
                    className="mt-2"
                    title={"SUBMIT"}
                    loading={loading}
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
                                        src={URL.createObjectURL(image)}
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
            </SecondaryLayout>
        </div>
    )
}
