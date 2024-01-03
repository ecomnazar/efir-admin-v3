import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { Modal } from "@/shared/ui/modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateCategory } from "../../api/categoryApi";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import React from "react";

interface FormProps {
  name: string;
}

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditCategoryModal = ({ isOpen, setIsOpen }: Props) => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(
    (state) => state.categorySlice.activeCategory
  );
  const { register, handleSubmit, reset } = useForm<FormProps>();
  const loading = useAppSelector(
    (state) => state.categorySlice.updateCategoryLoading
  );
  const onSubmit: SubmitHandler<FormProps> = async ({ name }) => {
    const data = {
      name: name,
      id: category.id,
    };
    await dispatch(updateCategory(data));
    setIsOpen(false);
  };

  React.useEffect(() => {
    reset({ name: category.name }); // set name to input
  }, [category]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Category name"
          register={register}
          defaultValue={category.name}
          registerName="name"
        />
        <Button loading={loading} className="mt-4 w-full" title={"Add"} />
      </form>
    </Modal>
  );
};
