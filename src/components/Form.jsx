import Submit from "./Submit";
import Input from "./Input";
import { useState,useRef } from "react";
const initialState = [
  {
    labelStyle: "data__label  required",
    id: "firstname",
    label: "First name",
    type: "text",
    value: "",
  },
  {
    labelStyle: "data__label",
    id: "lastname",
    label: "Last name",
    type: "text",
    value: "",
  },
  {
    labelStyle: "data__label  required",
    id: "email",
    label: "Email address",
    type: "email",
    value: "",
  },
  {
    labelStyle: "data__label  required",
    id: "password",
    label: "Password",
    type: "password",
    value: "",
  },
  {
    labelStyle: "data__label  required",
    id: "passwordconfirm",
    label: "Confirm password",
    type: "password",
    value: "",
  },
  {
    labelStyle: "data__label  required",
    id: "roles",
    label: "Role",
    type: "text",
    listName: "rolesList",
    value: "",
  },
  {
    labelStyle: "data__label",
    id: "files",
    label: "Upload files",
    type: "file",
  },
];
export default function Form() {
  const [state, setState] = useState(initialState);
  const fileRef = useRef(null);
  const handleChange = (e) => {
  
   //update state with the new value
      setState((prevState) =>
        prevState.map((item) =>
          item.id === e.target.id && e.target.type!="file" ? { ...item, value: e.target.value } : item
        )
      );

   
       
 
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
  }
  return (
    <>
      <form className="form" onSubmit={handleSubmit}> 
        {state.map((item) => {
          const { labelStyle, id, label, type, listName, value } = item;
          return type === "file" ? (
            <Input
              key={id}
              labelStyle={labelStyle}
              type={type}
              id={id}
              label={label}
              listName={listName}
              reference={fileRef}
             
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
            />
          );
        })}

        <Submit btnLabel="CREATE ACCOUNT" />
      </form>
    </>
  );
}
