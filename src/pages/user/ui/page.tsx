import { searchUser } from "@/entities/user/api/userApi";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input"
import { UserList } from "@/widgets/user-list"
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// add: user profile data update

interface FormProps {
  query: string;
}

export const UserPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<FormProps>()
  const searchLoading = useAppSelector((state) => state.userSlice.searchUserLoading)

  const onSearch: SubmitHandler<FormProps> = ({ query }) => {
    dispatch(searchUser(query))
  }


  return (
    <section>
      <h2 className="text-xl mb-4">Users list</h2>
      <div className="bg-secondary rounded-md p-4 flex items-center justify-between mb-4">
        <form className="flex items-center gap-x-2">
          <Input register={register} registerName="query" placeholder="Search..." className="inline-block -mt-2" variant="secondary" />
          <Button loading={searchLoading} onClick={handleSubmit(onSearch)} title={"Search"} className="h-[38px]" />
        </form>
        <Button
          onClick={() => navigate("/user/create")}
          className="ml-auto block"
          title="Add User"
        />
      </div>
      <UserList />
    </section>
  )
}
