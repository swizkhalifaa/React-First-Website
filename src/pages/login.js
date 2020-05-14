import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import app from "../services/Fire";
import { AuthContext } from "../services/Auth.js";

import "../App.css";

const Login = ({ history }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        setErrorMessage(error.message);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input name="email" type="email" placeholder="Email" />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input name="password" type="password" placeholder="Password" />
          </div>
          <div className="createAccount">
          <div className="errorMessage">{errorMessage}</div>
            <button type="submit">Submit</button>
            <Link to="/register">Dont Have an Account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
