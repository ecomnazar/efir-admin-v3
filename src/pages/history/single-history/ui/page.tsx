import { getHistory } from "@/entities/history/api/historyApi"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch"
import React from "react"
import { useParams } from "react-router-dom"

export const SingleHistoryPage = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(getHistory(id!))
    }, [])

    return (
        <div>SingleHistoryPage {id}</div>
    )
}
