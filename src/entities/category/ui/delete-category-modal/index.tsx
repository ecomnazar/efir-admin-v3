import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { Modal } from "@/shared/ui/modal";
import { useForm } from "react-hook-form";
import { deleteCategory } from "../../api/categoryApi";
import { Button } from "@/shared/ui/button";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteCategoryModal = ({ isOpen, setIsOpen }: Props) => {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.categorySlice.activeCategory);
  const { handleSubmit } = useForm();
  const loading = useAppSelector((state) => state.categorySlice.addCategoryLoading);

  const onSubmit = async () => {
    await dispatch(deleteCategory(category.id));
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button loading={loading} className="mt-4 w-full" title={"Delete"} />
      </form>
    </Modal>
  );
};
