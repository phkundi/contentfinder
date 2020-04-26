import React from "react";
import { Redirect, Link } from "react-router-dom";
import useInputState from "../../hooks/useInputState";
import useToggleState from "../../hooks/useToggleState";
import useAuthState from "../../hooks/useAuthState";
import {
  FormContainer,
  FormTitle,
  FormTextInput,
  FormGroup,
  FormButton,
} from "../styles/AuthFormStyles";

function Login() {
  const { loginUser, auth } = useAuthState();
  const [username, setUsername] = useInputState("");
  const [password, setPassword] = useInputState("");
  const [save, toggleSave] = useToggleState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // set local storage item which prevents token from being deleted on window close
    if (save) {
      window.localStorage.setItem("save-login", true);
    }
    // login user
    loginUser(username, password);
  };

  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    return (
      <FormContainer>
        <FormTitle>Sign In</FormTitle>
        <form className="form-signin" onSubmit={handleSubmit}>
          <FormGroup>
            <FormTextInput
              type="text"
              id="inputUsername"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={setUsername}
              required
              autoFocus
            />
          </FormGroup>

          <FormGroup>
            <FormTextInput
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={setPassword}
              required
            />
          </FormGroup>

          <div className="custom-control custom-checkbox mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
              onChange={toggleSave}
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Keep me logged in
            </label>
          </div>
          <FormButton type="submit">Sign in</FormButton>
          <hr className="my-4" />
          <FormButton color="#EA4335" type="submit">
            <i className="fab fa-google mr-2"></i> Sign in with Google
          </FormButton>
          <FormButton color="#3B5998" type="submit">
            <i className="fab fa-facebook-f mr-2"></i> Sign in with Facebook
          </FormButton>
        </form>
        <hr className="my-4" />
        <p>
          Don't have an account? - <Link to="/register">Register</Link>
        </p>
        <p>
          <Link to="#">Forgot password</Link>
        </p>
      </FormContainer>
    );
  }
}

export default Login;
