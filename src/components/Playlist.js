import React from "react";
import styles from "../tweaks/Styles"
import theme from "../tweaks/Theme";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

const useStyles = makeStyles({
  accordion:{
    width: '100%'
  },
  accordionDescription:{
    justifyContent: 'center'
  },
  playlistOuterBox:{
     height: '100%',
     width: '100%',
     display: 'flex'
  },
  likeIcon: {
    blockSize: 'auto',
    margin: '0 auto',
    width: 120,
    color: '#76E5FC',
    "&:hover": {  
      color: '#FF1654',
      cursor: 'pointer',
    },
  },
  optionsIcon: {
    margin: '0 auto',
    blockSize: 'auto',

    width: 80,
    color: '#FF1654',
    "&:hover": {  
      cursor: 'pointer',
    },
  },
  playlistBox: {
    margin: '0 auto',
    backgroundColor: '#ffffff',
    height: 192,
    width: 160,
    borderStyle: "solid",
    borderRadius: 15,
    borderWidth: 1,
    color: "#111",
    '&:hover': {
      background: "#76E5FC",
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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  });

const Playlist = (props) => {
  const classes = useStyles();
  return (
    <Accordion className={classes.accordion}>
        <div className={classes.playlistOuterBox}>
          <FavoriteIcon className={classes.likeIcon}/>
          <AccordionSummary>
          <Box className={classes.playlistBox} borderRadius='10%'>
          <div className={classes.playlistPic}>
            <img src={props.item.images[0].url} style={styles.musicItem} />
          </div>
          <div>
            <Typography noWrap className={classes.playlistNameText}>{props.item.name}</Typography>
            <Typography noWrap className={classes.playlistAuthorText}>by {props.item.owner.display_name}</Typography>
          </div>
          </Box>
        </AccordionSummary>
        <MoreHorizIcon className={classes.optionsIcon}/>
          </div>
        <AccordionDetails className={classes.accordionDescription}>
          {props.item.description ? (
          <>
          {props.item.description}
          </>
          ) : (
              <>
              No description
              </>
          )
        }
        </AccordionDetails> 
        </Accordion>
  );
};
export default Playlist;
