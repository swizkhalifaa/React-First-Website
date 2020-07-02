import React, { useCallback, useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import app from "../services/Fire";

import Button from "@material-ui/core/Button";
import "../App.css";

export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "f5cd8191488c48c98aa1bcbc801bb0a8";
const redirectUri = "http://localhost:3000/";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-collaborative",
];

const Register = ({ history }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
        try {
          await app
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then((userCredentials) => {
              if (userCredentials.user) {
                    window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                      "%20"
                    )}&response_type=token&show_dialog=true`;
              }
            });
        } catch (error) {
          setErrorMessage(error.message);
        }     
    },
    []
  );

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Register</h1>
        <form onSubmit={handleSignUp}>
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
            <Link to="/Login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Register);
