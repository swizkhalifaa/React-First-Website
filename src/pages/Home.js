import React, { useState, useEffect } from "react";
import DropdownMenu from "../components/DropdownMenu";
import fire from "../services/Fire";
import { useHistory } from "react-router-dom";
import * as $ from "jquery";
import styles from "../tweaks/Styles";
import useClasses from "../tweaks/Classes"

import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";

import Grid from "@material-ui/core/Grid";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../tweaks/Theme";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import DrawerLeft from "../components/Drawer";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";

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
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const classes = useClasses();
  const history = useHistory();

  const scroll = (direction) => {
    let far = $(".playlist-object").width() * 6.8 * direction;
    let pos = $(".playlist-container").scrollLeft() + far;
    $(".playlist-container").animate({ scrollLeft: pos }, 55);
  };

  var UID = fire.auth().currentUser.uid;

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
            }
          } else {
            setToken(localStorage.getItem("token"));
          }
        } else {
          if (!localStorage.getItem("token")) {
            if (_token) {
              localStorage.setItem("token", _token);
              setToken(_token);
              getUserRegistered(_token);
            }
          } else {
            setToken(localStorage.getItem("token"));
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


  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (user && token) {
    return (
      <>
        <ThemeProvider theme={theme}>
          <AppBar>
            <Toolbar className={classes.mainToolbar}>
              <Avatar onClick={() => {history.push("/PROFILE") }} className={classes.toolbarAvatar} alt="User Profile Image" src={user.imageURL} />
              <DropdownMenu/>
              <Paper component="form" className={classes.searchBar}>
                <InputBase
                  className={classes.searchField}
                  placeholder="Search"
                  inputProps={{ "aria-label": "search" }}
                />
                <IconButton
                  type="submit"
                  className={classes.searchIcon}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Toolbar>
          </AppBar>
          <Grid container className={classes.mainGrid}>
            <Grid item md={3} lg={3}>
              <div className={classes.leftWrapper}>
                <DrawerLeft />
              </div>
            </Grid>
            <Grid item xs={12} md={9} lg={6}>
              <div className={classes.middleWrapper}>
                
              </div>
            </Grid>
            <Hidden mdDown>
              <Grid item lg={3}>
                <div className={classes.rightWrapper}></div>
              </Grid>
            </Hidden>
          </Grid>
        </ThemeProvider>
      </>
    );
  } else {
    return (
      <>
        <div className={classes.loadingWrapper}>
          <CircularProgress pb={8} color="secondary" style={styles.largeIcon} />
          <Typography noWrap className={classes.loadingTitle}>
            Loading...
          </Typography>
        </div>
      </>
    );
  }
};

export default Home;

