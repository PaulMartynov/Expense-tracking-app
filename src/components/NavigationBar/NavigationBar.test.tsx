import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HashRouter } from "react-router-dom";
import NavigationBar from "./NavigationBar";

describe("NavigationBar render test", () => {
  test("NavigationBar  render in page", () => {
    render(
      <>
        <HashRouter>
          <NavigationBar />
        </HashRouter>
      </>
    );
    expect(screen.queryByTestId("nav-bar")).toBeInTheDocument();
    expect(screen.queryByTestId("nav-bar-main")).toBeInTheDocument();
    expect(screen.queryByTestId("nav-bar-finance")).toBeInTheDocument();
    expect(screen.queryByTestId("nav-bar-category")).toBeInTheDocument();
    expect(screen.queryByTestId("nav-bar-about")).toBeInTheDocument();
  });
});
