import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "./Modal";

describe("testing ModalComponent", () => {
  test("rendering active Modal test", () => {
    const activeFn = jest.fn();
    render(
      <>
        <Modal
          active={true}
          setActive={activeFn}
          title={"test"}
          children={<></>}
        />
      </>
    );
    expect(screen.queryByTestId("modal-div")).toBeInTheDocument();
    expect(screen.queryByTestId("modal-div")?.className).toBe(
      "modal_window active"
    );
    expect(screen.queryByTestId("modal-header")).toBeInTheDocument();
    expect(screen.queryByTestId("modal-close-btn")).toBeInTheDocument();
    screen.queryByTestId("modal-close-btn")?.click();
    expect(activeFn).toHaveBeenCalled();
    screen.queryByTestId("modal-div")?.click();
    expect(activeFn).toHaveBeenCalledTimes(2);
  });

  test("rendering inactive Modal", () => {
    render(
      <>
        <Modal
          active={false}
          setActive={jest.fn()}
          title={"test"}
          children={<></>}
        />
      </>
    );
    expect(screen.queryByTestId("modal-div")?.className).toBe("modal_window");
  });
});
