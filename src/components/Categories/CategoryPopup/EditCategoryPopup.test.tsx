import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import EditCategoryPopup from "./EditCategoryPopup";

describe("testint EditCategoryPopup", () => {
  test("rendering EditCategoryPopup", () => {
    const activeFn = jest.fn();
    const saveFn = jest.fn();
    const deleteFn = jest.fn();
    const testCategory: ExpCategory = {
      categoryName: "test",
      subCategoriesList: [
        {
          name: "test-sab",
          children: ["test-sub-child"],
        },
      ],
    };
    render(
      <>
        <EditCategoryPopup
          active={true}
          setActive={activeFn}
          saveFn={saveFn}
          children={<></>}
          category={testCategory}
          deleteFn={deleteFn}
          id={1}
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
    expect(screen.queryByText("test-sab")).toBeInTheDocument();
    expect(screen.queryByText("test-sub-child")).toBeInTheDocument();
    expect(screen.queryByTestId("sub-card-del-btn")).toBeInTheDocument();

    expect(screen.queryByTestId("modal-footer")).toBeInTheDocument();
    expect(screen.queryByTestId("modal-footer-save-btn")).toBeInTheDocument();
    expect(screen.queryByTestId("modal-footer-close-btn")).toBeInTheDocument();
    expect(screen.queryByTestId("modal-footer-del-btn")).toBeInTheDocument();

    screen.queryByTestId("modal-footer-save-btn")?.click();
    expect(saveFn).toHaveBeenCalled();
    screen.queryByTestId("modal-footer-close-btn")?.click();
    expect(activeFn).toHaveBeenCalled();
    screen.queryByTestId("modal-footer-del-btn")?.click();
    expect(deleteFn).toHaveBeenCalled();

    userEvent.click(screen.queryByTestId("sub-card-del-btn")!);
    expect(screen.queryByText("test-sab")).not.toBeInTheDocument();

    expect(screen.queryByText("test-sab-2")).not.toBeInTheDocument();
    userEvent.paste(
      screen.queryByTestId("modal-subcategory-input")!,
      "test-sab-2"
    );
    userEvent.click(screen.queryByTestId("modal-subcategory-add-btn")!);
    expect(screen.queryByText("test-sab-2")).toBeInTheDocument();
  });
});
