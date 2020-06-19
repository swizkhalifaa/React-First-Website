import React from "react";
import styles from "../tweaks/Styles";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  artistDiv: {
    paddingTop: 20,
    float: "right",
  },
  artistImage: {
    paddingTop: 20,
    paddingLeft: 20,
    float: "left",
    paddingRight: 40,
  },
  artistName: {
    paddingTop: 100,
  },
  artistGenre: {
    float: "right",
  },
  nameText: {
    flexGrow: 1,
    fontFamily: "Century Gothic",
    letterSpacing: -1,
    fontSize: 35,
    fontWeight: "bold",
    color: "#ffffff",
    marginRight: 20,
  },
  genreText: {
    flexGrow: 1,
    fontFamily: "Century Gothic",
    fontSize: 18,
    color: "#ffffff",
    marginRight: 20,
  },
});

const Artist = (props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.artistImage}>
        <img src={props.artist.images[0].url} style={styles.artistIcon} />
      </div>
      <div className={classes.artistDiv}>
        <div className={classes.artistName}>
          <Typography className={classes.nameText}>
            {props.artist.name}
          </Typography>
        </div>
        {props.artist.genres[0] ? (
          <div className={classes.artistGenre}>
            <Typography className={classes.genreText}>
              {props.artist.genres[0]}
            </Typography>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Artist;
