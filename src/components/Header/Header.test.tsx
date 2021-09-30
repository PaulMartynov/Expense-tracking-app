import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Middleware } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

const middlewares: Middleware[] = [];
const mockStore = configureStore(middlewares);

describe("Header render test", () => {
  test("Header  render in page", () => {
    const initialState = {
      auth: {
        userName: "userName",
        isAuthenticated: false,
      },
    };
    const store = mockStore(initialState);
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId("auth-btn")).toBeInTheDocument();
    expect(screen.getByTestId("nav-panel")).toBeInTheDocument();
  });
});
