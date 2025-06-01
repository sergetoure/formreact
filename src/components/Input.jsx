import { useState } from "react";
import RoleList from "./RoleList";
const roleList = ["user", "supervisor", "manager", "director", "partner"];
export default function Input({ labelStyle, type, id, label, listName }) {
  const [roles, setValue] = useState(roleList);

  return (
    <div className="data">
      <label htmlFor={id} className={labelStyle}>
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        className="data__input"
        list={listName}
      />
      {listName === "rolesList" && <RoleList />}
    </div>
  );
}
