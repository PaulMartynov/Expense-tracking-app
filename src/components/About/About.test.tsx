import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import About from "./About";

describe("About render test", () => {
  test("About  render in page", () => {
    render(
      <>
        <About />
      </>
    );
    expect(screen.queryByTestId("about-header")).toBeInTheDocument();
    expect(screen.queryByTestId("about-section")).toBeInTheDocument();
  });
});
