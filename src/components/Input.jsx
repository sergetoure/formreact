import { useState } from "react";
import RoleList from "./RoleList";
const roleList = ["user", "supervisor", "manager", "director", "partner"];
export default function Input({
  type,
  id,
  label,
  listName,
  val,
  onSetValue,
  onInput,
  reference,
  required,
  minLength,
  errorMsg,
}) {
  return (
    <div className="data">
      <label
        htmlFor={id}
        className={required ? "data__label required" : "data__label"}
      >
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
        onInput={onInput}
        ref={reference}
        required={required}
        minLength={minLength}
      />
      <p className="error">{errorMsg}</p>
      {listName === "rolesList" && <RoleList />}
    </div>
  );
}
