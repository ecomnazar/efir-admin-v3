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

const people = [
    "Wade Cooper",
    "Arlene Mccoy",
    "Devon Webb",
    "Tom Cook",
    "Tanya Fox",
    "Hellen Schmidt",
];

interface FormProps {
    channelName: string;
}

export const CreateChannelPage = () => {
    const dispatch = useAppDispatch();
    const [selected, setSelected] = React.useState(people[0]);
    const { register, handleSubmit } = useForm<FormProps>();
    const [image, setImage] = React.useState<File>();
    const loading = useAppSelector((state) => state.userSlice.addUser.loading);

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event?.target?.files) {
            setImage(event?.target?.files[0]);
        }
    };

    const onSubmit: SubmitHandler<FormProps> = ({ channelName }) => {
        const fd = new FormData();
        fd.append("name", channelName);
        fd.append("category", selected);
        fd.append("avatar", image!);
        dispatch(addChannel(fd));
    };

    return (
        <div className="flex items-start justify-between">
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
                    <Select selected={selected} setSelected={setSelected} data={people} />
                </div>
                <Button
                    loading={loading}
                    onClick={handleSubmit(onSubmit)}
                    className="mt-2"
                    title={"Submit"}
                />
            </PrimaryLayout>
            <SecondaryLayout>
                <div className="grid grid-cols-2 gap-2">
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
