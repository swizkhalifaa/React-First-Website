import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { AuthProvider } from "./services/Auth";
import PrivateRoute from "./services/PrivateRoute";

const App = () => {

  return (
    <AuthProvider>
      <Router>
        <>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </>
      </Router>
    </AuthProvider>
  );
};

export default App;
