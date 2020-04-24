import React from "react";
import { Redirect } from "react-router-dom";
import useInputState from "../../hooks/useInputState";
import LoginForm from "./LoginForm";
import useAuthState from "../../hooks/useAuthState";

function Login() {
  const { loginUser, auth } = useAuthState();
  const [username, setUsername] = useInputState("");
  const [password, setPassword] = useInputState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(username, password);
  };

  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    return (
      <LoginForm
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
    );
  }
}

export default Login;
