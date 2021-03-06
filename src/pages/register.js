import React, { useCallback, useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import app from "../services/Fire";
import useClasses from "../tweaks/Classes";

import Typography from "@material-ui/core/Typography";

export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "f5cd8191488c48c98aa1bcbc801bb0a8";
const redirectUri = "http://localhost:3000/";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-collaborative",
];

const Register = ({ history }) => {
  const classes = useClasses();
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
    <div className={classes.registerWrapper}>
      <div className={classes.titleDiv}>
        <Typography className={classes.titleText}>
          Register
        </Typography>
        </div>
      <div className={classes.formWrapper}>
        <form onSubmit={handleSignUp}>
          <div className={classes.emailPassword}>
            <label htmlFor="email">
              <Typography className={classes.label}>
                Email
              </Typography>
              </label>
            <input className={classes.input} name="email" type="email" placeholder="Email" />
          </div>
          <div className={classes.emailPassword}>
            <label htmlFor="password">
            <Typography className={classes.label}>
              Password
            </Typography>
            </label>
            <input className={classes.input} name="password" type="password" placeholder="Password" />
          </div>
          <div className={classes.createAccount}>
            <div className={classes.errorMessage}>{errorMessage}</div>
            <button className={classes.createAccountButton} type="submit">
            <Typography className={classes.createAccountButtonText}>
              Submit
            </Typography> 
            </button>
            <Link className={classes.createAccountA} to="/Login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Register);
