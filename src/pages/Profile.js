import React, { useState, useEffect } from "react";
import Playlist from "../components/Playlist";
import Artist from "../components/Artist";
import Song from "../components/Song";
import fire from "../services/Fire";
import * as $ from "jquery";
import styles from "../tweaks/Styles";

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
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  avatar: {
    width: 250,
    height: 250,
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
    height: 200,
    position: "relative",
  },
  topName: {
    paddingLeft: 30,
    position: "absolute",
    bottom: 0,
  },
  topMusicDiv:{

  },
  topArtistDiv: {
    margin: 30,
    float: 'left'
  },
  topTrackDiv: {
    margin: 30,
    float: 'right'
  },
  musictext: {
    flexGrow: 1,
    fontFamily: "Century Gothic",
    letterSpacing: -1,
    fontSize: 35,
    fontWeight: "bold",
  },
  playlistList: {
    width: "80%",
    margin: "0 auto",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "row",
    scrollBehavior: "smooth",
  },
  profileTitles: {
    marginLeft: 20,
    marginRight: 20,
    flexGrow: 1,
    fontFamily: "Century Gothic",
    fontSize: 45,
    fontWeight: "bold",
    color: "#ffffff",
  },
  playlistTitleDiv: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 500,
  },
  navigationArrows: {
    color: "#adb5bd",
    "&:hover": {
      color: "#FF1654",
      cursor: "pointer",
    },
  },
  playlistDiv: {
    padding: 10,
    display: "flex",
    placeContent: 'center'
  },
  divider: {
    backgroundColor: "#FF1654",
  },
  emptyPlaylist: {
    flexGrow: 1,
    fontFamily: "Century Gothic",
    fontSize: 80,
    fontWeight: "bold",
    color: "#3c096c",
    paddingTop: 60
  },
  emptyTopMusic: {
    flexGrow: 1,
    fontFamily: "Century Gothic",
    fontSize: 40,
    fontWeight: "bold",
    color: "#3c096c",
    paddingTop: 20,
    paddingLeft: 20
  },
});

const Profile = () => {
  const [topTrack, setTopTrack] = useState(null);
  const [topArtist, setTopArtist] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const classes = useStyles();

  const scroll = (direction) => {
    let far = $(".playlist-object").width() * 6.8 * direction;
    let pos = $(".playlist-container").scrollLeft() + far;
    $(".playlist-container").animate({ scrollLeft: pos }, 55);
  };

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
        getMyPlaylists(localStorage.getItem("token"), data);
      } else {
        getTopMusic(token);
        getMyPlaylists(token, data);
      }
    });
  }, []);

  function getTopMusic(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        if (!data) {
          alert("fail");
          return;
        }
        if (data.items[9]) {
          setTopArtist(data.items[9]);
        }
      },
    });
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        if (!data) {
          alert("fail");
          return;
        }
        if (data.items[9]) {
          setTopTrack(data.items[9]);
        }
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
          if (
            item.images[0] &&
            item.owner.id &&
            item.owner.id === user.spotifyID
          ) {
            setUserPlaylists((userPlaylists) => userPlaylists.concat(item));
          }
        });
      },
    });
  }
  if (user && token) {
    return (
      <>
        <ThemeProvider theme={theme}>
          <div className={classes.topDiv}>
            <div className={classes.topName}>
              <h1>{user.username}</h1>
            </div>
          </div>
          <div className="home-wrapper">
            <AppBar position="static">
              <Toolbar className={classes.toolbar}>
                <TemporaryDrawer />
                <Grid container justify="center" alignItems="center">
                  <Avatar
                    alt="User Profile Image"
                    src={user.imageURL}
                    className={classes.avatar}
                  />
                </Grid>
              </Toolbar>
            </AppBar>
            <div className={classes.topMusicDiv}>
            <div className={classes.topArtistDiv}>
              <Typography className={classes.profileTitles}>
                Top Artist
              </Typography>
                <Divider variant="middle" classes={{ root: classes.divider}} />
                {topArtist ? <Artist artist={topArtist}/> : 
                <div> 
                <Typography className={classes.emptyTopMusic}>
                None
                </Typography>
                </div>}
              </div>
              <div className={classes.topTrackDiv}>
              <Typography className={classes.profileTitles}>
                Top Song
                </Typography>
                <Divider variant="middle" classes={{ root: classes.divider}} />
                {topTrack ? <Song song={topTrack}/> : 
                <div> 
                <Typography className={classes.emptyTopMusic}>
                None
                </Typography>
                </div>}
              </div>     
            </div>
            <div className={classes.playlistTitleDiv}>
              <Typography className={classes.profileTitles}>
                Playlists
              </Typography>
              <Divider variant="middle" classes={{ root: classes.divider}} />
            </div>
            <div className={classes.playlistDiv}>
            {topTrack ? 
            <>
            <ChevronLeftIcon onClick={() => scroll(-1)} className={classes.navigationArrows} style={styles.largeIcon}/>
              <List className={`${classes.playlistList} playlist-container`}>
                {userPlaylists.map((playlist) => (
                  <ListItem
                    className={`${classes.playlistObject} playlist-object`}
                  >
                    <Playlist item={playlist} />
                  </ListItem>
                ))}
              </List>
              <ChevronRightIcon onClick={() => scroll(1)} className={classes.navigationArrows} style={styles.largeIcon}/> 
              </>
             : <div> 
               <Typography className={classes.emptyPlaylist}>
               No Playlists
               </Typography>
               </div>}
            </div>
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
