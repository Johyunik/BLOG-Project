import "./CSS/LoginForm.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginForm({ login }) {
  const center = {
    textAlign: "center",
  };
  const color = {
    color: "white",
  };
  const inputColor = {
    backgroundColor: "black",
    borderLeft: "0px",
    borderRight: "0px",
    borderTop: "0px",
    margin: "18px",
    width: "24%",
    height: "4vh",
    color: "white",
    fontSize: "19px",
    textAlign: "center",
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  let location = useLocation();
  let { from } = location.state || { from: "/" };

  const handleClick = async () => {
    try {
      await login({ email, password }); // assume this is an async function
      navigate(from);
      console.log(email, password);
      if (email !== login.email) {
        setEmailError("이메일을 확인해주세요");
      }
    } catch (e) {
      console.error(e);

      alert("Failed to login");
    }
  };

  return (
    <div style={center}>
      <h1 style={color}>Login</h1>
      <input
        style={inputColor}
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        type="text"
        placeholder="email"
      />
      {emailError && <p style={{ color: "red" }}>{emailError}</p>}
      <br></br>
      <input
        style={inputColor}
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
        type="password"
        placeholder="password"
      />
      <br></br>
      {/* show error message if exists */}
      {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
      <button onClick={handleClick}>Login</button>
    </div>
  );
}
