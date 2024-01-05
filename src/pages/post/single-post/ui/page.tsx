import React from "react";
import dateFormat from "dateformat";
import { addPost, getPost, updatePost } from "@/entities/post/api/postApi";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { Hr } from "@/shared/ui/hr";
import { Input } from "@/shared/ui/input";
import { PrimaryLayout, SecondaryLayout } from "@/shared/ui/layouts";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { SelectFileButton } from "@/entities/select-file-button";

// features to be implemented: delete and update method

interface FormProps {
  description: string;
  tags: string;
}

export const SinglePostPage = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm<FormProps>();
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) => state.postSlice.post.data);
  const loadingPost = useAppSelector((state) => state.postSlice.post.loading);
  const [images, setImages] = React.useState<string[]>([]);

  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files) {
      const files = [];
      for (let index = 0; index < event.target.files.length; index++) {
        files.push(URL.createObjectURL(event?.target?.files[index]));
      }
      setImages([...images, ...files]);
    }
  };

  const onDeleteImage = (image: string) => {
    const filteredImages = images.filter((img) => img !== image);
    setImages(filteredImages);
  };

  const onSubmit: SubmitHandler<FormProps> = ({ description, tags }) => {
    const formData = new FormData();
    formData.append("user", post.user.id);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("is_commentable", "False");
    for (let index = 0; index < images.length; index++) {
      formData.append(`image_${index + 1}`, images[index]);
    }
    dispatch(updatePost(formData))
  };

  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

  React.useEffect(() => {
    dispatch(getPost(id!));
  }, []);

  React.useEffect(() => {
    const defaultValue = {
      description: post?.description,
      tags: post?.tags,
    };
    setImages(post?.images);
    reset(defaultValue);
  }, [post]);

  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

  return loadingPost ? (
    <div className="text-3xl">Loading...</div>
  ) : (
    <div className="flex justify-between items-start">
      <PrimaryLayout className="">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">Post information</h2>
          <p>{dateFormat(post?.created_at, "dd/mm/yyyy")}</p>
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
            images.map((image) => {
              return (
                <div key={image} className="rounded-md bg-background p-2">
                  <img
                    className="rounded-md aspect-square object-cover object-center"
                    src={image}
                  />
                  <Hr className="!my-2" />
                  <button
                    onClick={() => onDeleteImage(image)}
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