import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { store } from "../../store/store";
import {
  loginByEmailAndPassword,
  registerByEmailAndPassword,
} from "../../store/authReducer";

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReturnType,
  unknown,
  Action<string>
>;

type ThunkProps<T extends { [K in keyof T]: (...a: any[]) => AppThunk }> = {
  [K in keyof T]: (...args: Parameters<T[K]>) => void;
};

const dispatchThunkToProps = {
  loginByEmailAndPassword,
  registerByEmailAndPassword,
};

const stateToProps = (state: ReturnType<typeof store.getState>) => ({
  auth: state.auth,
});

export type DispatchPropsType = ReturnType<typeof stateToProps> &
  ThunkProps<typeof dispatchThunkToProps>;

class Login extends React.Component<
  DispatchPropsType,
  {
    email: string;
    password: string;
  }
> {
  constructor(props: Readonly<DispatchPropsType> | DispatchPropsType) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  isValid = (): boolean => {
    return (
      this.state.email !== null &&
      this.state.password !== null &&
      this.state.email.length > 0 &&
      this.state.password.length > 0
    );
  };

  register = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (!this.isValid()) {
      return;
    }
    this.props.registerByEmailAndPassword({
      email: this.state.email,
      password: this.state.password,
    });
  };

  login = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!this.isValid()) {
      return;
    }
    this.props.loginByEmailAndPassword({
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
      <form onSubmit={this.login}>
        <h3>Вход</h3>

        <div className="form-input-div">
          <label>Логин</label>
          <input
            type="email"
            value={this.state.email}
            className="form-input"
            placeholder="Введите логин"
            required={true}
            onChange={this.loginInput}
          />
        </div>

        <div className="form-input-div">
          <label>Пароль</label>
          <input
            type="password"
            value={this.state.password}
            className="form-input"
            required={true}
            placeholder="Введите пароль"
            onChange={this.passwordInput}
          />
        </div>
        <p />
        <div>
          <button name="login" type="submit">
            Вход
          </button>
          <button name="register" type="button" onClick={this.register}>
            Регистрация
          </button>
        </div>
      </form>
    );
  }
}

export default connect(stateToProps, {
  ...dispatchThunkToProps,
})(Login);
