import { useState } from "react";
import { useFormContext } from "../FormContext";

type InputProps = {
  id: string;
  label: string;
  value: string | number;
  type?: "text" | "number" | "password" | "email";
  error: string | false | undefined;
};

export function Input({ id, label, value, type = "text", error }: InputProps) {
  const [touched, setTouched] = useState(false);
  const { formIsSubmitted, onChange } = useFormContext();

  return (
    <>
      <label className="block" htmlFor={id}>
        {label}
      </label>
      <input
        className="mb-2"
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={() => setTouched(true)}
      />
      {error && (touched || formIsSubmitted) && (
        <p role="alert" className="text-red-500">
          {error}
        </p>
      )}
    </>
  );
}
