export default function RoleList() {
  const roleList = ["user", "supervisor", "manager", "director", "partner"];
  return (
    <datalist id="rolesList">
      {roleList.map((role, index) => (
        <option key={index} value={role}>
          {role[0].toUpperCase() + role.slice(1)}
        </option>
      ))}
    </datalist>
  );
}
