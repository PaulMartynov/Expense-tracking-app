import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TransactionCard from "./TransactionCard";

describe("testing TransactionCard", () => {
  test("rendering TransactionCard", () => {
    const saveFn = jest.fn();
    const deleteFn = jest.fn();
    const testTransaction: Transaction = {
      amount: 0,
      type: "expense",
      uuid: "123",
      date: new Date().getTime(),
      description: "test-123",
      category: "1",
      subcategory: "2",
      childSubCategory: "3",
    };
    render(
      <>
        <TransactionCard
          categoryList={[]}
          deleteFn={deleteFn}
          saveFn={saveFn}
          transaction={testTransaction}
        />
      </>
    );
    expect(screen.queryByTestId("transaction-card")).toBeInTheDocument();
    expect(screen.queryByTestId("transaction-date")).toBeInTheDocument();
    expect(screen.queryByTestId("transaction-description")).toBeInTheDocument();
    expect(screen.queryByTestId("transaction-category")).toBeInTheDocument();
  });
});
