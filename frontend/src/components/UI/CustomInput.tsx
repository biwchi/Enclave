import { useField } from 'formik';
import { InputHTMLAttributes } from 'react';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function CustomInput({ label, ...inputProps }: CustomInputProps) {
  return (
    <div className="w-full">
      <h1 className="pb-1 pl-4 font-medium">{label}</h1>
      <input
        {...inputProps}
        className={
          'w-full rounded-3xl border border-solid border-gray-200 bg-white px-5 py-3 placeholder:text-sm placeholder:text-gray-600 '
        }
        type="text"
      />
    </div>
  );
}
