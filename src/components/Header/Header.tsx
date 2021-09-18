import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { store } from "../../store/store";
import { logout } from "../../store/authReducer";
import { ThunkProps } from "../ThunkTypes";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./style.css";

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
      <Container>
        <Row>
          <Col className={"navbar-panel"}>
            <NavigationBar />
          </Col>
          <Col>
            {!this.props.isAuthenticated && (
              <Container>
                <Row>
                  <Col />
                  <Col>
                    <Button variant="outline-info" onClick={this.login}>
                      Войти
                    </Button>
                  </Col>
                </Row>
              </Container>
            )}
            {this.props.isAuthenticated && (
              <Container>
                <Row>
                  <Col className={"user-login"}>
                    <p>{this.props.userName}</p>
                  </Col>
                  <Col>
                    <Button variant="outline-info" onClick={this.login}>
                      Выйти
                    </Button>
                  </Col>
                </Row>
              </Container>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
