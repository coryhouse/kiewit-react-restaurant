import { createContext, useContext } from "react";

const FormContext = createContext<FormContextType | null>(null);

type FormContextType = {
  formIsSubmitted: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type FormProviderProps = {
  children: React.ReactNode;
  formIsSubmitted: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FormProvider({
  children,
  formIsSubmitted,
  onChange,
}: FormProviderProps) {
  return (
    <FormContext.Provider value={{ formIsSubmitted, onChange }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error(
      "useFormContext must be used within a FormProvider. Wrap a parent component in <FormProvider> to fix this error."
    );
  }
  return context;
}
