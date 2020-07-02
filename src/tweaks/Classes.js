import { makeStyles } from "@material-ui/core/styles";
import theme from "../tweaks/Theme";

const useClasses = makeStyles({
  root: {
    flexGrow: 1,
  },
  mainToolbar: {
    height: 64,
  },
  title: {
    fontFamily: "Century Gothic",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 0,
  },

  //////////////////////////////////Grid stuff

  mainGrid: {
    top: 64,
    position: "absolute",
  },

  middleWrapper: {
    textAlignLast: "center",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 55,
    },
    
  },
  leftWrapper: {
    backgroundColor: "#54428E",
    height: "100%",
    position: 'fixed',
    [theme.breakpoints.down("sm")]: {
      width: 55,
    },
    [theme.breakpoints.up("md")]: {
      width: "25%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "25%",
    },
  },
  rightWrapper: {
    [theme.breakpoints.up("lg")]: {
      backgroundColor: "#54428E",
      position: 'fixed',
      height: "100%",
      width: "25%",
      
    },
  },
  ////////////////////////////////////////
  loadingWrapper: {
    width: "100%",
    height: "100vh",
    display: "flex",
    backgroundColor: "#54428E",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  searchBar: {
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    width: 300,
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      width: 200,
    },
  },
  toolbarAvatar: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  toolbarArrow: {
    color: "#76E5FC",
    "&:hover": {
      cursor: "pointer",
    },
    marginLeft: 1,
  },
  searchField: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  profileTitleName: {
    textAlignLast: "center",
    fontFamily: "Century Gothic",
    letterSpacing: -1,
    fontSize: 35,
    fontWeight: "bold",
    letterSpacing: -1,
  },
  bioDiv: {
    height: "25%",
    width: "100%",
    marginTop: "3%",
    paddingLeft: "2%",
    margin: "0 auto",
    textAlignLast: "center",
  },
  bioText: {
    fontFamily: "Century Gothic",
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
    letterSpacing: -1,
  },
  topMusicDiv: {
    paddingTop: "5%",
    display: "flex",
    placeContent: "center",
  },
  profileBanner: {},
  ppImg: {
    marginTop: "2%",
    color: "#FF1654",
    margin: "0 auto",
    width: "58%",
    height: "50%",
    borderStyle: "solid",
    borderWidth: 8,
  },
  ppName: {
    fontFamily: "Century Gothic",
    fontSize: 35,
    fontWeight: "bold",
    color: "#111",
    letterSpacing: -1,
  },
  ppDiv: {
    height: 100,
  },
  ppPanel: {
    paddingTop: "2%",
    height: "100%",
    width: "100%",
    textAlignLast: "center",
  },
  trackPanel: {
    textAlignLast: "center",
    color: "#111",
    width: "100%",
  },
  artistPanel: {
    textAlignLast: "center",
    color: "#111",
    width: "100%",
  },
  topMusicEmptyImage: {
    borderStyle: "solid",
    borderWidth: 1,
    height: 160,
    backgroundColor: "#ffffff",
    marginRight: "10%",
    marginLeft: "10%",
    marginTop: "10%",
  },
  profileTitles: {
    fontFamily: "Century Gothic",
    fontSize: 30,
    fontWeight: "bold",
    color: "#111",
    letterSpacing: -1,
  },
  profileAppbar: {
    marginTop: "5%",
  },
  profileToolbar: {
    width: "100%",
    paddingRight: 0,
    paddingLeft: 0,
    backgroundColor: "#FF1654",
  },
  profileButton: {
    width: "25%",
    minHeight: 64,
  },
  tabBar: {
    width: "100%",
  },
  emptyTopMusicText: {
    flexGrow: 1,
    fontFamily: "Century Gothic",
    fontSize: 25,
    color: "#111",
    paddingTop: "20%",
    letterSpacing: -1,
  },
  playlistList: {
    width: "30%",
    margin: "0 auto",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "row",
    scrollBehavior: "smooth",
  },
  playlistTitleDiv: {
    width: "30%",
    margin: "0 auto",
  },
  navigationArrows: {
    color: "#111",
    "&:hover": {
      color: "#FF1654",
      cursor: "pointer",
    },
  },
  playlistDiv: {
    color: "#FF1654",
    width: "50%",
    display: "flex",
    placeContent: "center",
    margin: "0 auto",
  },
  divider: {
    backgroundColor: "#111",
    height: 1,
    margin: "0 auto",
    width: "100%",
  },
  topMusicTitle: {
    fontFamily: "Century Gothic",
    fontSize: 22,
    fontWeight: "bold",
    color: "#111",
    letterSpacing: -1,
  },
  loadingTitle: {
    fontFamily: "Century Gothic",
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: -1,
    margin: "3%",
  },
});

export default useClasses;
