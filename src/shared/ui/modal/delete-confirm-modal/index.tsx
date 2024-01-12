import { Modal } from "@/shared/ui/modal";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/ui/button";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClick: () => void;
  loading: boolean;
}

export const DeleteConfirmModal = ({ isOpen, setIsOpen, handleClick, loading }: Props) => {
  const { handleSubmit } = useForm()

  const onSubmit = async () => handleClick()

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button loading={loading} className="mt-4 w-full" title={"Delete"} />
      </form>
    </Modal>
  );
};
