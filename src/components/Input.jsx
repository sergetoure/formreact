import { useState } from "react";
import RoleList from "./RoleList";
const roleList = ["user", "supervisor", "manager", "director", "partner"];
export default function Input({
  labelStyle,
  type,
  id,
  label,
  listName,
  val,
  onSetValue,
  reference
}) {
  const [roles, setRoles] = useState(roleList);

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
        value={val}
        onChange={onSetValue}
        ref={type==="file" ? reference:null}
      />
      {listName === "rolesList" && <RoleList />}
    </div>
  );
}
