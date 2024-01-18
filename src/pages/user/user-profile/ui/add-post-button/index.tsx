import { Button } from '@/shared/ui/button'
import { useNavigate, useParams } from 'react-router-dom'

export const AddPostButton = () => {
    const { id: userId } = useParams() // NOTE: user id get from url
    const navigate = useNavigate()
    return (
        <Button onClick={() => navigate(`/post/create/${userId}`)} className="mt-2 w-full" title={"Add post"} />
    )
}
