import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { Modal } from "@/shared/ui/modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { addCategory } from "../../api/categoryApi";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";

interface FormProps {
  name: string;
}

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddCategoryModal = ({ isOpen, setIsOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<FormProps>();
  const loading = useAppSelector(
    (state) => state.categorySlice.addCategoryLoading
  );
  const onSubmit: SubmitHandler<FormProps> = async ({ name }) => {
    await dispatch(addCategory(name));
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Category name"
          register={register}
          registerName="name"
        />
        <Button loading={loading} className="mt-4 w-full" title={"Add"} />
      </form>
    </Modal>
  );
};
