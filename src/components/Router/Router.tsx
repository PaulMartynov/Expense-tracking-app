import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { store } from "../../store/store";
import Login from "../Login/Login";
import MainContent from "../MainContent/MainContent";
import loginRequired from "./LoginRequire";
import About from "../About/About";

const mapStateToProps = (state: ReturnType<typeof store.getState>) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const Routes = (
  props: ReturnType<typeof mapStateToProps>
): React.ReactElement => (
  <Switch>
    <Switch>
      <Route
        exact
        path="/"
        component={loginRequired(MainContent, props.isAuthenticated)}
      />
      <Route path="/login" component={Login} />
      <Route path="/about" component={About} />
    </Switch>
  </Switch>
);

export default connect(mapStateToProps)(Routes);
