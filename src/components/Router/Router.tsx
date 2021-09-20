import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "@reduxjs/toolkit";
import { store } from "../../store/store";
import Login from "../Login/Login";
import MainContent from "../MainContent/MainContent";
import loginRequired from "./LoginRequire";
import About from "../About/About";
import Finance from "../Finance/Finance";
import { onAuthChangeThunk } from "../../store/authReducer";
import Categories from "../Categories/Categories";

const mapStateToProps = (state: ReturnType<typeof store.getState>) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators(
    {
      onAuthChange: onAuthChangeThunk,
    },
    dispatch
  );
};

export type DispatchPropsType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class Routes extends React.Component<DispatchPropsType, never> {
  componentDidMount() {
    this.props.onAuthChange();
  }

  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/about" component={About} />
        <Route
          exact
          path="/finance"
          component={loginRequired(Finance, this.props.isAuthenticated)}
        />
        <Route
          exact
          path="/category"
          component={loginRequired(Categories, this.props.isAuthenticated)}
        />
        <Route
          exact
          path="/"
          component={loginRequired(MainContent, this.props.isAuthenticated)}
        />
      </Switch>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
