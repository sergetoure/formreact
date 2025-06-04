import Submit from "./Submit";
import Input from "./Input";
import { useState, useRef } from "react";
const initialState = {
  inputState: [
    {
      id: "firstname",
      label: "First name",
      type: "text",
      
      placeholder:"Enter your first name...",
      value: "",
      required: true,
      errorMsg: "",
      isValid: false,
    },
    {
      id: "lastname",
      label: "Last name",
      placeholder:"Enter your last name...",
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
      placeholder:"Enter your email...",
      value: "",
      required: true,
      errorMsg: "",
      isValid: false,
    },
    {
      id: "password",
      label: "Password",
      placeholder:"Enter your password...",
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
      placeholder:"Confirm your password...",
      type: "password",
      value: "",
      required: true,
      errorMsg: "",
      isValid: false,
    },
    {
      id: "roles",
      label: "Role",
      placeholder:"Select your role...",
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

  const handleChange = (e) => {
    const currentValue = e.target.value;
    const validityState = e.target.validity;
   
    
  
       setState((prevState) => ({
      ...prevState,
      inputState: prevState.inputState.map((item) =>
        item.id === e.target.id && e.target.type !== "file"
          ? {
              ...item,
              value: currentValue,
              isValid: currentValue !== "" && validityState.valid,
              errorMsg: validityState.valid ? "" : e.target.validationMessage
            }
          : item
      ),
      isValid: prevState.inputState.every((item) => 
        item.required ? (item.id === e.target.id ? (currentValue !== "" && validityState.valid) : item.isValid) : true
      )
    }));

console.log(state.isValid)

  }
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
            placeholder
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
              //onInput={handleBlur}
              required={required}
              minLength={minLength}
              errorMsg={errorMsg}
              placeholder={placeholder}
            />
          );
        })}

        <Submit btnLabel="CREATE ACCOUNT" disable={!state.isValid} />
      </form>
    </>
  );
}
