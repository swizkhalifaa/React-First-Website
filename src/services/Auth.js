import React, { useEffect, useState } from "react";
import app from "./Fire";
import useClasses from "../tweaks/Classes";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "../tweaks/Styles";
import Typography from "@material-ui/core/Typography";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const classes = useClasses();

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    });
  }, []);

  if(pending){
    return <>
    <div className={classes.loadingWrapper}>
      <CircularProgress pb={8} color="secondary" style={styles.largeIcon} />
      <Typography noWrap className={classes.loadingTitle}>
        Loading...
      </Typography>
    </div>
  </>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};