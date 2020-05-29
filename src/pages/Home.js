import React, { useState, useEffect } from "react";
import fire from "../services/Fire";
import Player from "../Player";
import "../App.css";
import * as $ from "jquery";

import Button from "@material-ui/core/Button";

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

const Home = () => {
  const [is_playing, setIs_playing] = useState("Paused");
  const [progress_ms, setProgress_ms] = useState(0);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  var username = fire.auth().currentUser.displayName;
  var UID = fire.auth().currentUser.uid;

  const [item, setItem] = useState({
    album: { images: [{ url: "" }] },
    name: "",
    artists: [{ name: "" }],
    duration_ms: 0,
  });

  var userRef = fire
    .database()
    .ref()
    .child(`users/${fire.auth().currentUser.uid}`);

  useEffect(() => {
    // Set token
    let _token = hash.access_token;

    userRef.on("value", function(snapshot) {
      if (snapshot.exists()) {
        var data = snapshot.val();
        setUser({
          UID: data.UID,
          username: data.username,
          spotifyID: data.spotifyID,
          imageURL: data.imageURL
        });
        
        if (!localStorage.getItem("token")) {
          if (_token) {
            localStorage.setItem("token", _token);
            setToken(_token);
            getCurrentlyPlaying(_token);
          }
        } else {
          setToken(localStorage.getItem("token"));
          getCurrentlyPlaying(localStorage.getItem("token"));
        }


      } else {
        
        if (!localStorage.getItem("token")) {
          if (_token) {
            localStorage.setItem("token", _token);
            setToken(_token);
            getCurrentlyPlaying(_token);
            getUserRegistered(_token);
          }
        } else {
          setToken(localStorage.getItem("token"));
          getCurrentlyPlaying(localStorage.getItem("token"));
          getUserRegistered(_token);
        }
      }
    });
  }, []);

  function getUserRegistered(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        if (!data) {
          return;
        }
        var tempUser = {
          UID: UID,
          username: username,
          spotifyID: data.id,
          imageURL: data.images[0].url,
        };
        setUser({
          UID: UID,
          username: username,
          spotifyID: data.id,
          imageURL: data.images[0].url,
        });

        userRef.set(tempUser);
      },
    });
  }

  function getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        if (!data) {
          return;
        }
        setItem(data.item);
        setIs_playing(data.is_playing);
        setProgress_ms(data.progress_ms);
      },
    });
  }

  function getMyPlaylists(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/playlists",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        if (!data) {
          alert("no data");
          return;
        }
        alert(data.items[0].name);
      },
    });
  }

  function getUserPlaylists(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/users/vitesku2000/playlists",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        if (!data) {
          alert("no data");
          return;
        }
        alert(data.items[0].owner.display_name);
      },
    });
  }
if(token) {
  return (
    <>
      <h1>{user.username}</h1>
      <div className="profile__img"><img src={user.imageURL} /></div>
      <Button onClick={() => fire.auth().signOut()}>Sign out</Button>
      <Button onClick={() => getUserPlaylists(token)}>Playlists</Button>
      <Button onClick={() => console.log(user)}>User</Button>
      <Player item={item} is_playing={is_playing} progress_ms={progress_ms} />)
    </>
  );
}
else {
  return (
    <div>Loading...</div>
  )
}
  
};

export default Home;

// function getRefreshToken(code) {
//   // Make a call using the token
//   $.ajax({
//     url: `https://accounts.spotify.com/api/token?grant_type=authorization_code&code=${code}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fregister`,
//     type: "POST",
//     beforeSend: (xhr) => {
//       xhr.setRequestHeader("Authorization: Basic ZjVjZDgxOTE0ODhjNDhjOThhYTFiY2JjODAxYmIwYTg6YTdmYWFhMDZkYTFhNGQ5MWJjZTllOTExOTk3MzYyZGY");
//     },
//     success: (data) => {
//       if (!data) {
//         alert('failure')
//         return;
//       }
//       alert('success')
//       localStorage.setItem('RefreshToken', data.refresh_token);
//     },
//     failure: (data) => {
//       if (!data) {
//         alert('failure')
//         return;
//       }
//       alert('failed')
//       localStorage.setItem('RefreshToken', data.refresh_token);
//     },
//   }).fail(alert('hi hi hi'));

// }

// function getParameterByName(name, url) {
//   if (!url) url = window.location.href;
//   name = name.replace(/[\[\]]/g, "\\$&");
//   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//     results = regex.exec(url);
//   if (!results) return null;
//   if (!results[2]) return "";
//   return decodeURIComponent(results[2].replace(/\+/g, " "));
// }
