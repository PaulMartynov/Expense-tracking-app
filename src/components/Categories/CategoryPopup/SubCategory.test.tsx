import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import SubCategory from "./SubCategory";

describe("testing SubCategory", () => {
  test("rendering SubCategory", () => {
    const addFn = jest.fn();
    const deleteFn = jest.fn();
    const deleteChFn = jest.fn();
    render(
      <>
        <SubCategory
          id={2}
          name={"test"}
          childrens={["test-ch-1"]}
          deleteFunc={deleteFn}
          addChildFn={addFn}
          deleteChildFn={deleteChFn}
        />
      </>
    );
    expect(screen.queryByTestId("sub-card")).toBeInTheDocument();
    expect(screen.queryByTestId("sub-card-name")).toBeInTheDocument();
    expect(screen.queryByTestId("sub-card-del-btn")).toBeInTheDocument();
    expect(screen.queryByTestId("sub-card-input")).toBeInTheDocument();
    expect(screen.queryByTestId("sub-card-add-btn")).toBeInTheDocument();
    expect(screen.queryByTestId("sub-card-del-btn")).toBeInTheDocument();
    expect(screen.queryByText("test-ch-1")).toBeInTheDocument();
    expect(screen.queryByTestId("ch-del-btn-0")).toBeInTheDocument();

    userEvent.click(screen.queryByTestId("ch-del-btn-0")!);
    expect(screen.queryByText("test-ch-1")).not.toBeInTheDocument();

    screen.queryByTestId("sub-card-del-btn")?.click();
    expect(deleteFn).toHaveBeenCalled();

    userEvent.click(screen.queryByTestId("sub-card-add-btn")!);
    expect(addFn).not.toHaveBeenCalled();

    userEvent.paste(screen.queryByTestId("sub-card-input")!, "test-11");
    userEvent.click(screen.queryByTestId("sub-card-add-btn")!);
    expect(addFn).toHaveBeenCalled();
  });
});
