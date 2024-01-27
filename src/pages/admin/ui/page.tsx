import { deleteAdmin, getAdmins } from "@/entities/admin/api/adminApi"
import { GAdmin } from "@/entities/admin/model/interfaces"
import { setActiveAdmin } from "@/entities/admin/model/slice"
import { GUser } from "@/entities/user/model/interfaces"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch"
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector"
import { Button } from "@/shared/ui/button"
import { DeleteConfirmModal } from "@/shared/ui/modal/delete-confirm-modal"
import clsx from "clsx"
import React from "react"
import { FiEdit } from "react-icons/fi"
import { TbTrash } from "react-icons/tb"
import { Link, useNavigate } from "react-router-dom"

export const AdminPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const admins = useAppSelector((state) => state.adminSlice.admins.data)
  const activeAdmin = useAppSelector((state) => state.adminSlice.activeAdmin)
  const [isOpenDeleteUserModal, setIsOpenDeleteUserModal] = React.useState(false);
  const deleteAdminLoading = useAppSelector((state) => state.adminSlice.deleteAdminLoading)

  const loadMore = () => dispatch(getAdmins())




  const openDeleteAdmin = (admin: GAdmin) => {
    dispatch(setActiveAdmin(admin))
    setIsOpenDeleteUserModal(true)
  };

  const onDeleteAdmin = async () => {
    await dispatch(deleteAdmin(activeAdmin.id))
    setIsOpenDeleteUserModal(false)
  }

  React.useEffect(() => {
    if (admins.length === 0) loadMore()
  }, [])

  return (
    <section>
      <h2 className="text-xl mb-4">Admins list</h2>
      <>
        <div className="w-full bg-secondary rounded-md pb-4">
          <div className="p-4">
            <Button
              onClick={() => navigate("/admin/create")}
              className="ml-auto block"
              title="Add Admin"
            />
          </div>
          <ul>
            <li className="flex border-primary border-t border-b px-8 py-2 border-opacity-20 flex-wrap justify-between items-center">
              <div className="basis-[20%] text-[16px]">User</div>
              <div className="basis-[20%] text-[16px]">City</div>
              {/* <div className="basis-[20%] text-[16px]">Posts</div> */}
              <div className="basis-[20%] text-[16px]">Super admin</div>
              <div className="basis-[15%] text-[16px] text-right">Actions</div>
            </li>
            {admins?.map((admin) => {
              return (
                <li
                  key={admin.id}
                  className="flex border-primary border-t border-b px-8 py-2 border-opacity-20 flex-wrap justify-between items-center"
                >
                  <div className="basis-[20%] text-[16px] flex items-center gap-x-3">
                    <div className="w-[45px] h-[45px] rounded-full bg-slate-600"></div>
                    <div>
                      <p className="text-[15px]">{admin.username}</p>
                      <p className="text-[11px] text-textColor/50">
                        {admin.phone_number}
                      </p>
                    </div>
                  </div>
                  <div className="basis-[20%] text-[15px]">{admin.region}</div>
                  {/* <div className="basis-[20%] text-[15px]">
                    {admin.data.post_count}
                  </div> */}
                  <div className="basis-[20%] text-[16px]">
                    <div
                      className={clsx(
                        "inline-block  text-[13px] rounded-md py-1 px-3",
                        {
                          ["text-green bg-green/30"]: admin.is_superuser === true,
                          ["text-red bg-red/30"]: admin.is_superuser === false,
                        }
                      )}
                    >
                      {admin.is_superuser ? "Active" : "Disabled"}
                    </div>
                  </div>
                  <div className="basis-[15%] text-[16px] text-right">
                    <div className="flex items-center justify-end gap-x-4">
                      <button onClick={() => openDeleteAdmin(admin)}>
                        <TbTrash size={19} />
                      </button>
                      {/* <Link onClick={() => dispatch(setActiveAdmin(admin))} to={`/admin/edit/${admin.id}`}>
                        <FiEdit size={17} />
                      </Link> */}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* MODALS */}

        <DeleteConfirmModal isOpen={isOpenDeleteUserModal} setIsOpen={setIsOpenDeleteUserModal} handleClick={onDeleteAdmin} loading={deleteAdminLoading} />

        {/* <DeleteUserModal
        isOpen={isOpenDeleteUserModal}
        setIsOpen={setIsOpenDeleteUserModal}
      /> */}
      </>
    </section>
  )
}
