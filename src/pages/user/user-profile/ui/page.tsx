import React from "react";
import clsx from "clsx";
import dateFormat from "dateformat";
import { destroyUserPremium, getUser, makeUserPremium } from "@/entities/user/api/userApi";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import UserPostList from "@/widgets/user-post-list/ui";
import { useNavigate, useParams } from "react-router-dom";
import { SecondaryLayout } from "@/shared/ui/layouts";
import { Hr } from "@/shared/ui/hr";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormProps {
  period: number
}

export const UserProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<FormProps>()
  const user = useAppSelector((state) => state.userSlice.user.data);
  const loading = useAppSelector((state) => state.userSlice.user.loading)

  const onSubmitPremium: SubmitHandler<FormProps> = ({ period }) => {
    dispatch(makeUserPremium({ id: id!, period }))
  }

  const onDestroyPremium = () => {
    dispatch(destroyUserPremium(id!))
  }

  React.useEffect(() => {
    dispatch(getUser(id!));
  }, []);

  return (
    loading ? <div className="text-3xl">Loading...</div> : <div className="flex items-start justify-between">
      <SecondaryLayout>
        {user?.avatar ? (
          <img
            className="w-[125px] h-[125px] rounded-md object-cover object-center mx-auto"
            src={user.avatar}
          />
        ) : (
          <div className="w-[125px] h-[125px] rounded-md bg-background mx-auto"></div>
        )}
        <h1 className="text-center text-textColor text-[28px] font-[500]">
          {user?.username}
        </h1>
        <Hr />
        <div>
          <h3 className="text-primary/70 text-[14px]">DETAILS</h3>
          <ul className="mt-2">
            <li className="text-md">
              Username:{" "}
              <span className="text-[13px] ml-1">{user?.username}</span>
            </li>
            <li className="text-md">
              Bio:{" "}
              <span className="text-[13px] ml-1">{user?.bio || "No bio"}</span>
            </li>
            <li className="text-md">
              Premium:{" "}
              <div
                className={clsx(
                  "inline-block text-[10px] rounded-md py-1 px-2 -translate-y-[1px] ml-1",
                  {
                    ["text-green bg-green/30"]: user?.is_premium === true,
                    ["text-red bg-red/30"]: user.is_premium === false,
                  }
                )}
              >
                {user.is_premium ? "Active" : "Disabled"}
              </div>
            </li>
            <li className="text-md">
              Tel:{" "}
              <span className="text-[13px] ml-1">
                {user?.phone_number || "No phone number"}
              </span>
            </li>
            <li className="text-md">
              Post limit:{" "}
              <span className="text-[13px] ml-1">{user?.post_limit}</span>
            </li>
            <li className="text-md">
              Created at:{" "}
              <span className="text-[13px] ml-2">
                {dateFormat(user?.created_at, "dd/mm/yyyy")}
              </span>
            </li>
            {
              user.is_premium && <>
                <li className="text-md">
                  Premium at:{" "}
                  <span className="text-[13px] ml-2">
                    {dateFormat(user?.premium_at, "dd/mm/yyyy")}
                  </span>
                </li>
                <li className="text-md">
                  Premium end at:{" "}
                  <span className="text-[13px] ml-2">
                    {dateFormat(user?.expires_at, "dd/mm/yyyy")}
                  </span>
                </li>
              </>
            }
          </ul>
          <div className="flex items-center gap-x-2">
            <Input register={register} registerName="period" placeholder="Premium period" variant="secondary" />
            <Button onClick={handleSubmit(onSubmitPremium)} title={"Add"} className="!h-[37px] mt-2" />
          </div>
          <Button onClick={handleSubmit(onDestroyPremium)} title={"Destroy premium"} className="!h-[37px] mt-2 bg-red/35 w-full" />
          <Button onClick={() => navigate(`/post/create/${user?.id}`)} className="mt-2 w-full" title={"Add post"} />
        </div>
      </SecondaryLayout>
      <UserPostList />
    </div>
  );
};
