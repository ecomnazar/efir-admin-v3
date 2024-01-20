import { SelectFileButton } from "@/entities/select-file-button";
import { addUser } from "@/entities/user/api/userApi";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { PrimaryLayout, SecondaryLayout } from "@/shared/ui/layouts";
// import { Select } from "@/shared/ui/select";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// just add validation, city and region

interface FormProps {
  username: string;
  bio: string;
  address: string;
}

const people = [
  "Wade Cooper",
  "Arlene Mccoy",
  "Devon Webb",
  "Tom Cook",
  "Tanya Fox",
  "Hellen Schmidt",
];

export const UserCreate = () => {
  const dispatch = useAppDispatch();
  // const [selected, setSelected] = React.useState(people[0]);
  const { register, handleSubmit, formState: { errors } } = useForm<FormProps>();
  const [image, setImage] = React.useState<File>();
  const navigate = useNavigate()
  const loading = useAppSelector((state) => state.userSlice.addUser.loading);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files) {
      setImage(event?.target?.files[0]);
    }
  };

  const onSubmit: SubmitHandler<FormProps> = async ({ username, bio, address }) => {
    const fd = new FormData();
    fd.append("username", username);
    fd.append("bio", bio);
    fd.append("address", address);
    fd.append("region", "3");
    fd.append("city", "1");
    fd.append("is_channel", "True");
    fd.append("avatar", image!);
    if (image) {
      await dispatch(addUser(fd));
      navigate('/user/list')
    } else {
      toast.error('Please select an image')
    }
  };

  return (
    <div className="flex items-start justify-between flex-wrap">
      <PrimaryLayout>
        <h2 className="text-lg">Add user</h2>
        <div className="gap-x-4 grid grid-cols-2">
          <Input
            register={register("username", { required: 'Required field' })}
            labelText="Username"
            variant="secondary"
            error={errors.username?.message}
          />
        </div>
        <div className="gap-x-4 grid grid-cols-2">
          <Input
            register={register('bio', { required: 'Required field' })}
            labelText="Bio"
            variant="secondary"
            error={errors.bio?.message}
          />
        </div>
        <div className="gap-x-4 grid grid-cols-2">
          <Input
            register={register('address', { required: 'Required field' })}
            labelText="Address"
            variant="secondary"
            error={errors.address?.message}
          />
        </div>
        {/* <div className="gap-x-4 grid grid-cols-2 mt-2">
          <Select selected={selected} setSelected={setSelected} data={people} />
        </div> */}
      </PrimaryLayout>
      <SecondaryLayout className="mt-2">
        {image && (
          <div className="rounded-md p-2">
            <img
              className="w-[400px] h-[400px] rounded-md aspect-[1/1] object-cover object-center"
              src={URL.createObjectURL(image)}
            />
          </div>
        )}
        <SelectFileButton onFileChange={onFileChange} />
      </SecondaryLayout>
      <div className="bg-secondary rounded-md p-4 w-full mt-2">
        <Button
          loading={loading}
          onClick={handleSubmit(onSubmit)}
          className="w-full"
          title={"Submit"}
        />
      </div>
    </div>
  );
};
