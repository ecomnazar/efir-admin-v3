import { deleteUser } from '@/entities/user/api/userApi';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button } from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal';
import React from 'react'
import { useForm } from 'react-hook-form';

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteUserModal = ({ isOpen, setIsOpen }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice.activeUser);
  const { handleSubmit } = useForm();
  const loading = useAppSelector((state) => state.userSlice.deleteUserLoading);

  const onSubmit = async () => {
    await dispatch(deleteUser(user.id));
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button loading={loading} className="mt-4 w-full" title={"Delete"} />
      </form>
    </Modal>
  );
}
