import dateFormat from "dateformat";
import { SelectFileButton } from "@/entities/select-file-button";
import { Button } from "@/shared/ui/button";
import { Hr } from "@/shared/ui/hr";
import { Input } from "@/shared/ui/input";
import { PrimaryLayout, SecondaryLayout } from "@/shared/ui/layouts";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { addPost } from "@/entities/post/api/postApi";

interface FormProps {
  description: string;
  tags: string;
}

export const AddPostPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm<FormProps>();
  const [images, setImages] = React.useState<File[]>([]);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files) {
      const files = [];
      for (let index = 0; index < event.target.files.length; index++) {
        files.push(event?.target?.files[index]);
      }
      setImages([...images, ...files]);
    }
  };

  const onSubmit: SubmitHandler<FormProps> = ({ description, tags }) => {
    const fd = new FormData();
    fd.append("user", id!);
    fd.append("description", description);
    fd.append("tags", tags);
    fd.append("is_commentable", "False");
    for (let index = 0; index < images.length; index++) {
      fd.append(`image_${index + 1}`, images[index]);
    }
    dispatch(addPost(fd))
  };

  const onDeleteImage = (i: number) => {
    const filtered = images.filter((_, index) => index !== i);
    setImages(filtered);
  };

  return (
    <div className="flex justify-between items-start">
      <PrimaryLayout className="">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">Add post</h2>
        </div>
        <div className="gap-x-4 grid grid-cols-2">
          <Input
            register={register}
            registerName="description"
            labelText="Description"
            variant="secondary"
            placeholder="Description"
          />
        </div>
        <div className=" gap-x-4 grid grid-cols-2">
          <Input
            register={register}
            registerName="tags"
            labelText="Tags"
            variant="secondary"
            placeholder="Tags"
          />
        </div>
        <Button
          onClick={handleSubmit(onSubmit)}
          className="mt-2"
          title={"SUBMIT"}
        />
      </PrimaryLayout>
      <SecondaryLayout>
        <div className="grid grid-cols-2 gap-2">
          {images &&
            images.map((image, i) => {
              return (
                <div key={i} className="rounded-md bg-background p-2">
                  <img
                    className="rounded-md aspect-square object-cover object-center"
                    src={URL.createObjectURL(image)}
                  />
                  <Hr className="!my-2" />
                  <button
                    onClick={() => onDeleteImage(i)}
                    className="text-[13px] text-center mx-auto block"
                  >
                    Delete file
                  </button>
                </div>
              );
            })}
        </div>
        <SelectFileButton onFileChange={onFileChange} />
      </SecondaryLayout>
    </div>
  );
};
