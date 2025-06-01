import "./App.css";
import DessertList from "./DessertList";
import { useReducer, useRef } from "react";

const desserts = [
  {
    name: "Chocolate Cake",
    calories: 400,
    createdAt: "2022-09-01",
  },
  {
    name: "Ice Cream",
    calories: 200,
    createdAt: "2022-01-02",
  },
  {
    name: "Tiramisu",
    calories: 300,
    createdAt: "2021-10-03",
  },
  {
    name: "Cheesecake",
    calories: 600,
    createdAt: "2022-01-04",
  },
];
const reducer = (state, action) => {
  if (action.type === "input") {
    if (action.e.target.id === "username") {
      return { ...state, username: action.e.target.value };
    } else if (action.e.target.id === "password") {
      return { ...state, password: action.e.target.value };
    }
  }
};
const initialState = {
  username: "",
  password: "",
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fileRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const uploadFile = fileRef.current.files;
    console.log(uploadFile);
    console.log(state);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">username: </label>
          <input
            value={state.username}
            onChange={(e) => dispatch({ type: "input", e: e })}
            type="text"
            id="username"
          />
        </div>

        <div>
          <label htmlFor="password">password: </label>
          <input
            value={state.password}
            onChange={(e) => dispatch({ type: "input", e: e })}
            type="password"
            id="password"
          />
        </div>
        <div>
          <label htmlFor="">upload:</label>
          <input
            ref={fileRef}
            type="file"
            name="file"
            id="file"
            multiple={true}
          />
        </div>
        <button disabled={!state.username || !state.password} type="submit">
          submit
        </button>
      </form>
      <p>{state.username}</p>
      <p>{state.password}</p>
    </div>
  );
}

export default App;
