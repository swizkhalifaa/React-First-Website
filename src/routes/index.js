import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import Register from "../pages/register";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Register} />
      <Route path="/login" component={Login} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route component={Register} />
    </Switch>
  );
}
