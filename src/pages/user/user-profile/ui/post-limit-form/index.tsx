import { useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { updateUser } from '@/entities/user/api/userApi';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import React from 'react';

interface FormProps {
    post_limit: number;
}

export const PostLimitForm = () => {
    const { id } = useParams() // NOTE: user id get from url
    const dispatch = useAppDispatch()
    const { register, handleSubmit } = useForm<FormProps>()
    const [loading, setLoading] = React.useState(false)

    const onUpdateLimit: SubmitHandler<FormProps> = async ({ post_limit }) => {
        setLoading(true)
        await dispatch(updateUser({ id: id!, post_limit }))
        setLoading(false)
    }
    return (
        <form onSubmit={handleSubmit(onUpdateLimit)} className="flex items-center gap-x-2">
            <Input register={register('post_limit', { required: true })} placeholder="Post limit" variant="secondary" />
            <Button loading={loading} title={"Add"} className="!h-[37px]" />
        </form>
    )
}
