import { SelectFileButton } from "@/entities/select-file-button";
import { addUser } from "@/entities/user/api/userApi";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { PrimaryLayout, SecondaryLayout } from "@/shared/ui/layouts";
import { Select } from "@/shared/ui/select";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
  const [selected, setSelected] = React.useState(people[0]);
  const { register, handleSubmit } = useForm<FormProps>();
  const [image, setImage] = React.useState<File>();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const loading = useAppSelector((state) => state.userSlice.addUser.loading);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files) {
      setImage(event?.target?.files[0]);
    }
  };

  const onSubmit: SubmitHandler<FormProps> = ({ username, bio, address }) => {
    const fd = new FormData();
    fd.append("username", username);
    fd.append("bio", bio);
    fd.append("address", address);
    fd.append("region", "3");
    fd.append("city", "1");
    fd.append("is_channel", "True");
    fd.append("avatar", image!);
    dispatch(addUser(fd));
  };

  return (
    <div className="flex items-start justify-between">
      <PrimaryLayout>
        <h2 className="text-lg">Add user</h2>
        <div className="gap-x-4 grid grid-cols-2">
          <Input
            register={register}
            registerName="username"
            labelText="Username"
            variant="secondary"
          />

        </div>
        <div className="gap-x-4 grid grid-cols-2">
          <Input
            register={register}
            registerName="bio"
            labelText="Bio"
            variant="secondary"
          />
        </div>
        <div className="gap-x-4 grid grid-cols-2">
          <Input
            register={register}
            registerName="address"
            labelText="Address"
            variant="secondary"
          />
        </div>
        <div className="gap-x-4 grid grid-cols-2 mt-2">
          {/* <Select selected={selected} setSelected={setSelected} data={people} /> */}
        </div>
        <Button
          loading={loading}
          onClick={handleSubmit(onSubmit)}
          className="mt-2"
          title={"Submit"}
        />
      </PrimaryLayout>
      <SecondaryLayout>
        <div className="grid grid-cols-2 gap-2">
          {image && (
            <div className="rounded-md bg-background p-2">
              <img
                className="rounded-md aspect-square object-cover object-center"
                src={URL.createObjectURL(image)}
              />
            </div>
          )}
        </div>
        <SelectFileButton onFileChange={onFileChange} />
      </SecondaryLayout>
    </div>
  );
};
