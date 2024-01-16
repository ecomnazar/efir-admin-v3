import clsx from "clsx";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  labelText?: string;
  placeholder?: string;
  register?: any;
  registerName?: string;
  variant?: 'primary' | 'secondary'
}

export const Input: React.FC<Props> = ({ labelText, placeholder, register, registerName, variant, ...props }) => {
  return (
    <div className="flex flex-col gap-y-1">
      {labelText && (
        <label className="text-[13px]" htmlFor="">
          {labelText}
        </label>
      )}
      <input
        {...props}
        {...register(registerName)}
        className={clsx("border focus:border-primary  focus:pl-4 transition-all text-background focus:shadow-inputShadow font-[300] outline-none rounded-md text-[15px] px-3 py-[6px]", {
          ['bg-transparent text-white border-primary']: variant === 'secondary'
        })}
        type="text"
        placeholder={placeholder}
      />
      {/* <p className="text-red text-[12px]">Please enter email / username</p> */}
    </div>
  );
};
