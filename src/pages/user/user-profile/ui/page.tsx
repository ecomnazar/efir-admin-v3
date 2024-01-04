import { getUser } from "@/entities/user/api/userApi";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import clsx from "clsx";
import dateFormat from "dateformat";
import React from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice.user.data);
  React.useEffect(() => {
    dispatch(getUser(id!));
  }, []);

  return (
    <div className="flex items-start justify-between">
      <div className="bg-secondary basis-[33%] rounded-md p-4">
        <img
          className="w-[125px] h-[125px] rounded-md object-cover object-center mx-auto"
          src={user?.avatar}
          alt=""
        />
        <h1 className="text-center text-textColor text-[28px] font-[500]">
          {user?.username}
        </h1>
        <hr className="w-full h-[1px] outline-none border-none bg-primary/20 my-4" />
        <div>
          <h3 className="text-primary/70 text-[14px]">DETAILS</h3>
          <ul className="mt-2">
            <li className="text-md">
              Username: <span className="text-[13px] ml-2">{user?.username}</span>
            </li>
            <li className="text-md">
              Bio: <span className="text-[13px] ml-2">{user?.bio || "No bio"}</span>
            </li>
            <li className="text-md">
              Status:{" "}
              <div
                className={clsx(
                  "inline-block text-[10px] rounded-md py-1 px-2 -translate-y-[1px] ml-2",
                  {
                    ["text-green bg-green/30"]: user?.is_premium === true,
                    ["text-red bg-red/30"]: user.is_premium === false,
                  }
                )}
              >{user.is_premium ? "Active" : "Disabled"}</div>
            </li>
            <li className="text-md">
              Tel:{" "}
              <span className="text-[13px] ml-2">
                {user?.phone_number || "No phone number"}
              </span>
            </li>
            <li className="text-md">
              Post limit: <span className="text-[13px] ml-2">{user?.post_limit}</span>
            </li>
            <li className="text-md">
              Created at:{" "}
              <span className="text-[13px] ml-2">
                {dateFormat(user?.created_at, "dd/mm/yyyy")}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="h-[500px] bg-secondary basis-[66%] rounded-md"></div>
    </div>
  );
};

export default UserProfile;
