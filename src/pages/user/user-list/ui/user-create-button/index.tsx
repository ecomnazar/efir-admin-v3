import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui/button'

export const UserCreateButton = () => {
    const navigate = useNavigate()
    return (
        <Button
            onClick={() => navigate("/user/create")}
            className="ml-auto block"
            title="Add User"
        />
    )
}
