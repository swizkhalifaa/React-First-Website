import React, { useState, useEffect } from "react";
import Playlist from "../components/Playlist";
import DropdownMenu from "../components/DropdownMenu";
import Artist from "../components/Artist";
import Song from "../components/Song";
import fire from "../services/Fire";
import { useHistory } from "react-router-dom";
import * as $ from "jquery";
import styles from "../tweaks/Styles";
import useClasses from "../tweaks/Classes";

import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../tweaks/Theme";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import DrawerLeft from "../components/Drawer";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../components/TabPanel";
import a11yProps from "../components/TabPanel";

const useProfileStyles = makeStyles({
  title: {
    fontFamily: "Century Gothic",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 0,
  },
  profileTitleName: {
    textAlignLast: "center",
    fontFamily: "Century Gothic",
    letterSpacing: -1,
    fontSize: 35,
    fontWeight: "bold",
  },
  bioDiv: {
    height: "25%",
    width: "100%",
    marginTop: "3%",
    paddingLeft: "2%",
    margin: "0 auto",
    textAlignLast: "center",
  },
  bioText: {
    fontFamily: "Century Gothic",
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
    letterSpacing: -1,
  },
  topMusicDiv: {
    paddingTop: "5%",
    display: "flex",
    placeContent: "center",
  },

  ppImg: {
    marginTop: "2%",
    color: "#FF1654",
    margin: "0 auto",
    width: "58%",
    height: "50%",
    borderStyle: "solid",
    borderWidth: 8,
  },
  ppName: {
    fontFamily: "Century Gothic",
    fontSize: 35,
    fontWeight: "bold",
    color: "#111",
    letterSpacing: -1,
  },

  ppPanel: {
    paddingTop: "2%",
    height: "100%",
    width: "100%",
    textAlignLast: "center",
  },
  trackPanel: {
    textAlignLast: "center",
    color: "#111",
    width: "100%",
  },
  artistPanel: {
    textAlignLast: "center",
    color: "#111",
    width: "100%",
  },

  profileTitles: {
    fontFamily: "Century Gothic",
    fontSize: 30,
    color: "#111",
    letterSpacing: -1,
  },
  profileAppbar: {
    marginTop: "5%",
  },
  profileToolbar: {
    width: "100%",
    paddingRight: 0,
    paddingLeft: 0,
    backgroundColor: "#FF1654",
    minHeight: 50,
  },
  profileButton: {
    width: "25%",
    minHeight: 50,
  },
  tabBar: {
    width: "100%",
  },
  topMusicEmptyImage: {
    borderStyle: "solid",
    borderWidth: 1,
    width: "60%",
    height: "100%",
    backgroundColor: "#ffffff",
    margin: "0 auto",
  },
  emptyTopMusicText: {
    flexGrow: 1,
    fontFamily: "Century Gothic",
    fontSize: 25,
    color: "#111",
    paddingTop: "15%",
    paddingBottom: "15%",
    letterSpacing: -1,
  },
  tabTitle: {
    fontFamily: "Century Gothic",
    fontSize: 55,
    color: "#111",
    paddingTop: "3%",
    letterSpacing: -1,
    paddingLeft: "2%",
  },
  playlistDiv: {
    paddingTop: "5%",
    color: "#FF1654",
    width: "100%",
  },
  playlistList: {
    width: "100%",
    scrollBehavior: "smooth",
  },
  playlistTitleDiv: {
    width: "100%",
  },
  navigationArrows: {
    color: "#FF1654",
    "&:hover": {
      cursor: "pointer",
    },
  },
  divider: {
    backgroundColor: "#111",
    height: 1,
  },
  topMusicTitle: {
    fontFamily: "Century Gothic",
    fontSize: 22,
    fontWeight: "bold",
    color: "#111",
    letterSpacing: -1,
  },
});

