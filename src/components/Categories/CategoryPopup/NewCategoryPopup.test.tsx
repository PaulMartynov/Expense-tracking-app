import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewCategoryPopup from "./NewCategoryPopup";

describe("testint NewCategoryPopup", () => {
  test("rendering NewCategoryPopup", () => {
    const activeFn = jest.fn();
    const saveFn = jest.fn();
    render(
      <>
        <NewCategoryPopup
          active={true}
          setActive={activeFn}
          saveFn={saveFn}
          children={<></>}
        />
      </>
    );
    expect(screen.queryByTestId("modal-div")).toBeInTheDocument();
    expect(screen.queryByTestId("modal-body")).toBeInTheDocument();
    expect(screen.queryByTestId("modal-category-input")).toBeInTheDocument();
    expect(screen.queryByTestId("modal-subcategory-input")).toBeInTheDocument();
    expect(
      screen.queryByTestId("modal-subcategory-add-btn")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("modal-footer")).toBeInTheDocument();
    expect(screen.queryByTestId("modal-footer-save-btn")).toBeInTheDocument();
    expect(screen.queryByTestId("modal-footer-close-btn")).toBeInTheDocument();

    screen.queryByTestId("modal-footer-save-btn")?.click();
    expect(saveFn).toHaveBeenCalled();
    screen.queryByTestId("modal-footer-close-btn")?.click();
    expect(activeFn).toHaveBeenCalled();
  });
});
