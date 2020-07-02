import React from "react";
import styles from "../tweaks/Styles";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  artistObjectDiv: {
    backgroundColor: "#1db954",
    color: "#111",
    width: '60%',
    height: '60%',
    borderStyle: "solid",
    borderWidth: 1,
    margin: '0 auto'
  },
  profileTitles: {
    fontFamily: "Century Gothic",
    fontSize: 30,
    fontWeight: "bold",
    color: "#111",
    letterSpacing: -1,
  },
  topMusicTitles: {
    fontFamily: "Century Gothic",
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: -1,
    textAlignLast: "center",
  },
  topMusicTitlesSmall: {
    fontFamily: "Century Gothic",
    fontSize: 16,
    color: "#ffffff",
  },
});

const Song = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.artistObjectDiv}>
      
      {props.song.album.images[0].url ? (
      <div className={classes.artistImage}>
        <img src={props.song.album.images[0].url} style={styles.musicIcon}/>
      </div>
      ) : null}
      {props.song.name ? (
      <Typography noWrap className={classes.topMusicTitles}>
        {props.song.name}
      </Typography>
      ) : null}
      {props.song.artists[0].name ? (
          <Typography noWrap className={classes.topMusicTitlesSmall}>
            {props.song.artists[0].name}
          </Typography>
      ) : null}
    </div>
  );
};

export default Song;

