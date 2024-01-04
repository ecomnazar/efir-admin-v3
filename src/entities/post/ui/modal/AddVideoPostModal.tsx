import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import Modal from "@/shared/ui/modal";
import { UploaderImage } from "@/shared/ui/uploader";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { addPost } from "@/entities/post/api/postApi"
import Input from "@/shared/ui/input";
import Button from "@/shared/ui/button";

type FormProps = {
    description: string;
    tags: string;
  };

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddVideoPostModal = ({ isOpen, setIsOpen }: Props) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const [video, setImage] = React.useState<File | any>();
  const { register, handleSubmit } = useForm<FormProps>();


  const onSubmit: SubmitHandler<FormProps> = async (value) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("user", id!);

    // if image array use for loop

    // if (Array.isArray(video)) {
    //   for (let index = 0; index < video.length; index++) {
    //     formData.append(`video_${index + 1}`, video[index]);
    //   }
    // } else {
    //   formData.append("video", video);
    // }

    formData.append("video", video);

    //

    formData.append("description", value.description);
    formData.append("tags", value.tags);
    formData.append("is_commentable", "False");
    await dispatch(addPost(formData));
    setIsOpen(false);
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <UploaderImage onlyImage={false} setImageUpload={setImage} contentType="video" type={"multiple"} />
      <Input
        className="mb-2"
        register={register}
        name="description"
        placeholder="Описание"
      />
      <Input register={register} name="tags" placeholder="Тэги" />
      <Button
        isLoading={isLoading}
        onClick={handleSubmit(onSubmit)}
        className="mt-2 w-full"
      >
        Сохранить
      </Button>
    </Modal>
  );
};