import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import React from 'react'
import { useParams } from 'react-router-dom'

export const AdminEditPage = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const admin = useAppSelector((state) => state.adminSlice.activeAdmin)

    console.log(admin);

    // React.useEffect(() => {
    //     dispatch(getAdmin)
    // }, [id])


    return (
        <div>AdminEditPage {id}</div>
    )
}
