import React from "react";
import styles from "../tweaks/Styles";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  songDiv: {
    paddingTop: 20,
    float: "left",
  },
  songImage: {
    paddingTop: 20,
    paddingRight: 20,
    float: "right",
    paddingLeft: 40,
  },
  songName: {
    paddingTop: 100,
  },
  atistName: {
    float: "left",
  },
  songText: {
    flexGrow: 1,
    fontFamily: "Century Gothic",
    letterSpacing: -1,
    fontSize: 35,
    fontWeight: "bold",
    color: "#ffffff",
    marginLeft: 20,
  },
  artistText: {
    flexGrow: 1,
    fontFamily: "Century Gothic",
    fontSize: 18,
    color: "#ffffff",
    marginLeft: 20,
  },
});

const Song = (props) => {
  const classes = useStyles();
  console.log(props.song.name);
  console.log(props.song.artists[0].name);
  console.log(props.song.album.images[0].url);
  return (
    <>
      <div className={classes.songImage}>
        <img src={props.song.album.images[0].url} style={styles.artistIcon} />
      </div>
      <div className={classes.songDiv}>
        <div className={classes.songName}>
          <Typography className={classes.songText}>
            {props.song.name}
          </Typography>
        </div>
        <div className={classes.artistName}>
          <Typography className={classes.artistText}>
            {props.song.artists[0].name}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default Song;
