import React from 'react'
import { addChannel } from '@/entities/channel/api/channelApi'
import { SelectFileButton } from '@/entities/select-file-button'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { PrimaryLayout, SecondaryLayout } from '@/shared/ui/layouts'
import { Select } from '@/shared/ui/select'
import { SubmitHandler, useForm } from 'react-hook-form'
import { getCategories } from '@/entities/category/api/categoryApi'
import { useNavigate } from 'react-router-dom'

interface SelectDTOProps {
    name: string;
    id: string;
}

interface FormProps {
    channelName: string;
}

export const CreateChannelPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [image, setImage] = React.useState<File>();
    const { register, handleSubmit } = useForm<FormProps>();
    const loading = useAppSelector((state) => state.channelSlice.addChannelLoading);
    const categoriesLoading = useAppSelector((state) => state.categorySlice.categories.loading)
    const categories = useAppSelector((state) => state.categorySlice.categories.data)
    const nextPage = useAppSelector((state) => state.categorySlice.nextPage)
    const hasNext = useAppSelector((state) => state.categorySlice.categories.next)

    const [selected, setSelected] = React.useState({ name: 'Выберите категорию', id: '0' });

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event?.target?.files) {
            setImage(event?.target?.files[0]);
        }
    };

    const onGetCategories = () => dispatch(getCategories(nextPage))

    React.useEffect(() => {
        if (categories.length === 0) onGetCategories()
    }, [])

    const onSubmit: SubmitHandler<FormProps> = async ({ channelName }) => {
        const fd = new FormData();
        fd.append("name", channelName);
        fd.append("category", selected.id);
        fd.append("avatar", image!);
        await dispatch(addChannel(fd));
        navigate('/channel/list')
    };

    const categoriesDTO = () => {
        const newData: SelectDTOProps[] = []
        categories?.map((elem) => {
            newData.push({
                id: elem.id,
                name: elem.name
            })
        })
        return newData
    }

    return (
        <div className="flex items-start justify-between flex-wrap">
            <PrimaryLayout>
                <h2 className="text-lg">Add channel</h2>
                <div className="gap-x-4 grid grid-cols-2">
                    <Input
                        register={register}
                        registerName="channelName"
                        labelText="Channel name"
                        variant="secondary"
                    />
                </div>
                <div className="gap-x-4 grid grid-cols-2 mt-2">
                    <Select selected={selected} setSelected={setSelected} data={categoriesDTO()} onClickLoadMore={onGetCategories} hasNext={hasNext} buttonLoading={categoriesLoading} />
                </div>
                <Button
                    loading={loading}
                    onClick={handleSubmit(onSubmit)}
                    className="mt-2"
                    title={"Submit"}
                />
            </PrimaryLayout>
            <SecondaryLayout className='mt-4'>
                <div className="grid grid-cols-4 gap-2">
                    {image && (
                        <div className="rounded-md bg-background p-2">
                            <img
                                className="rounded-md aspect-square object-cover object-center"
                                src={URL.createObjectURL(image)}
                            />
                        </div>
                    )}
                </div>
                <SelectFileButton onFileChange={onFileChange} />
            </SecondaryLayout>
        </div>
    )
}
