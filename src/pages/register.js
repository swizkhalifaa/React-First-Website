import React, { useCallback, useState, useEffect } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import app from "../services/Fire";

import * as $ from "jquery";
import Player from "../Player.js";

import "../App.css";

export const authEndpoint = "https://accounts.spotify.com/authorize/";

const clientId = "f5cd8191488c48c98aa1bcbc801bb0a8";
const redirectUri = "http://localhost:3000/";
const scopes = ["user-read-currently-playing", "user-read-playback-state"];

// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";




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
                  .then(() => {
                    history.push("/");
                  });
              }
            });
        } catch (error) {
          setErrorMessage(error.message);
        }
      }
    },
    [history]
  );

  const [token, setToken] = useState(null);
  const [item, setItem] = useState({album: {images: [{ url: "" }] }, name: "", artists: [{ name: "" }], duration_ms:0 })
  const [is_playing, setIs_playing] = useState("Paused");
  const [progress_ms, setProgress_ms] = useState(0);

  getCurrentlyPlaying = getCurrentlyPlaying.bind(this);

  useEffect(() => {
    // Set token
    let _token = hash.access_token;
    if (_token) {
      // Set token
      setToken(_token);
      getCurrentlyPlaying(_token)
    }
  }, []);

  function getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        setItem(data.item)
        setIs_playing(data.is_playing)
        setProgress_ms(data.progress_ms)
      }
    });
  }

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
            <button type="submit">Submit</button>
            <Link to="/login">Login</Link>
            <div>

            {!token && (
              <a href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}>
                Spotify
              </a>
            )}
            {token && ( <Player item={item} is_playing={is_playing} progress_ms={progress_ms} />)}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Register);
