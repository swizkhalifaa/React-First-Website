import React from "react";
import styles from "../tweaks/Styles"
import theme from "../tweaks/Theme";

import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  playlistBox: {
    backgroundColor: '#ffffff',
    height: 218,
    width: 180,
    borderStyle: "solid",
    borderWidth: 6,
    borderRadius: 15,
    color: "#FF1654",
    '&:hover': {
      background: "#A3E7FC",
      cursor: 'pointer'
    },
  },
  playlistPic: {
    paddingTop: 15,
    textAlign: "center"
  },
  playlistNameText: {
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    flexGrow: 1,
    fontFamily: "Century Gothic",
    letterSpacing: -1,
    fontSize: 18,
    fontWeight: "bold",
    color: '#111'
  },
  playlistAuthorText: {
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    flexGrow: 1,
    fontFamily: "Century Gothic",
    letterSpacing: -1,
    fontSize: 14,
    color: '#111'
  },
  });

const Playlist = (props) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
    <Box className={classes.playlistBox} borderRadius='10%'>
      <div className={classes.playlistPic}>
        <img src={props.item.images[0].url} style={styles.musicItem} />
      </div>
      <div>
        <Typography noWrap className={classes.playlistNameText}>{props.item.name}</Typography>
        <Typography noWrap className={classes.playlistAuthorText}>by {props.item.owner.display_name}</Typography>
      </div>
    </Box>
    </ThemeProvider>
  );
};
export default Playlist;
