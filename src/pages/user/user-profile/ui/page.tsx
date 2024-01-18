import React from "react";
import clsx from "clsx";
import dateFormat from "dateformat";
import { getUser } from "@/entities/user/api/userApi";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import UserPostList from "@/widgets/user-post-list/ui";
import { useParams } from "react-router-dom";
import { SecondaryLayout } from "@/shared/ui/layouts";
import { Hr } from "@/shared/ui/hr";
import { PostLimitForm } from "./post-limit-form";
import { PremiumPeriodForm } from "./premium-period-form";
import { DestroyPremiumButton } from "./destroy-premium-button";
import { AddPostButton } from "./add-post-button";
import { Badge } from "@/shared/ui/badge";
import { UserDetailList } from "./user-detail-list";
import { UserAvatar } from "./user-avatar";

export const UserProfilePage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice.user.data);
  const loading = useAppSelector((state) => state.userSlice.user.loading)

  React.useEffect(() => {
    dispatch(getUser(id!));
  }, []);

  return (
    loading ? <div className="text-3xl">Loading...</div> : <div className="flex items-start justify-between flex-wrap">
      <SecondaryLayout>
        <UserAvatar avatar={user?.avatar} />
        <h1 className="text-center text-textColor text-[28px] font-[500]">
          {user?.username}
        </h1>
        <Hr />
        <div>
          <h3 className="text-primary/70 text-[14px]">DETAILS</h3>
          <ul className="mt-2">
            <UserDetailList title={'Username'} span={user?.username} />
            <UserDetailList title={'Bio'} span={user?.bio || 'No bio yet'} />
            <UserDetailList title={'Premium'}><Badge className={clsx("scale-[0.9]", {
              ["!text-green !bg-green/30"]: user?.is_premium === true,
              ["!text-red !bg-red/30"]: user.is_premium === false,
            })} title={user.is_premium ? "Active" : "Disabled"} />
            </UserDetailList>
            <UserDetailList title={'Tel'} span={user?.phone_number || "No phone number"} />
            <UserDetailList title={'Post limit'} span={user?.post_limit} />
            <UserDetailList title={'Created at'} span={dateFormat(user?.created_at, "dd/mm/yyyy")} />
            {user?.premium_at &&
              <>
                <UserDetailList title={'Premium at'} span={dateFormat(user?.premium_at, "dd/mm/yyyy")} />
                <UserDetailList title={'Premium end'} span={dateFormat(user?.expires_at, "dd/mm/yyyy")} />
              </>
            }
          </ul>
          <div className="flex flex-col gap-y-2">
            <PostLimitForm />
            <PremiumPeriodForm />
          </div>
          <DestroyPremiumButton isPremium={user?.is_premium} />
          <AddPostButton />
        </div>
      </SecondaryLayout>
      <UserPostList />
    </div>
  );
};
