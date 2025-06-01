import Submit from "./Submit";
import Input from "./Input";
import { useState } from "react";
const initialState = [
  {
    labelStyle: "data__label  required",
    id: "firstname",
    label: "First name",
    type: "text",
  },
  {
    labelStyle: "data__label",
    id: "lastname",
    label: "Last name",
    type: "text",
  },
  {
    labelStyle: "data__label  required",
    id: "email",
    label: "Email address",
    type: "email",
  },
  {
    labelStyle: "data__label  required",
    id: "password",
    label: "Password",
    type: "password",
  },
  {
    labelStyle: "data__label  required",
    id: "passwordconfirm",
    label: "Confirm password",
    type: "password",
  },
  {
    labelStyle: "data__label  required",
    id: "roles",
    label: "Role",
    type: "text",
    listName: "rolesList",
  },
  {
    labelStyle: "data__label  required",
    id: "files",
    label: "Upload",
    type: "file",
  },
];
export default function Form() {
  const [state, setState] = useState(initialState);
  return (
    <>
      <form>
        {state.map((item) => {
          const { labelStyle, id, label, type, listName } = item;
          return (
            <Input
              key={id}
              labelStyle={labelStyle}
              type={type}
              id={id}
              label={label}
              listName={listName}
            />
          );
        })}

        <Submit btnLabel="CREATE ACCOUNT" />
      </form>
    </>
  );
}
