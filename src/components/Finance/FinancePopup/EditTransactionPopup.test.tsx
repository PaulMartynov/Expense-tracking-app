import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditTransactionPopup from "./EditTransactionPopup";

describe("testint EditTransactionPopup", () => {
  test("rendering EditTransactionPopup", () => {
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
    const testTransaction: Transaction = {
      amount: 0,
      type: "expense",
      uuid: "123",
      date: new Date().getTime(),
      description: "test-123",
      category: "test",
      subcategory: "test-2",
      childSubCategory: "test-3",
    };
    render(
      <>
        <EditTransactionPopup
          active={true}
          categoryList={[testCategory]}
          deleteFn={deleteFn}
          saveFn={saveFn}
          setActive={activeFn}
          transaction={testTransaction}
        />
      </>
    );
    expect(screen.queryByTestId("modal-div")).toBeInTheDocument();
    expect(screen.queryByTestId("modal-transaction-body")).toBeInTheDocument();
    expect(
      screen.queryByTestId("modal-transaction-description-input")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("modal-transaction-date")).toBeInTheDocument();
    expect(screen.queryByTestId("modal-transaction-time")).toBeInTheDocument();
    expect(
      screen.queryByTestId("modal-transaction-amount")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("modal-transaction-expense")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("modal-transaction-income")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("modal-transaction-select-cat")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("modal-transaction-select-sub-cat")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("modal-transaction-select-sub-child")
    ).toBeInTheDocument();

    expect(
      screen.queryByTestId("modal-transaction-save-btn")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("modal-transaction-del-btn")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("modal-transaction-close-btn")
    ).toBeInTheDocument();

    screen.queryByTestId("modal-transaction-save-btn")?.click();
    expect(saveFn).toHaveBeenCalled();
    screen.queryByTestId("modal-transaction-close-btn")?.click();
    expect(activeFn).toHaveBeenCalled();
    screen.queryByTestId("modal-transaction-del-btn")?.click();
    expect(deleteFn).toHaveBeenCalled();
  });
});
