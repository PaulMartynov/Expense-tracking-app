import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { store } from "../store/store";
import Login from "./LoginComponent/Login";

const stateToProps = (state: ReturnType<typeof store.getState>) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const Routes = (): React.ReactElement => (
  <Switch>
    <Switch>
      <Route exact path="/" component={Login} />
    </Switch>
  </Switch>
);

export default connect(stateToProps)(Routes);
