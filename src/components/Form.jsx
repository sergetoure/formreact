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
      errorMsg: "",
      isValid: false,
      //add regex pattern to check if the password is at least 8 characters long and contain alpha numeric characters
      pattern: "^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$",
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
      required: true,
      errorMsg: "",
      isValid: false,
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

  const handleBlur = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    const validity = e.target.validity;

    const inputToValidate = state.inputState.find((input) => input.id === id);
    if (!inputToValidate) return false;

    // Create a new state update
    setState((prevState) => {
      // First update the current input
      const updatedInputState = prevState.inputState.map((input) => {
        if (input.id === id) {
          // Check if field is empty and required
          if (input.required && !value) {
            return {
              ...input,
              value,
              isValid: false,
              errorMsg: "This field is required",
            };
          }
          // Check other validations if field has value
          return {
            ...input,
            value,
            isValid: validity.valid,
            errorMsg: validity.valid ? "" : e.target.validationMessage,
          };
          //manage confirm password validation
        } else if (input.id === "passwordconfirm") {
          // Check if confirm password matches password
          const passwordInput = prevState.inputState.find(
            (input) => input.id === "password"
          );
          if (value !== passwordInput.value) {
            return {
              ...input,
              value,
              isValid: false,
              errorMsg: "Passwords do not match",
            };
          }
          return {
            ...input,
            value,
            isValid: true,
            errorMsg: "",
          };
        }
        return input;
      });

      // Then check overall form validity
      const isFormValid = updatedInputState.every((input) =>
        input.required ? input.isValid : true
      );

      // Return updated state
      return {
        ...prevState,
        inputState: updatedInputState,
        isValid: isFormValid,
      };
    });
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
            pattern,
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
              pattern={pattern}
              errorMsg={errorMsg}
            />
          );
        })}

        <Submit btnLabel="CREATE ACCOUNT" disable={!state.isValid} />
      </form>
    </>
  );
}
