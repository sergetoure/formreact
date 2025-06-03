import Submit from "./Submit";
import Input from "./Input";
import { useState, useRef } from "react";
const initialState = {
  inputState: [
    {
      id: "firstname",
      label: "First name",
      type: "text",
      value: "",
      required: true,
      errorMsg: "",
      isValid: false,
    },
    {
      id: "lastname",
      label: "Last name",
      type: "text",
      value: "",
      required: true,
      errorMsg: "",
      isValid: false,
    },
    {
      id: "email",
      label: "Email address",
      type: "email",
      value: "",
      required: true,
      errorMsg: "",
      isValid: false,
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      value: "",
      required: true,
      minLength: 8,
      errorMsg: "",
      isValid: false,
    },
    {
      id: "passwordconfirm",
      label: "Confirm password",
      type: "password",
      value: "",
      required: true,
      errorMsg: "",
      isValid: false,
    },
    {
      id: "roles",
      label: "Role",
      type: "text",
      listName: "rolesList",
      value: "",
      required: false,
      errorMsg: "",
      isValid: true,
    },
    {
      id: "files",
      label: "Upload files",
      type: "file",
      required: false,
      errorMsg: "",
      isValid: true,
    },
  ],
  isValid: false,
};
export default function Form() {
  const [state, setState] = useState(initialState);
  const fileRef = useRef(null);

  //validatEmail function to check if the email is valid
  const validateEmail = (email) => {
    // A simple regex for validating email addresses
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleBlur = (e) => {
    const id = e.target.id;
    //The first name cannot be empty.
    // The email must be a valid email address and can't be empty. A function called validateEmail has already been provided for you to check if the email is valid. It returns true if the email is valid, otherwise  false is returned.
    // The password must be at least 8 characters long.
    // The role must be either individual or business.
    //set the isValid property to true if all the above conditions are met, otherwise set it to false.

    const inputToValidate = state.inputState.find((input) => input.id === id);
    if (!inputToValidate) return false;

    if (inputToValidate.required && !inputToValidate.value) {
      setState((prevState) => ({
        ...prevState,
        inputState: prevState.inputState.map((i) =>
          i.id === inputToValidate.id
            ? { ...i, errorMsg: `${i.label} is required`, isValid: false }
            : i
        ),
      }));
      return false;
    }

    if (
      inputToValidate.type === "email" &&
      inputToValidate.value &&
      !validateEmail(inputToValidate.value)
    ) {
      setState((prevState) => ({
        ...prevState,
        inputState: prevState.inputState.map((i) =>
          i.id === inputToValidate.id
            ? { ...i, errorMsg: "Invalid email address", isValid: false }
            : i
        ),
      }));
      return false;
    }

    if (
      inputToValidate.type === "password" &&
      inputToValidate.minLength &&
      inputToValidate.value.length < inputToValidate.minLength
    ) {
      setState((prevState) => ({
        ...prevState,
        inputState: prevState.inputState.map((i) =>
          i.id === inputToValidate.id
            ? {
                ...i,
                errorMsg: `${i.label} must be at least ${i.minLength} characters long`,
                isValid: false,
              }
            : i
        ),
      }));
      return false;
    }

    // Password confirmation validation
    if (inputToValidate.id === "passwordconfirm") {
      const passwordInput = state.inputState.find(
        (input) => input.id === "password"
      );
      if (passwordInput && inputToValidate.value !== passwordInput.value) {
        setState((prevState) => ({
          ...prevState,
          inputState: prevState.inputState.map((i) =>
            i.id === inputToValidate.id
              ? { ...i, errorMsg: "Passwords do not match", isValid: false }
              : i
          ),
        }));
        return false;
      }
    }

    // If all validations pass, clear error and set isValid
    setState((prevState) => ({
      ...prevState,
      inputState: prevState.inputState.map((i) =>
        i.id === inputToValidate.id ? { ...i, errorMsg: "", isValid: true } : i
      ),
    }));
    console.log(state);

    // Check if the entire form is valid
    const isValid = state.inputState.every((item) =>
      item.required ? item.isValid : true
    );
    setState((prevState) => ({
      ...prevState,
      isValid: isValid ? true : false,
    }));
    return true;
  };
  const handleChange = (e) => {
    //update state with the new value
    setState((prevState) => ({
      ...prevState,
      inputState: prevState.inputState.map((item) =>
        item.id === e.target.id && e.target.type !== "file"
          ? { ...item, value: e.target.value }
          : item
      ),
    }));

    // Call getIsFormValid to check if the form is valid
    //the getIsFormValid function should be called after the state is updated
    // This ensures that the validation reflects the latest input values
    //the getisformvalid must be checked when after the input has been changed
    // and the state has been updated
    // This is to ensure that the validation reflects the latest input values

    //console.log(state);
    //handleBlur(e);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle file upload if needed
    //add new promise
    //set time out to simulate file upload
    // This is just a placeholder for actual file upload logic

    const files = Object.entries(fileRef.current.files);
    if (files.length > 0) {
      files.forEach(([key, file]) => {
        console.log(`File ${key}:`, file.name);
      });
    }

    // Log the current state
    console.log("Form submitted with state:");
    console.log(state);
    // Reset the form
    setState(initialState);
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        {state.inputState.map((item) => {
          const {
            labelStyle,
            id,
            label,
            type,
            listName,
            value,
            required,
            minLength,
            errorMsg,
          } = item;
          return type === "file" ? (
            <Input
              key={id}
              labelStyle={labelStyle}
              type={type}
              id={id}
              label={label}
              reference={fileRef}
              required={required}
              errorMsg={errorMsg}
            />
          ) : (
            <Input
              key={id}
              labelStyle={labelStyle}
              type={type}
              id={id}
              label={label}
              listName={listName}
              val={value}
              onSetValue={handleChange}
              onBlurOut={handleBlur}
              required={required}
              minLength={minLength}
              errorMsg={errorMsg}
            />
          );
        })}

        <Submit btnLabel="CREATE ACCOUNT" disable={!state.isValid} />
      </form>
    </>
  );
}
