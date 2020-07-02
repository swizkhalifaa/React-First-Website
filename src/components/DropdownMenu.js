import React from "react";
import fire from "../services/Fire";
import styles from "../tweaks/Styles";

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from '@material-ui/core/MenuList';
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SettingsIcon from '@material-ui/icons/Settings';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

const useStyles = makeStyles({
    toolbarArrow: {
        color: "#76E5FC",
        "&:hover": {
        cursor: "pointer",
        },
        marginLeft: 1
    },
    menuDrop: {
      marginTop: 30,
      
    },
    menuItem: {
      placeContent: 'center',
      width: 180
    },
    dropText: {
      paddingLeft: 8,
      fontFamily: "Century Gothic",
      fontSize: 22,
      color: "#111",
      letterSpacing: -1,
    }
});

export default function DropdownMenu() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <KeyboardArrowDownIcon
        className={classes.toolbarArrow}
        style={styles.smallIcon}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      />
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={handleClose} className={classes.menuItem} onClick={handleClose}>
                    <SettingsIcon />
                    <Typography className={classes.dropText}>Settings</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleClose} className={classes.menuItem} onClick={() => fire.auth().signOut()}>
                    <MeetingRoomIcon />
                  <Typography className={classes.dropText}>Sign Out</Typography>
                  </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </>
  );
}
