import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getUsers } from "@/entities/user/api/userApi";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input"
import { UserList } from "@/widgets/user-list"
import { UserCreateButton } from "./user-create-button";

interface FormProps {
  query: string;
}

export const UserPage = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch } = useForm<FormProps>()
  const [searchLoading, setSearchLoading] = React.useState(false)
  const queryValue = watch('query')

  const onSearch: SubmitHandler<FormProps> = async ({ query }) => {
    setSearchLoading(true)
    await dispatch(getUsers({ page: 1, query }))
    setSearchLoading(false)
  }

  return (
    <section>
      <h2 className="text-xl mb-4">Users list</h2>
      <div className="bg-secondary rounded-md p-4 flex items-center justify-between mb-4">
        <form className="flex items-center gap-x-2">
          <Input register={register('query')} placeholder="Search..." className="inline-block -mt-2" variant="secondary" />
          <Button loading={searchLoading} onClick={handleSubmit(onSearch)} title={"Search"} className="h-[38px]" />
        </form>
        <UserCreateButton />
      </div>
      <UserList query={queryValue} />
    </section>
  )
}
