import React, { useState, useEffect } from "react";
import "./App.css";

import { Router } from "react-router-dom";
import Routes from "./routes";
import history from "./services/history";

import fire from "./config/Fire";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setUser(user);
        localStorage.setItem("user", user.uid);
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });
  }, []);

  return (
    <Router history={history}>
      <Routes user={user} />
    </Router>
  );
}

export default App;
