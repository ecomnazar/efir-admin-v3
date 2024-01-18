import React from "react";
import dateFormat from "dateformat";
import { getPost, updatePost } from "@/entities/post/api/postApi";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { Hr } from "@/shared/ui/hr";
import { Input } from "@/shared/ui/input";
import { PrimaryLayout, SecondaryLayout } from "@/shared/ui/layouts";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { SelectFileButton } from "@/entities/select-file-button";
import { Badge } from "@/shared/ui/badge";
import { DeletePostButton } from "./delete-post-button";

// features to be implemented: delete and update method
// MUST HAVE - Onclick one post open as big modal video and


interface FormProps {
  description: string;
  tags: string;
}

export const SinglePostPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormProps>();
  const post = useAppSelector((state) => state.postSlice.post.data);
  const loadingPost = useAppSelector((state) => state.postSlice.post.loading);
  const loadingUpdateButton = useAppSelector((state) => state.postSlice.updatePostLoading)
  const [images, setImages] = React.useState<string[]>([]);

  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files) {
      const files = [];
      for (let index = 0; index < event.target.files.length; index++) {
        files.push(event?.target?.files[index]);
      }
      setImages([...images, ...files]);
    }
  };

  const onDeleteImage = (image: string) => {
    const filteredImages = images.filter((img) => img !== image);
    setImages(filteredImages);
  };

  const onSubmit: SubmitHandler<FormProps> = async ({ description, tags }) => {
    const fd = new FormData();
    fd.append("id", post.id)
    fd.append("user", post.user.id);
    fd.append("description", description);
    fd.append("tags", tags);
    fd.append("is_commentable", "False");
    for (let index = 0; index < images.length; index++) {
      fd.append(`image_${index + 1}`, images[index]);
    }
    await dispatch(updatePost(fd))
  };


  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

  const navigatToUserProfile = () => {
    navigate(`/user/profile/${post?.user.id}`)
  }

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
    <div className="flex justify-between items-start flex-wrap">
      <PrimaryLayout className="">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">Post information</h2>
          <p>{dateFormat(post?.created_at, "dd/mm/yyyy")}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <Badge title={post?.user?.username} />
          <button onClick={navigatToUserProfile}>
            <Badge title={"Profile"} className="cursor-pointer" />
          </button>
        </div>
        <div className="gap-x-4 grid grid-cols-2">
          <Input
            register={register('description', { required: true })}
            error={errors.description?.message}
            labelText="Description"
            variant="secondary"
            placeholder="Description"
          />
        </div>
        <div className=" gap-x-4 grid grid-cols-2">
          <Input
            register={register('tags', { required: true })}
            error={errors.tags?.message}
            labelText="Tags"
            variant="secondary"
            placeholder="Tags"
          />
        </div>


      </PrimaryLayout>
      <SecondaryLayout className="mt-4">
        <div className="grid grid-cols-4 gap-2">
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
      <div className="w-full bg-secondary p-4 mt-4">
        <Button
          onClick={handleSubmit(onSubmit)}
          loading={loadingUpdateButton}
          className="w-full"
          title={"Submit"}
        />
        <DeletePostButton />
      </div>
    </div>
  );
};
