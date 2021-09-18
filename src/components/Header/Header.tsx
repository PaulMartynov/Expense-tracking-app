import React from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { store } from "../../store/store";
import { logout } from "../../store/authReducer";
import { ThunkProps } from "../ThunkTypes";

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
    if (this.props.isAuthenticated) {
      return (
        <div>
          <p>
            {this.props.userName}{" "}
            <Button variant="outline-info" onClick={this.login}>
              Выйти
            </Button>
          </p>
        </div>
      );
    }
    return (
      <div>
        <Button variant="outline-info" onClick={this.login}>
          Войти
        </Button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
