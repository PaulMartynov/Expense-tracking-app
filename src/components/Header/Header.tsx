import React from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { logout } from "../../store/authReducer";
import { ReturnState, ThunkProps } from "../ThunkTypes";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./Header.css";

const mapStateToProps = (state: ReturnState) => ({
  userName: state.auth.username,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  logout,
};

export type DispatchPropsType = ReturnType<typeof mapStateToProps> &
  ThunkProps<typeof mapDispatchToProps>;

class Header extends React.Component<RouteComponentProps & DispatchPropsType> {
  login = () => {
    if (this.props.isAuthenticated) {
      this.props.logout({});
    }
    this.props.history.push("/login");
  };

  render(): React.ReactElement {
    return (
      <div>
        <div className={"navbar-panel"} data-testid={"nav-panel"}>
          <NavigationBar isAuthenticated={this.props.isAuthenticated} />
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
