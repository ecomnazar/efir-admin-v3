import { Button } from "@/shared/ui/button";
import React from "react";

interface Props {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  contentType?: 'image' | 'video'
}

export const SelectFileButton = ({ onFileChange, contentType = 'image' }: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  return (
    <>
      <Button
        className="bg-opacity-30 text-primary w-full mt-2"
        title={"BROWSE FILE"}
        onClick={() => inputRef.current?.click()}
      />
      <input
        onChange={onFileChange}
        className="hidden"
        ref={inputRef}
        type="file"
        accept={`${contentType}/*`}
        multiple
      />
    </>
  );
};
