import { Selector } from "@/entities/selector";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import Button from "@/shared/ui/button";
import Input from "@/shared/ui/input";
import { UploaderImage } from "@/shared/ui/uploader";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { addHistoryImage } from "../../api/historyApi";
import toast from "react-hot-toast";

type FormProps = {
  link: string;
};

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HistoryImageUpload = ({ setIsOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<FormProps>();
  const [image, setImage] = React.useState<File | any>();
  const [isLoading, setIsLoading] = React.useState(false);

  const [selected, setSelected] = React.useState({
    name: "Выберите канал",
    id: "",
  });
  const channels = useAppSelector((state) => state.channelSlice.channels.data);

  const onSubmit: SubmitHandler<FormProps> = async (value) => {
    const formData = new FormData();
    formData.append("type", "image");
    formData.append("link", value.link);
    formData.append("image", image);
    formData.append("channel", String(selected.id));
    if (selected.id) {
      if (image === undefined || image.length === 0) {
        toast.error("Выберите изображение");
      } else {
        setIsLoading(true);
        await dispatch(addHistoryImage(formData));
        setIsOpen(false);
        setIsLoading(false);
      }
    } else {
      toast.error("Выберите канал");
    }
  };

  return (
    <div className="min-w-full h-fit">
      <Selector
        selected={selected}
        items={channels}
        setSelected={setSelected}
      />
      <UploaderImage setImageUpload={setImage} type={"single"} />
      <Input register={register} name="link" placeholder="Ссылка на фото" />
      <Button
        isLoading={isLoading}
        onClick={handleSubmit(onSubmit)}
        className="mt-2 w-full"
      >
        Сохранить
      </Button>
    </div>
  );
};
