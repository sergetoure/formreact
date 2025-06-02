import Submit from "./Submit";
import Input from "./Input";
import { useState, useRef, isValidElement } from "react";
const initialState = {
  inputState: [
    {
      id: "firstname",
      label: "First name",
      type: "text",
      value: undefined,
      required: true,
      errorMsg: "",
    },
    {
      id: "lastname",
      label: "Last name",
      type: "text",
      value: "",
      required: false,
      errorMsg: "",
    },
    {
      id: "email",
      label: "Email address",
      type: "email",
      value: "",
      required: true,
      errorMsg: "",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      value: "",
      required: true,
      minLength: 8,
      errorMsg: "",
    },
    {
      id: "passwordconfirm",
      label: "Confirm password",
      type: "password",
      value: "",
      required: true,
      errorMsg: "",
    },
    {
      id: "roles",
      label: "Role",
      type: "text",
      listName: "rolesList",
      value: "",
      required: true,
      errorMsg: "",
    },
    {
      id: "files",
      label: "Upload files",
      type: "file",
      required: false,
      errorMsg: "",
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

  const getIsFormValid = () => {
    //The first name cannot be empty.
    // The email must be a valid email address and can't be empty. A function called validateEmail has already been provided for you to check if the email is valid. It returns true if the email is valid, otherwise  false is returned.
    // The password must be at least 8 characters long.
    // The role must be either individual or business.
    //set the isValid property to true if all the above conditions are met, otherwise set it to false.

    const isValid = state.inputState.every((item) => {
      if (item.required && !item.value) {
        setState((prevState) => ({
          ...prevState,
          inputState: prevState.inputState.map((i) =>
            i.id === item.id ? { ...i, errorMsg: `${i.label} is required` } : i
          ),
        }));
        return false;
      }
      if (item.type === "email" && item.value && !validateEmail(item.value)) {
        setState((prevState) => ({
          ...prevState,
          inputState: prevState.inputState.map((i) =>
            i.id === item.id ? { ...i, errorMsg: "Invalid email address" } : i
          ),
        }));
        return false;
      }
      if (
        item.type === "password" &&
        item.minLength &&
        item.value.length < item.minLength
      ) {
        setState((prevState) => ({
          ...prevState,
          inputState: prevState.inputState.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  errorMsg: `${i.label} must be at least ${i.minLength} characters long`,
                }
              : i
          ),
        }));
        return false;
      }
      item.errorMsg = ""; // Clear error message if validation passes
      return true;
    });

    setState((prevState) => ({
      ...prevState,
      isValid,
    }));
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

    getIsFormValid();

    console.log(state);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle file upload if needed
    const files = Object.entries(fileRef.current.files);
    if (files.length > 0) {
      files.forEach(([key, file]) => {
        console.log(`File ${key}:`, file.name);
      });
    }
    // Log the current state
    console.log("Form submitted with state:");
    console.log(state);
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
              listName={listName}
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
