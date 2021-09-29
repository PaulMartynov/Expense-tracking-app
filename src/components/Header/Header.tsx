import React from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { store } from "../../store/store";
import { logout } from "../../store/authReducer";
import { ThunkProps } from "../ThunkTypes";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./Header.css";

const mapStateToProps = (state: ReturnType<typeof store.getState>) => ({
  userName: state.auth.username,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  logout,
};

export type DispatchPropsType = ReturnType<typeof mapStateToProps> &
  ThunkProps<typeof mapDispatchToProps>;

class Header extends React.Component<
  RouteComponentProps & DispatchPropsType,
  never
> {
  login = () => {
    if (this.props.isAuthenticated) {
      this.props.logout({});
    }
    this.props.history.push("/login");
  };

  render(): React.ReactElement {
    return (
      <div>
        <div className={"navbar-panel"}>
          <NavigationBar />
        </div>
        <div className={"user-login"} data-testid={"auth-btn"}>
          {this.props.isAuthenticated ? (
            <label>{this.props.userName}</label>
          ) : null}
          <Button variant="outline-primary" onClick={this.login}>
            {this.props.isAuthenticated ? "Выход" : "Вход"}
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
