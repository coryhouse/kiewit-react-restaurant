import { useState } from "react";

type InputProps = {
  id: string;
  label: string;
  value: string | number;
  type?: "text" | "number" | "password" | "email";
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | false | undefined;
};

export function Input({
  id,
  label,
  value,
  onChange,
  type = "text",
  error,
}: InputProps) {
  const [touched, setTouched] = useState(false);

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
      {error && touched && <p className="text-red-500">{error}</p>}
    </>
  );
}
