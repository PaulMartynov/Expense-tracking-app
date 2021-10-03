import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { registerByEmailAndPassword } from "../../store/authReducer";
import { ReturnState, ThunkProps } from "../ThunkTypes";
import "./Login.css";

const mapDispatchToProps = {
  registerByEmailAndPassword,
};

const mapStateToProps = (state: ReturnState) => ({
  auth: state.auth,
});

export type DispatchPropsType = ReturnType<typeof mapStateToProps> &
  ThunkProps<typeof mapDispatchToProps>;

class Login extends React.Component<
  DispatchPropsType,
  {
    email: string;
    password: string;
    hasError: boolean;
    error: string;
  }
> {
  state = {
    email: "",
    password: "",
    hasError: false,
    error: "",
  };

  setError(): void {
    switch (this.props.auth.error) {
      case "email-already-in-use":
        this.setState({
          error: "Пользователь с таким email уже существует.",
          hasError: this.props.auth.error.length > 0,
        });
        break;
      default:
        this.setState({
          error: this.props.auth.error,
          hasError: this.props.auth.error.length > 0,
        });
    }
  }

  componentDidUpdate(prevProps: Readonly<DispatchPropsType>) {
    if (prevProps.auth.error !== this.props.auth.error) {
      this.setError();
    }
  }

  isValid = (): boolean => {
    return (
      this.state.email !== null &&
      this.state.password !== null &&
      this.state.email.length > 0 &&
      this.state.password.length > 0
    );
  };

  register = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!this.isValid()) {
      return;
    }
    this.props.registerByEmailAndPassword({
      email: this.state.email,
      password: this.state.password,
    });
  };

  loginInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      email: event.target.value,
    });
  };

  passwordInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      password: event.target.value,
    });
  };

  render(): React.ReactElement {
    if (this.props.auth.isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <Container>
        <Row>
          <Col className={"auth-container"}>
            <div className="card login-card">
              <article className="card-body">
                <h4 className="card-title mb-4 mt-1">Регистрация</h4>
                {this.state.hasError && (
                  <p className="text-danger">{this.state.error}</p>
                )}
                <form onSubmit={this.register}>
                  <div className={`form-group`}>
                    <label htmlFor="InputEmail1" className="form-label mt-4">
                      Введите адрес вашей электронной почты:
                    </label>
                    <input
                      type="email"
                      id={"InputEmail1"}
                      className={`form-control`}
                      aria-describedby="emailHelp"
                      placeholder="Email"
                      required={true}
                      onChange={this.loginInput}
                    />
                  </div>
                  <div className={`form-group`}>
                    <label htmlFor="InputPasswd1" className="form-label mt-4">
                      Придумайте пароль:
                    </label>
                    <input
                      type="password"
                      id={"InputPasswd1"}
                      className={`form-control`}
                      placeholder="Password"
                      minLength={6}
                      onChange={this.passwordInput}
                      required={true}
                    />
                    <small id="registerHelp" className="form-text text-muted">
                      Минимальная длинная пароля - 6 символов
                    </small>
                  </div>
                  <div className="form-group submit-btn">
                    <button type="submit" className="btn btn-primary">
                      Зарегистрироваться
                    </button>
                    <a
                      href="#/login"
                      className="register-link btn btn-outline-primary"
                    >
                      Вход
                    </a>
                  </div>
                </form>
              </article>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
