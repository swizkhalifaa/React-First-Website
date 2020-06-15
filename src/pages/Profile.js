import React, { useState, useEffect } from "react";
import Playlist from "../components/Playlist";
import fire from "../services/Fire";
import * as $ from "jquery";
import styles from "../tweaks/Styles"

import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../tweaks/Theme";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TemporaryDrawer from "../components/Drawer";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";



const useStyles = makeStyles({
  avatar: {
    width: 300,
    height: 300,
    borderStyle: "solid",
    borderWidth: 20,
    color: "#1db954",
  },
  boxStyle: {
    width: 350,
    height: 350,
    backgroundColor: "#1db954",
  },
  toolbar: {
    margin: 10,
    height: 40,
  },
  topDiv: {
    height: 300,
    position: "relative",
  },
  topName: {
    paddingLeft: 30,
    position: "absolute",
    bottom: 0,
  },
  topMusicDiv: {
    paddingRight: 30,
    position: "absolute",
    right: 0,
    top: 0,
  },
  topMusic: {
    right: 0,
    bottom: 0,
  },
  tabButton: {
    left: 0,
  },
  musictext: {
    flexGrow: 1,
    fontFamily: "Century Gothic",
    letterSpacing: -1,
    fontSize: 35,
    fontWeight: "bold",
  },
  playlistSection: {
    borderRightWidth: 0,
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 140,
  },
  playlistObject: {
    '&:hover': {
    
      background: "#f00",
      cursor: 'pointer'
    },
  }
});

const Profile = () => {
  const [topTrack, setTopTrack] = useState(null);
  const [topArtist, setTopArtist] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const classes = useStyles();

  var userRef = fire
    .database()
    .ref()
    .child(`users/${fire.auth().currentUser.uid}`);

  useEffect(() => {
    userRef.on("value", function (snapshot) {
      var data = snapshot.val();
      setUser({
        UID: data.UID,
        username: data.username,
        spotifyID: data.spotifyID,
        imageURL: data.imageURL,
      });
      if (token == null) {
        setToken(localStorage.getItem("token"));
        getTopMusic(localStorage.getItem("token"));
        getMyPlaylists(localStorage.getItem("token"), data)
      } else {
        getTopMusic(token);
        getMyPlaylists(token, data);
      }
    });
    
  }, []);

  function getTopMusic(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/artists",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        if (!data) {
          alert("fail");
          return;
        }
        setTopArtist(data.items[0].name);
      },
    });
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/tracks",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        if (!data) {
          alert("fail");
          return;
        }
        setTopTrack(data.items[0].name);
      },
    });
  }

  function getMyPlaylists(token, user) {
  // Make a call using the token
  $.ajax({
    url: "https://api.spotify.com/v1/me/playlists?limit=50",
    type: "GET",
    beforeSend: (xhr) => {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: (data) => {
      if (!data) {
        alert("no data");
        return;
      }
      data.items.forEach((item) => {
        if(item.owner.id && item.owner.id === user.spotifyID){
          setUserPlaylists(userPlaylists => userPlaylists.concat(item))
        }
      })     
    },
  });
}

  if (user && token && userPlaylists) {
    return (
      <>
        <ThemeProvider theme={theme}>
          <div className={classes.topDiv}>
            <div className={classes.topName}>
              <h1>{user.username}</h1>
            </div>
            <div className={classes.topMusicDiv}>
              <div className={classes.topMusic}>
                <Typography className={classes.musictext} color="secondary">
                  Top Song: {topTrack}
                </Typography>
              </div>
              <div className={classes.topMusic}>
                <Typography className={classes.musictext} color="secondary">
                  Top Artist: {topArtist}
                </Typography>
              </div>
            </div>
          </div>
          <div className="home-wrapper">
            <AppBar position="static">
              <Toolbar className={classes.toolbar}>
                <div className={classes.tabButton}>
                  <TemporaryDrawer />
                </div>
                <Grid container justify="center" alignItems="center">
                  <Avatar
                    alt="User Profile Image"
                    src={user.imageURL}
                    className={classes.avatar}
                  />
                </Grid>
              </Toolbar>
            </AppBar>
            <List className={classes.playlistSection}>
            {userPlaylists.map((playlist) =>(
              <ListItem className={classes.playlistObject}>
              <Playlist item={playlist}/>
              </ListItem>
            ))}
          </List>
          </div>
        </ThemeProvider>
      </>
    );
  } else {
    return (
      <>
        <div className="loading_screen">
          <CircularProgress pb={8} color="secondary" style={styles.largeIcon} />
        </div>
      </>
    );
  }
};

export default Profile;
