import { SelectFileButton } from "@/entities/select-file-button";
import { Button } from "@/shared/ui/button";
import { Hr } from "@/shared/ui/hr";
import { Input } from "@/shared/ui/input";
import { PrimaryLayout, SecondaryLayout } from "@/shared/ui/layouts";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { addPost } from "@/entities/post/api/postApi";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { Switch } from "@headlessui/react";
import { Badge } from "@/shared/ui/badge";
import toast from "react-hot-toast";

interface FormProps {
  description: string;
  tags: string;
}

export const AddPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm<FormProps>();
  const [images, setImages] = React.useState<File[]>([]);
  const [isVideo, setIsVideo] = React.useState(false)
  const loading = useAppSelector((state) => state.postSlice.addPostLoading)


  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files) {
      const files = [];
      for (let index = 0; index < event.target.files.length; index++) {
        files.push(event?.target?.files[index]);
      }
      setImages([...images, ...files]);
    }
  };

  const onSubmit: SubmitHandler<FormProps> = async ({ description, tags }) => {
    const fd = new FormData();
    fd.append("user", id!);
    fd.append("description", description);
    fd.append("tags", tags);
    fd.append("is_commentable", "False");
    // fix
    if (isVideo) {
      fd.append('video', images[0])
    } else {
      for (let index = 0; index < images.length; index++) {
        fd.append(`image_${index + 1}`, images[index]);
      }
    }
    // fix
    if (images.length !== 0) {
      await dispatch(addPost(fd))
      navigate(`/user/profile/${id}`)
    } else {
      toast.error('Please select file')
    }
  };

  const onDeleteImage = (i: number) => {
    const filtered = images.filter((_, index) => index !== i);
    setImages(filtered);
  };

  const onChangeContentType = () => {
    setIsVideo(!isVideo)
    setImages([])
  }

  return (
    <div className="flex justify-between items-start flex-wrap">
      <PrimaryLayout className="">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">Add post</h2>
        </div>
        <div className="gap-x-4 grid grid-cols-2">
          <Input
            register={register('description')}
            labelText="Description"
            variant="secondary"
            placeholder="Description"
          />
        </div>
        <div className=" gap-x-4 grid grid-cols-2">
          <Input
            register={register('tags')}
            labelText="Tags"
            variant="secondary"
            placeholder="Tags"
          />
        </div>
      </PrimaryLayout>
      <SecondaryLayout className="mt-4">
        <div className="flex items-center gap-x-2">
          <Badge title={isVideo ? 'Video' : 'Image'} />
          <Switch
            checked={isVideo}
            onChange={onChangeContentType}
            className={`${isVideo ? 'bg-primary' : 'bg-primary/30'}
            relative inline-flex h-[28px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${isVideo ? 'translate-x-5' : 'translate-x-0'}
              pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {images &&
            images.map((image, i) => {
              return (
                <div key={i} className="rounded-md bg-background p-2">
                  {isVideo ? <video
                    controls
                    className="rounded-md aspect-square object-cover object-center"
                    src={URL.createObjectURL(image)}
                  /> : <img
                    className="rounded-md aspect-square object-cover object-center"
                    src={URL.createObjectURL(image)}
                  />}
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
        <SelectFileButton onFileChange={onFileChange} contentType={isVideo ? 'video' : 'image'} />
      </SecondaryLayout>
      <div className="w-full bg-secondary p-4 mt-4">
        <Button
          onClick={handleSubmit(onSubmit)}
          className="w-full"
          title={"SUBMIT"}
          loading={loading}
        />
      </div>
    </div>
  );
};
