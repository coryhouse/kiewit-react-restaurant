type InputProps = {
  id: string;
  label: string;
  value: string | number;
  type?: "text" | "number" | "password" | "email";
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Input({
  id,
  label,
  value,
  onChange,
  type = "text",
}: InputProps) {
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
      />
    </>
  );
}
