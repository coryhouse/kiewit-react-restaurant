type InputProps = {
  id: string;
  label: string;
  value: string | number;
  type?: "text" | "number" | "password" | "email";
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | false | undefined;
  onBlur: () => void;
  touched: boolean;
};

export function Input({
  id,
  label,
  value,
  onChange,
  type = "text",
  error,
  onBlur,
  touched,
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
        onBlur={() => onBlur()}
      />
      {error && touched && <p className="text-red-500">{error}</p>}
    </>
  );
}
