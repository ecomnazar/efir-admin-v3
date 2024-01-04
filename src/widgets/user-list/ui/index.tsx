import React from "react";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { getUsers } from "@/entities/user/api/userApi";
import { Button } from "@/shared/ui/button";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import clsx from "clsx";
import { TbTrash } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

export const UserList = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.userSlice.users.data);
  const hasNext = useAppSelector((state) => state.userSlice.users.next);
  const loading = useAppSelector((state) => state.userSlice.users.loading);

  React.useEffect(() => {
    dispatch(getUsers(1));
  }, []);

  const loadMore = () => {};

  return (
    <>
      <div className="w-full bg-secondary rounded-md pb-4">
        <div className="p-4">
          <Button
            // onClick={openAddCategory}
            className="ml-auto block"
            title="Add User"
          />
        </div>
        <ul>
          <li className="flex border-primary border-t border-b px-8 py-2 border-opacity-20 flex-wrap justify-between items-center">
            <div className="basis-[20%] text-[16px]">User</div>
            <div className="basis-[20%] text-[16px]">City</div>
            <div className="basis-[20%] text-[16px]">Posts</div>
            <div className="basis-[20%] text-[16px]">Status</div>
            <div className="basis-[15%] text-[16px] text-right">Actions</div>
          </li>
          {users?.map((user) => {
            return (
              <li
                key={user.id}
                className="flex border-primary border-t border-b px-8 py-2 border-opacity-20 flex-wrap justify-between items-center"
              >
                <div className="basis-[20%] text-[16px] flex items-center gap-x-3">
                  {user.avatar ? (
                    <img
                      className="w-[45px] h-[45px] rounded-full object-fit object-cover"
                      src={user.avatar}
                    />
                  ) : (
                    <div className="w-[45px] h-[45px] rounded-full bg-slate-600"></div>
                  )}
                  <div>
                    <p className="text-[15px]">{user.username}</p>
                    <p className="text-[11px] text-textColor/50">
                      {user.phone_number}
                    </p>
                  </div>
                </div>
                <div className="basis-[20%] text-[15px]">{user.city.name}</div>
                <div className="basis-[20%] text-[15px]">
                  {user.data.post_count}
                </div>
                <div className="basis-[20%] text-[16px]">
                  <div
                    className={clsx(
                      "inline-block  text-[13px] rounded-md py-1 px-3",
                      {
                        ["text-green bg-green/30"]: user.is_premium === true,
                        ["text-red bg-red/30"]: user.is_premium === false,
                      }
                    )}
                  >
                    {user.is_premium ? "Active" : "Disabled"}
                  </div>
                </div>
                <div className="basis-[15%] text-[16px] text-right">
                  <div className="flex items-center justify-end gap-x-4">
                    <button onClick={() => {}}>
                      <TbTrash size={19} />
                    </button>
                    <Link to={`/user/profile/${user.id}`}>
                      <FiEdit size={17} />
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {hasNext && (
          <Button
            loading={loading}
            onClick={loadMore}
            className="mx-auto block mt-4"
            title={"Load more"}
          />
        )}
      </div>
    </>
  );
};
