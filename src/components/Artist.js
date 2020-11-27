import React from "react";
import styles from "../tweaks/Styles";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  artistObjectDiv: {
    backgroundColor: "#1db954",
    color: "#111",
    width: '60%',
    borderStyle: "solid",
    borderWidth: 1,
    margin: '0 auto',
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

const Artist = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.artistObjectDiv}>
      {props.artist.images[0].url ? (
      <div className={classes.artistImage}>
        <img src={props.artist.images[0].url} style={styles.musicIcon}/>
      </div>
      ) : null}
      {props.artist.name ? (
      <Typography noWrap className={classes.topMusicTitles}>
        {props.artist.name}
      </Typography>
      ) : null}
      {props.artist.genres[0] ? (
          <Typography noWrap className={classes.topMusicTitlesSmall}>
            {props.artist.genres[0]}
          </Typography>
      ) : null}
    </div>
  );
};

export default Artist;
