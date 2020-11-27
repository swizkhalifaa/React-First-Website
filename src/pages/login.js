import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import app from "../services/Fire";
import { AuthContext } from "../services/Auth.js";
import useClasses from "../tweaks/Classes";

import Typography from "@material-ui/core/Typography";

export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "f5cd8191488c48c98aa1bcbc801bb0a8";
const redirectUri = "http://localhost:3000/";
const scopes = 
["user-read-currently-playing", 
"user-read-playback-state", 
"playlist-read-collaborative", 
"user-top-read"];

const Login = ({ history }) => {
  const classes = useClasses();
  const [errorMessage, setErrorMessage] = useState(null);
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
          if(!localStorage.getItem('token')){window.location.href = `${authEndpoint}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes.join(
            "%20"
          )}&show_dialog=true`;}
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
    <div className={classes.loginWrapper}>
      <div className={classes.titleDiv}>
        <Typography className={classes.titleText}>
          Login
        </Typography>
        </div>
      <div className={classes.formWrapper}>
        <form onSubmit={handleLogin}>
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
            <Link className={classes.createAccountA} to="/Register">Dont Have an Account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);

{/* <div className="wrapper">
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
            <Link to="/Register">Dont Have an Account?</Link>
          </div>
        </form>
      </div>
    </div> */}