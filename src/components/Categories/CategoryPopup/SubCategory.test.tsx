import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
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

    screen.queryByTestId("sub-card-del-btn")?.click();
    expect(deleteFn).toHaveBeenCalled();
    // screen.queryByTestId("sub-card-input")?.setAttribute("value", "test-11");
    // screen.queryByTestId("sub-card-input")?.dispatchEvent(new Event("change"));
    // screen.queryByTestId("sub-card-add-btn")?.click();
    // expect(addFn).toHaveBeenCalled();
  });
});
