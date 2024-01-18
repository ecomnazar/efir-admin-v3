import { useNavigate, useParams } from 'react-router-dom'
import { deletePost } from '@/entities/post/api/postApi'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { Button } from '@/shared/ui/button'

export const DeletePostButton = () => {
    const { id: postId } = useParams() // NOTE: post id get from url
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const loading = useAppSelector((state) => state.postSlice.deletePostLoading)

    const onDelete = async () => {
        await dispatch(deletePost(postId!))
        navigate(-1)
    }

    return (
        <Button
            onDoubleClick={onDelete}
            loading={loading}
            className="w-full mt-2 !bg-red/30"
            title={"Delete"}
        />
    )
}
