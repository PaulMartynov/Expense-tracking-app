import React from "react";
import thunk from "redux-thunk";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Middleware } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import Finance from "./Finance";

const middlewares: Middleware[] = [thunk];
const mockStore = configureStore(middlewares);

const testTransaction: Transaction = {
  amount: 0,
  type: "expense",
  uuid: "123",
  date: new Date().getTime(),
  description: "test-123",
  category: "test",
  subcategory: "test-sab",
  childSubCategory: "test-sub-child",
};
const testCategory: ExpCategory = {
  categoryName: "test",
  subCategoriesList: [
    {
      name: "test-sab",
      children: ["test-sub-child"],
    },
  ],
};
const initialState = {
  auth: {
    userId: "1",
  },
  category: {
    categoryList: [testCategory],
    isLoaded: true,
  },
  transactions: {
    transactionsList: [testTransaction],
    transactionsIsLoaded: true,
    transactionIsSaved: true,
  },
};

const store = mockStore(initialState);

describe("testing Finance", () => {
  test("rendering Finance", () => {
    jest.mock("../../store/categoryReducer", () => {
      return {
        getAllCategories: jest.fn(),
      };
    });
    jest.mock("../../store/transactionsReducer", () => {
      return {
        saveTransaction: jest.fn(),
        getAllUserTransactions: jest.fn(),
        getLastNUserTransactions: jest.fn(),
        getUsersTransactionsByDate: jest.fn(),
        deleteUserTransaction: jest.fn(),
        updateUserTransaction: jest.fn(),
      };
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Finance />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.queryByText("Фильтр")).toBeInTheDocument();
    expect(screen.queryByText("test")).toBeInTheDocument();
    expect(screen.queryByText("test-sab")).toBeInTheDocument();
    expect(screen.queryByText("test-sub-child")).toBeInTheDocument();

    expect(screen.queryByTestId("modal-div")).not.toBeInTheDocument();
    expect(screen.queryByTestId("add-category-btn")).toBeInTheDocument();
    userEvent.click(screen.queryByTestId("add-category-btn")!);
    expect(screen.queryByTestId("modal-div")).toBeInTheDocument();
    userEvent.click(screen.queryByTestId("modal-transaction-close-btn")!);
    expect(screen.queryByTestId("modal-div")).not.toBeInTheDocument();

    userEvent.click(screen.queryByTestId("add-category-btn")!);
    userEvent.paste(
      screen.queryByTestId("modal-transaction-description-input")!,
      "test-123"
    );
    userEvent.click(screen.queryByTestId("modal-transaction-save-btn")!);
    expect(screen.queryByTestId("modal-div")).not.toBeInTheDocument();

    userEvent.click(screen.queryByText("test")!);
    expect(screen.queryByTestId("modal-div")).toBeInTheDocument();
    userEvent.click(screen.queryByTestId("modal-transaction-close-btn")!);
    expect(screen.queryByTestId("modal-div")).not.toBeInTheDocument();
  });
});
