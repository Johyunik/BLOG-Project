import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./Nav";
import Error from "./Error";
import Home from "./Home";
import Board from "./Board";
import Edit from "./Edit";
import Write from "./Write";
import LoginForm from "./LoginForm";
import Profile from "./Profile";
import { signIn } from "./auth";
// import AuthRoute from "./AuthRoute";/

function App() {
  const [user, setUser] = useState(null);
  const authenticated = user != null;

  const login = ({ email, password }) => {
    const user = signIn(email, password);
    setUser(user);
  };
  const logout = () => {
    if (!window.confirm("로그아웃 하시겠습니까?")) {
      return;
    }
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Nav user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Board/:id" element={<Board user={user} />} />
        <Route
          path="/Write"
          element={
            authenticated ? (
              <Write user={user} />
            ) : (
              <Navigate to="/Login" replace />
            )
          }
        />
        <Route path="/Login" element={<LoginForm login={login} />} />
        <Route
          path="/Profile"
          element={
            authenticated ? (
              <Profile user={user} />
            ) : (
              <Navigate to="/Login" replace />
            )
          }
        />
        <Route path="/edit/:id" element={<Edit user={user} />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
