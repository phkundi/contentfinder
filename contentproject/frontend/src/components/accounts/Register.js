import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import useInputState from "../../hooks/useInputState";
import useAuthState from "../../hooks/useAuthState";
import { MessageContext } from "../../context/messageContext";
import { createMessage } from "../../helpers/helpers";
import {
  FormContainer,
  FormTitle,
  FormTextInput,
  FormGroup,
  FormButton,
} from "../styles/AuthFormStyles";

function Register() {
  const { registerUser, auth } = useAuthState();
  const { dispatchMessages } = useContext(MessageContext);

  const [username, setUsername] = useInputState("");
  const [email, setEmail] = useInputState("");
  const [password, setPassword] = useInputState("");
  const [password2, setPassword2] = useInputState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatchMessages(
        createMessage({ passwordsNotMatch: "Passwords do not match" })
      );
    } else {
      const newUser = { username, password, email };
      registerUser(newUser);
    }
  };

  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    return (
      <FormContainer>
        <FormTitle>Create Account</FormTitle>
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
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Email Address"
              value={email}
              onChange={setEmail}
              required
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

          <FormGroup>
            <FormTextInput
              type="password"
              id="inputPassword2"
              className="form-control"
              placeholder="Confirm Password"
              value={password2}
              onChange={setPassword2}
              required
            />
          </FormGroup>

          <FormButton type="submit">Sign Up</FormButton>
          <hr className="my-4" />
          <FormButton color="#EA4335" type="button">
            <i className="fab fa-google mr-2"></i> Sign Up with Google
          </FormButton>
          <FormButton color="#3B5998" type="button">
            <i className="fab fa-facebook-f mr-2"></i> Sign Up with Facebook
          </FormButton>
        </form>
        <hr className="my-4" />
        <p>
          Already have an account? - <Link to="/login">Sign In</Link>
        </p>
      </FormContainer>
    );
  }
}

export default Register;
