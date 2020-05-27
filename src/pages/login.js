import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import app from "../services/Fire";
import { AuthContext } from "../services/Auth.js";

import Button from '@material-ui/core/Button';
import "../App.css";

export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "f5cd8191488c48c98aa1bcbc801bb0a8";
const redirectUri = "http://localhost:3000/";
const scopes = ["user-read-currently-playing", "user-read-playback-state", "playlist-read-collaborative", "playlist-read-private"];

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
          if(!localStorage.getItem('token')){window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            "%20"
          )}&response_type=token&show_dialog=true`;}
          else{history.push("/");} 

      } catch (error) {
        setErrorMessage(error.message);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser && localStorage.getItem('token')) {
    return <Redirect to="/" />;
  }
  else if (currentUser && !localStorage.getItem('token')){
    return window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      "%20"
    )}&response_type=token&show_dialog=true`;
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
            <Button type="submit">Submit</Button>
            <Link to="/register">Dont Have an Account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
