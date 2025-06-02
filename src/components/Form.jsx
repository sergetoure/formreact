import Submit from "./Submit";
import Input from "./Input";
import { useState } from "react";
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
  const handleChange = (e) => {
    if (e.target.id === "firstname") {
      setState(
        { ...state },
        {
          ...[...state.filter((item) => item.id == "firstname")][0],
          value: e.target.value,
        }
      );
    }
    console.log(state);
  };
  return (
    <>
      <form>
        {state.map((item) => {
          const { labelStyle, id, label, type, listName, value } = item;
          return (
            <Input
              key={id}
              labelStyle={labelStyle}
              type={type}
              id={id}
              label={label}
              listName={listName}
              value={value}
              onSetValue={handleChange}
            />
          );
        })}

        <Submit btnLabel="CREATE ACCOUNT" />
      </form>
    </>
  );
}
