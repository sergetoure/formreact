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
    const validity = e.target.validity; // Add this line to get HTML5 validation state

    const inputToValidate = state.inputState.find((input) => input.id === id);
    if (!inputToValidate) return false;

    // Check HTML5 validity first
    if (!validity.valid) {
      console.log(state, validity.valid);
      setState((prevState) => ({
        ...prevState,
        inputState: prevState.inputState.map((i) =>
          i.id === inputToValidate.id
            ? { ...i, errorMsg: e.target.validationMessage, isValid: false }
            : i
        ),
      }));
      return false;
    } else {
      // If valid, update the input state
      setState((prevState) => ({
        ...prevState,
        inputState: prevState.inputState.map((i) =>
          i.id === inputToValidate.id
            ? { ...i, errorMsg: "", isValid: true }
            : i
        ),
      }));
    }

    //check form overall validity
    const isFormValid = state.inputState.every((input) => input.isValid);
    //update form isValid state
    setState((prevState) => ({
      ...prevState,
      isValid: isFormValid,
    }));

    // ensure that after the last input is validated, the form's isValid state is updated
    if (id === "roles") {
      setState((prevState) => ({
        ...prevState,
        isValid: prevState.inputState.every((input) => input.isValid),
      }));
    }
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
