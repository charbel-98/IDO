import { useState } from "react";
interface UseInputProps {
  validator: (value: string) => boolean;
  required: boolean;
  message: string;
  setBackendError: React.Dispatch<React.SetStateAction<boolean>>;
}
const useInput = ({
  validator,
  required,
  message,
  setBackendError,
}: UseInputProps) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  let valueIsValid = validator(enteredValue);
  let errorMessage = "";
  if (required && enteredValue === "" && isTouched) {
    errorMessage = "This field is required!";
  }
  if (!valueIsValid && isTouched && enteredValue !== "") {
    errorMessage = message;
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
    setBackendError(false);
  };

  const onBlur = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    errorMessage,
    touched: isTouched,
    onChange,
    onBlur,
    reset,
  };
};

export default useInput;
