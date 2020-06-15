import React from "react";
import fire from "../services/Fire";
import { useHistory } from "react-router-dom";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../tweaks/Theme";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  paper: {
    backgroundColor: "#1db954",
  },
  drawerText: {
    flexGrow: 1,
    fontFamily: "Century Gothic",
    fontSize: 20,
    fontWeight: "bold",
  },
  drawerIcon: {
    color: "#111",
  },
});

export default function TemporaryDrawer() {
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ThemeProvider theme={theme}>
          {["HOME", "PROFILE", "SETTINGS"].map((text, index) => (
            <ListItem
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
                {index === 2 && <SettingsIcon />}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography className={classes.drawerText}>{text}</Typography>
                }
              />
            </ListItem>
          ))}
        </ThemeProvider>
      </List>
      <Divider />
      <List>
        <ThemeProvider theme={theme}>
          {["SIGN OUT"].map((text, index) => (
            <ListItem button onClick={() => fire.auth().signOut()}>
              <ListItemIcon className={classes.drawerIcon}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography className={classes.drawerText}>{text}</Typography>
                }
              />
            </ListItem>
          ))}
        </ThemeProvider>
      </List>
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon />
          </Button>
          <Drawer
            classes={{ paper: classes.paper }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
