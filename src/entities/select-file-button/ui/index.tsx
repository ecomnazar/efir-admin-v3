import { Button } from "@/shared/ui/button";
import clsx from "clsx";
import React from "react";

interface Props {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  contentType?: 'image' | 'video'
  isMultiple?: boolean;
  className?: string;
  setPreviewContent?: any;
}

export const SelectFileButton = ({ onFileChange, contentType = 'image', isMultiple = true, className, setPreviewContent }: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files) {
      const files = [];
      for (let index = 0; index < event.target.files.length; index++) {
        files.push(event?.target?.files[index]);
      }
      if (setPreviewContent) {
        setPreviewContent(files)
        console.log('asd');

      }
    }
  };

  return (
    <>
      <Button
        className={clsx("bg-opacity-30 text-primary w-full mt-2", className)}
        title={"BROWSE FILE"}
        onClick={() => inputRef.current?.click()}
      />
      <input
        onChange={(event) => {
          onFileChange(event)
          handleFileChange(event)
        }}
        className="hidden"
        ref={inputRef}
        type="file"
        accept={`${contentType}/*`}
        multiple={isMultiple}
      />
    </>
  );
};
