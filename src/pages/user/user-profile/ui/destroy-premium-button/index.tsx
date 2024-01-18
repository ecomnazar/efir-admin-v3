import React from 'react'
import { useParams } from 'react-router-dom';
import { destroyUserPremium } from '@/entities/user/api/userApi';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Button } from '@/shared/ui/button';

interface Props {
    isPremium: boolean;
}

export const DestroyPremiumButton: React.FC<Props> = ({ isPremium }) => {
    const { id } = useParams() // NOTE: user id get from url
    const dispatch = useAppDispatch()
    const [loading, setLoading] = React.useState(false)

    const onDestroyPremium = async () => {
        setLoading(true)
        await dispatch(destroyUserPremium(id!))
        setLoading(false)
    }
    return (
        isPremium ? <Button loading={loading} onClick={onDestroyPremium} title={"Destroy premium"} className="!h-[37px] mt-2 bg-red/35 w-full" /> : <></>
    )
}
