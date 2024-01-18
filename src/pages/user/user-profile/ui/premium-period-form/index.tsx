import React from 'react'
import { useParams } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { makeUserPremium } from '@/entities/user/api/userApi'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

interface FormProps {
    period: number;
}

export const PremiumPeriodForm = () => {
    const { id } = useParams() // NOTE: user id get from url
    const dispatch = useAppDispatch()
    const { register, handleSubmit } = useForm<FormProps>()
    const [loading, setLoading] = React.useState(false)

    const onUpdatePremium: SubmitHandler<FormProps> = async ({ period }) => {
        setLoading(true)
        await dispatch(makeUserPremium({ id: id!, period }))
        setLoading(false)
    }
    return (
        <form onSubmit={handleSubmit(onUpdatePremium)} className="flex items-center gap-x-2">
            <Input register={register('period')} placeholder="Premium period" variant="secondary" />
            <Button loading={loading} title={"Add"} className="!h-[37px]" />
        </form>
    )
}
