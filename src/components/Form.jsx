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
      minLength: 8,
      errorMsg: "",
      isValid: false,
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

  //validatEmail function to check if the email is valid
  const validateEmail = (email) => {
    // A simple regex for validating email addresses
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // const handleBlur = (e) => {
   
  //   const id = e.target.id;

  //   //console.log(id)
  //   //The first name cannot be empty.
  //   // The email must be a valid email address and can't be empty. A function called validateEmail has already been provided for you to check if the email is valid. It returns true if the email is valid, otherwise  false is returned.
  //   // The password must be at least 8 characters long.
  //   // The role must be either individual or business.
  //   //set the isValid property to true if all the above conditions are met, otherwise set it to false.

  //   const inputToValidate = state.inputState.find((input) => input.id === id);
   
  //   if (!inputToValidate) return false;

  //   if (inputToValidate.required && !inputToValidate.value) {
  //     setState((prevState) => ({
  //       ...prevState,
  //       inputState: prevState.inputState.map((i) =>
  //         i.id === inputToValidate.id
  //           ? { ...i, errorMsg: `${i.label} is required`, isValid: false }
  //           : i
  //       ),
  //     }));
  //     //return false;
  //   }

  //   if (
  //     inputToValidate.type === "email" &&
  //     inputToValidate.value &&
  //     !validateEmail(inputToValidate.value)
  //   ) {
  //     setState((prevState) => ({
  //       ...prevState,
  //       inputState: prevState.inputState.map((i) =>
  //         i.id === inputToValidate.id
  //           ? { ...i, errorMsg: "Invalid email address", isValid: false }
  //           : i
  //       ),
  //     }));
  //    // return false;
  //   }

  //   if (
  //     inputToValidate.type === "password" &&
  //     inputToValidate.minLength &&
  //     inputToValidate.value.length < inputToValidate.minLength
  //   ) {
  //     setState((prevState) => ({
  //       ...prevState,
  //       inputState: prevState.inputState.map((i) =>
  //         i.id === inputToValidate.id
  //           ? {
  //               ...i,
  //               errorMsg: `${i.label} must be at least ${i.minLength} characters long`,
  //               isValid: false,
  //             }
  //           : i
  //       ),
  //     }));
  //    // return false;
  //   }

  //   // Password confirmation validation
  //   if (inputToValidate.id === "passwordconfirm") {
  //     const passwordInput = state.inputState.find(
  //       (input) => input.id === "password"
  //     );
  //     if (passwordInput && inputToValidate.value !== passwordInput.value) {
  //       setState((prevState) => ({
  //         ...prevState,
  //         inputState: prevState.inputState.map((i) =>
  //           i.id === inputToValidate.id
  //             ? { ...i, errorMsg: "Passwords do not match", isValid: false }
  //             : i
  //         ),
  //       }));
  //      // return false;
  //     }
  //   }

  //   // If all validations pass, clear error and set isValid
  //   setState((prevState) => ({
  //     ...prevState,
  //     inputState: prevState.inputState.map((i) =>
  //       i.id === inputToValidate.id ? { ...i, errorMsg: "", isValid: true } : i
  //     ),
  //   }));
  //   console.log(id)
  //   console.log(inputToValidate.isValid);
  //   console.log(inputToValidate.value)
  //   //console.log(inputToValidate.isValid)
  //   // Check if the entire form is valid
  //   const isValid = state.inputState.every((item) =>
  //     item.required ? item.isValid : true
  //   );
  //   setState((prevState) => ({
  //     ...prevState,
  //     isValid: isValid ? true : false,
  //   }));
  //   // ensure that after the last input is validated, the form's isValid state is updated
  //   // if (id === "roles") {
  //   //   setState((prevState) => ({
  //   //     ...prevState,
  //   //     isValid: prevState.inputState.every((input) => input.isValid),
  //   //   }));
  //   // }
  //  console.log(state.isValid)
 
  // };
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
    
//     else {
//   // Password confirmation validation
//   const passwordInput = state.inputState.find(
//     (input) => input.id === "password"
//   );

//   if (!passwordInput) {
//     console.error("Password input not found");
//     return;
//   }

//   if (currentValue !== passwordInput.value) {
    
//     setState((prevState) => ({
//       ...prevState,
//       inputState: prevState.inputState.map((i) =>
//         i.id === e.target.id
//           ? {
//               ...i,
//               value: currentValue,
//               errorMsg: "Passwords do not match",
//               isValid: false,
//             }
//           : i
//       ),
//       isValid: prevState.inputState.every((item) => item.isValid)
      
//     }));
//   } else {
//     setState((prevState) => ({
//       ...prevState,
//       inputState: prevState.inputState.map((i) =>
//         i.id === e.target.id
//           ? { ...i,
//             value: currentValue, 
//             errorMsg: "", 
//             isValid: true }
//           : i
//       ),
      
//         isValid: prevState.inputState.every((item) => item.isValid)
      
//     }));
//   }


// }
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
            />
          );
        })}

        <Submit btnLabel="CREATE ACCOUNT" disable={!state.isValid} />
      </form>
    </>
  );
}
