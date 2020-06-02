import React, { useState, useEffect } from "react";
import fire from "../services/Fire";
import Player from "../Player";
import "./Home.css";
import * as $ from "jquery";
import PropTypes from 'prop-types';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const styles = {
  largeIcon: {
    width: 150,
    height: 150,
  },
};

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#1db954',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
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

    userRef.on("value", function (snapshot) {
      if (snapshot.exists()) {
        var data = snapshot.val();
        setUser({
          UID: data.UID,
          username: data.username,
          spotifyID: data.spotifyID,
          imageURL: data.imageURL,
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
          username: data.display_name,
          spotifyID: data.id,
          imageURL: data.images[0].url,
        };
        setUser({
          UID: UID,
          username: data.display_name,
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
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if (token && user) {
    return (
      <>
      <ThemeProvider theme={theme}>
        <h1>{user.username}</h1>
        <div className="home-wrapper">
        <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Playing" {...a11yProps(1)} />
          <Tab label="Item Tree" {...a11yProps(2)} />
          <Button onClick={() => fire.auth().signOut()} >Sign out</Button>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <Avatar alt="User Profile Image" src={user.imageURL} style={styles.largeIcon}/>          
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Player
            item={item}
            is_playing={is_playing}
            progress_ms={progress_ms}
          />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> 
      </div>
      </ThemeProvider>
      </>
    );
  } else {
    return (
      <>    
        <div className="loading_screen">
          <CircularProgress pb={8} color="secondary" style={styles.largeIcon} />
          <h1>Patience</h1>
        </div>
      </>
    );
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
