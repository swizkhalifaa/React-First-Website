import React from "react";
import styles from "../tweaks/Styles"
import theme from "../tweaks/Theme";

import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  playlistBox: {
    backgroundColor: '#ffffff',
    height: 220,
    width: 220,
  },
  playlistPic: {
    paddingTop: 15,
    textAlign: "center"
  },
  playlistNameText: {
    textAlign: "center",
    flexGrow: 1,
    fontFamily: "Century Gothic",
    letterSpacing: -1,
    fontSize: 18,
    fontWeight: "bold",
  },
  playlistAuthorText: {
    textAlign: "center",
    flexGrow: 1,
    fontFamily: "Century Gothic",
    letterSpacing: -1,
    fontSize: 14,
  },
  });

const Playlist = (props) => {
  const classes = useStyles();
  const backgroundStyles = {
    backgroundImage: `url(${props.item.images[0].url})`,
  };

  return (
    <ThemeProvider theme={theme}>
    <Box className={classes.playlistBox} borderRadius='10%'>
      <div className={classes.playlistPic}>
        <img src={props.item.images[0].url} style={styles.largeIcon}/>
      </div>
      <div>
        <div className={classes.playlistNameText}>{props.item.name}</div>
        <div className={classes.playlistAuthorText}>by {props.item.owner.display_name}</div>
      </div>
      <div style={backgroundStyles}/>{" "}
    </Box>
    </ThemeProvider>
  );
};
export default Playlist;
