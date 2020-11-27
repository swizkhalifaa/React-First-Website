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

  ////////////////////////////////// Grid stuff

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
  ////////////////// login stuff
  registerWrapper: {
    height: '100%',
    left: 0,
    right: 0,
    display: 'flex',
    position: 'fixed',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#54428E',
  },
  loginWrapper: {
    height: '100%',
    left: 0,
    right: 0,
    display: 'flex',
    position: 'fixed',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF1654',
  },
  formWrapper: {
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 40px',
    borderRadius: '10px',
    boxShadow: '0px 10px 50px #555',
    backgroundColor: '#ffffff',
  },
  
  form: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  
  label: {
    fontSize: 16,
    marginBottom: '0.25em',
    color: '#222',
    fontFamily: "Century Gothic",
    fontWeight: 'lighter',
  },
  
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: '1em',
    display: 'relative',
  },
  
  emailPassword: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
    width: '100%'
  },
  
  input: {
    height: 22
  },

  createAccount: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  createAccountButton: {
    backgroundColor: '#1db954',
    textTransform: 'none',
    color: '#fff',
    borderRadius: 10,
    border: '2px solid #fff',
    width: '100%',
    marginTop: '1em',
    padding: '8px 0px',
    marginBottom: '0.25em',
    "&:hover": {  
      border: '2px solid #1db954',
      cursor: 'pointer',
    },
  },

  createAccountButtonText: {
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom: '0.25em',
    color: '#FFFFFF',
    fontFamily: "Century Gothic",
  },
  
  createAccountA: {
    color: '#111',
    fontWeight: 'lighter',
    fontWeight: 900,
    letterSpacing: '-0.5px',
    fontSize: '13px',
  },

  titleText: {
    fontWeight: 'bold',
    fontSize: 75,
    marginBottom: '0.25em',
    color: '#FFFFFF',
    fontFamily: "Century Gothic",
  },
  titleDiv: {
    paddingBottom: '5%'
  }
});

export default useClasses;
