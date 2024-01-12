import { addAdmin } from '@/entities/admin/api/adminApi';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input'
import { PrimaryLayout } from '@/shared/ui/layouts'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

interface FormProps {
    username: string;
    password: string;
    region: string;
    phone_number: string;
    gender: string;
}

export const AdminCreatePage = () => {
    const loading = useAppSelector((state) => state.adminSlice.addAdminLoading)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<FormProps> = async ({ username, password, region, phone_number, gender }) => {
        const fd = {
            username,
            password,
            region,
            phone_number,
            gender
        }
        await dispatch(addAdmin(fd))
        navigate('/admin/list')
    }

    const { register, handleSubmit } = useForm<FormProps>()

    return (
        <div className="flex items-start justify-between">
            <PrimaryLayout>
                <h2 className="text-lg">Add user</h2>
                <div className="gap-x-4 grid grid-cols-2">
                    <Input
                        register={register}
                        registerName="username"
                        labelText="Username"
                        variant="secondary"
                    />
                </div>
                <div className="gap-x-4 grid grid-cols-2">
                    <Input
                        register={register}
                        registerName="password"
                        labelText="Password"
                        variant="secondary"
                    />
                </div>
                <div className="gap-x-4 grid grid-cols-2">
                    <Input
                        register={register}
                        registerName="region"
                        labelText="Region"
                        variant="secondary"
                    />
                </div>
                <div className="gap-x-4 grid grid-cols-2">
                    <Input
                        register={register}
                        registerName="phone_number"
                        labelText="Phone number"
                        variant="secondary"
                    />
                </div>
                <div className="gap-x-4 grid grid-cols-2">
                    <Input
                        register={register}
                        registerName="gender"
                        labelText="Gender (male/female)"
                        variant="secondary"
                    />
                </div>
                <Button
                    loading={loading}
                    onClick={handleSubmit(onSubmit)}
                    className="mt-2"
                    title={"Submit"}
                />
            </PrimaryLayout>
        </div>
    )
}
