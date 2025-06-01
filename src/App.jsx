import "./App.scss";
import logo from "./assets/react.svg";
import Form from "./components/Form";

function App() {
  return (
    <div className="App">
      <img src={logo} alt="logo" className="logo" />
      <h1>Sign Up</h1>
      <Form />
    </div>
  );
}

export default App;
