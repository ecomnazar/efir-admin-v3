import React from "react";
import clsx from "clsx";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { getUsers } from "@/entities/user/api/userApi";
import { Button } from "@/shared/ui/button";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { TbTrash } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { setActiveUser, setUsersNextPage } from "@/entities/user/model/slice";
import { DeleteUserModal } from "@/entities/user";
import { GUser } from "@/entities/user/model/interfaces";
import { Badge } from "@/shared/ui/badge";

export const UserList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.userSlice.users.data);
  const hasNext = useAppSelector((state) => state.userSlice.users.next);
  const hasPrev = useAppSelector((state) => state.userSlice.users.prev);
  const loading = useAppSelector((state) => state.userSlice.users.loading);
  const nextPage = useAppSelector((state) => state.userSlice.users.nextPage);
  const [isOpenDeleteUserModal, setIsOpenDeleteUserModal] =
    React.useState(false);

  React.useEffect(() => {
    if (!hasPrev) {
      dispatch(getUsers(1));
    }
  }, []);

  const loadMore = () => {
    dispatch(getUsers(nextPage));
    dispatch(setUsersNextPage());
  };

  const openDeleteUser = (user: GUser) => {
    dispatch(setActiveUser(user));
    setIsOpenDeleteUserModal(true);
  };

  return (
    <>
      <div className="w-full bg-secondary rounded-md pb-4">
        <div className="p-4">
          <Button
            onClick={() => navigate("/user/create")}
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
                  <Badge title={user.is_premium ? 'Active' : 'Disabled'} className={
                    user.is_premium === true ? "text-green !bg-green/30" : 'text-red !bg-red/30'
                  } />
                </div>
                <div className="basis-[15%] text-[16px] text-right">
                  <div className="flex items-center justify-end gap-x-4">
                    <button onClick={() => openDeleteUser(user)}>
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

      {/* MODALS */}

      <DeleteUserModal
        isOpen={isOpenDeleteUserModal}
        setIsOpen={setIsOpenDeleteUserModal}
      />
    </>
  );
};
