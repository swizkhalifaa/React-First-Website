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
  "playlist-read-private",
];

const Register = ({ history }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { firstname, lastname, email, password } = event.target.elements;
      if (firstname.value.length < 3 || lastname.value.length < 3) {
        setErrorMessage("First & last name over 2 characters");
      } else {
        try {
          await app
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then((userCredentials) => {
              if (userCredentials.user) {
                userCredentials.user
                  .updateProfile({
                    displayName: firstname.value + " " + lastname.value,
                  })
                    window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                      "%20"
                    )}&response_type=token&show_dialog=true`;
              }
            });
        } catch (error) {
          setErrorMessage(error.message);
        }
      }
    },
    []
  );

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Register</h1>
        <form onSubmit={handleSignUp}>
          <div className="firstName">
            <label htmlFor="firstName">First Name</label>
            <input name="firstname" type="text" placeholder="Firstname" />
          </div>
          <div className="lastName">
            <label htmlFor="lastName">Last Name</label>
            <input name="lastname" type="text" placeholder="Last name" />
          </div>
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
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Register);