const Profile = () => {
  const [topTrack, setTopTrack] = useState(null);
  const [topArtist, setTopArtist] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const profileStyles = useProfileStyles();
  const classes = useClasses();
  const history = useHistory();


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
      url:
        "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=1",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        if (!data) {
          alert("fail");
          return;
        }
        if (data.items[0]) {
          setTopArtist(data.items[0]);
        }
      },
    });
    $.ajax({
      url:
        "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=1",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        if (!data) {
          alert("fail");
          return;
        }
        console.log(data);
        if (data.items[0]) {
          setTopTrack(data.items[0]);
        }
      },
    }).catch(function (error) {
      if (error.status == 401) {
        console.log("need token");
        $.ajax({
          url:
            "https://accounts.spotify.com/api/token?grant_type=authorization_code&code=${token}",
          type: "POST",
          beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success: (data) => {
            
          },
        });
      }
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
              <Avatar
                onClick={() => {
                  history.push("/PROFILE");
                }}
                className={classes.toolbarAvatar}
                alt="User Profile Image"
                src={user.imageURL}
              />
              <DropdownMenu />
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
                <Box
                  backgroundColor="secondary"
                  className={profileStyles.topMusicTitle}
                  noWrap
                >
                  <Typography className={profileStyles.ppName} noWrap>
                    {user.username}
                  </Typography>
                </Box>
                <div className={profileStyles.profileBanner}>
                  <Grid container>
                    <Grid item xs={4} md={4} lg={4}>
                      <div className={profileStyles.artistPanel}>
                        {topArtist ? (
                          <Artist artist={topArtist} />
                        ) : (
                          <div className={profileStyles.topMusicEmptyImage}>
                            <Typography
                              noWrap
                              className={profileStyles.emptyTopMusicText}
                            >
                              Empty
                            </Typography>
                          </div>
                        )}
                        <Typography
                          noWrap
                          className={profileStyles.topMusicTitle}
                        >
                          Top Artist
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4}>
                      <div className={profileStyles.ppPanel}>
                        <Avatar
                          src={user.imageURL}
                          className={profileStyles.ppImg}
                        />
                        <div className={profileStyles.bioDiv}>
                          <div>
                            <Typography
                              noWrap
                              className={profileStyles.bioText}
                            >
                              Joined: Oct 2018
                            </Typography>
                          </div>
                          <div>
                            <Typography
                              noWrap
                              className={profileStyles.bioText}
                            >
                              Likes: 83
                            </Typography>
                          </div>
                          <div>
                            <Typography
                              noWrap
                              className={profileStyles.bioText}
                            >
                              Music Score: 50
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4}>
                      <div className={profileStyles.trackPanel}>
                        {topTrack ? (
                          <Song song={topTrack} />
                        ) : (
                          <div className={profileStyles.topMusicEmptyImage}>
                            <Typography
                              noWrap
                              className={profileStyles.emptyTopMusicText}
                            >
                              Empty
                            </Typography>
                          </div>
                        )}
                        <Typography
                          noWrap
                          className={profileStyles.topMusicTitle}
                        >
                          Top Track
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <AppBar
                  className={profileStyles.profileAppbar}
                  position="static"
                >
                  <Toolbar className={profileStyles.profileToolbar}>
                    <div className={profileStyles.tabBar}>
                      <Tabs value={value} onChange={handleChange}>
                        <Tab
                          className={profileStyles.profileButton}
                          label={
                            <Typography className={profileStyles.title}>
                              FEED
                            </Typography>
                          }
                          {...a11yProps(0)}
                        />
                        <Tab
                          className={profileStyles.profileButton}
                          label={
                            <Typography className={profileStyles.title}>
                              PLAYLISTS
                            </Typography>
                          }
                          {...a11yProps(1)}
                        />
                        <Tab
                          className={profileStyles.profileButton}
                          label={
                            <Typography className={profileStyles.title}>
                              FRIENDS
                            </Typography>
                          }
                          {...a11yProps(2)}
                        />
                        <Tab
                          className={profileStyles.profileButton}
                          label={
                            <Typography className={profileStyles.title}>
                              LIKES
                            </Typography>
                          }
                          {...a11yProps(3)}
                        />
                      </Tabs>
                    </div>
                  </Toolbar>
                </AppBar>
                <TabPanel value={value} index={0}>
                  <Typography className={profileStyles.tabTitle}>
                    Feed
                  </Typography>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Typography className={profileStyles.tabTitle}>
                    Playlists
                  </Typography>
                  <div className={profileStyles.playlistDiv}>
                    {userPlaylists[0] ? (
                      <>
                        <Divider />
                        <List
                          className={`${profileStyles.playlistList} playlist-container`}
                        >
                          {userPlaylists.map((playlist) => (
                            <>
                              <ListItem
                                className={`${profileStyles.playlistObject} playlist-object`}
                              >
                                <Playlist item={playlist} />
                              </ListItem>
                            </>
                          ))}
                        </List>
                      </>
                    ) : (
                      <div>
                        <Typography className={profileStyles.profileTitles}>
                          Empty
                        </Typography>
                        <Divider />
                      </div>
                    )}
                  </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Typography className={profileStyles.tabTitle}>
                    Friends
                  </Typography>
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <Typography className={profileStyles.tabTitle}>
                    Likes
                  </Typography>
                </TabPanel>
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

export default Profile;

{
  /* <div className={profileStyles.playlistDiv}>
                    {userPlaylists ? (
                      <>
                        <ChevronLeftIcon
                          onClick={() => scroll(-1)}
                          className={profileStyles.navigationArrows}
                          style={styles.largeIcon}
                        />
                        <List
                          className={`${profileStyles.playlistList} playlist-container`}
                        >
                          {userPlaylists.map((playlist) => (
                            <ListItem
                              className={`${profileStyles.playlistObject} playlist-object`}
                            >
                              <Playlist item={playlist} />
                            </ListItem>
                          ))}
                        </List>
                        <ChevronRightIcon
                          onClick={() => scroll(1)}
                          className={profileStyles.navigationArrows}
                          style={styles.largeIcon}
                        />
                      </>
                    ) : (
                      <div>
                        <Typography className={profileStyles.profileTitles}>
                          No Playlists
                        </Typography>
                        <Divider classes={{ root: profileStyles.divider }} />
                      </div>
                    )}
                  </div> 
                
                const scroll = (direction) => {
    let far = $(".playlist-object").width() * 2.5 * direction;
    let pos = $(".playlist-container").scrollLeft() + far;
    $(".playlist-container").animate({ scrollLeft: pos }, 55);
  };*/
}
