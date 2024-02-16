import { useState } from "react";

const useInput = ({ validator, required, message }) => {
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

  const onChange = (event) => {
    setEnteredValue(event.target.value);
  };

  const onBlur = (event) => {
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
