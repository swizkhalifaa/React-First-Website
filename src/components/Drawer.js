import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import fire from "../services/Fire";
import { useHistory } from "react-router-dom";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import theme from "../tweaks/Theme";
import Hidden from '@material-ui/core/Hidden';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles({
    list:{
      backgroundColor: '#54428E',
      [theme.breakpoints.down('sm')]: {
        
      },
      [theme.breakpoints.up('md')]: {
        float:'left',
      },
      [theme.breakpoints.up('lg')]: {
        float: 'left',
      },
    },
    listItem: {      
      paddingTop: '4%',
      paddingBottom: '4%',
        [theme.breakpoints.down('sm')]: {
            height: 50,
            width: 50
          },
    },
    drawerText: {
      color: "#FF1654",
      flexGrow: 1,
      fontFamily: "Century Gothic",
      fontSize: 20,
      fontWeight: "bold",
      whiteSpace: 'nowrap'
    },
    drawerIcon: {
      color: "#FF1654",
    },
  });

export default function DrawerLeft() {
    const classes = useStyles();
    const history = useHistory();
    return (
    <>
        <List className={classes.list}>
          {["HOME", "PROFILE", "PLAYLIST HUB", "NOTIFICATIONS", "MESSAGES"].map((text, index) => (
            <ListItem
              className={classes.listItem}
              button
              key={text}
              onClick={() => {
                if (index === 0) {
                  history.push("/");
                } else {
                  history.push("/" + text);
                }
              }}
            >
              <ListItemIcon className={classes.drawerIcon}>
                {index === 0 && <HomeIcon />}
                {index === 1 && <AccountCircleIcon />}
                {index === 2 && <QueueMusicIcon />}
                {index === 3 && <NotificationsIcon />}
                {index === 4 && <EmailIcon />}
              </ListItemIcon>
              <Hidden smDown>
              <ListItemText
                primary={
                  <Typography className={classes.drawerText}>{text}</Typography>
                }
              />
              </Hidden>
            </ListItem>
          ))}
      </List>
    </>
    )}