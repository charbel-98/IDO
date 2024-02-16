import { useNavigate } from "react-router-dom";
import classes from "./sideForm.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/authSlice";
import { useState } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import useInput from "../../hooks/useInput";
function SideForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    value: email,
    isValid: emailIsValid,
    errorMessage: emailErrorMessage,
    touched: emailTouched,
    onChange: emailChangeHandler,
    onBlur: emailBlurHandler,
  } = useInput({
    validator: (value: string) => {
      const mobileRegex =
        /(?:\+961|961)?(1|0?3[0-9]?|[4-6]|70|71|76|78|79|7|81?|9)\d{6}/;
      const emailRegex =
        /[\w]*@*[a-z]*\.*[\w]{5,}(\.)*(com)*(@osdservices\.com)/;
      return mobileRegex.test(value.trim()) || emailRegex.test(value.trim());
    },
    required: true,
    message: "Email must be valid",
  });
  const {
    value: password,
    isValid: passwordIsValid,
    errorMessage: passwordErrorMessage,
    touched: passwordTouched,
    onChange: passwordChangeHandler,
    onBlur: passwordBlurHandler,
  } = useInput({
    validator: (value: string) => {
      const regex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      return regex.test(value.trim());
    },
    required: true,
    message:
      "Password must be at least 8 digits, one special character, one uppercase and one number",
  });
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(
      login({ email, password }) as unknown as AnyAction
    ); // Updated dispatch function with correct action type
    console.log(result);
    navigate("/");
  };
  return (
    <div className={`${classes.container}`}>
      <form onSubmit={submitHandler} className={`${classes.formContainer} `}>
        <p>Time to work!</p>
        <input
          type="text"
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          placeholder="user@example.com"
          className={`${emailIsValid && emailTouched && classes.inputError}`}
        />
        <div>{emailErrorMessage}</div>
        <input
          type="password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={password}
          placeholder="**********"
          className={`${
            passwordIsValid && passwordTouched && classes.inputError
          }`}
        />
        <div>{passwordErrorMessage}</div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default SideForm;
