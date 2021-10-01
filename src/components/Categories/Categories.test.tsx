import React from "react";
import thunk from "redux-thunk";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Middleware } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import Categories from "./Categories";

const middlewares: Middleware[] = [thunk];
const mockStore = configureStore(middlewares);

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
};

describe("testing Categories", () => {
  test("rendering Categories", () => {
    jest.mock("../../store/categoryReducer", () => {
      return {
        getAllCategories: jest.fn(),
        saveCategories: jest.fn(),
      };
    });
    const store = mockStore(initialState);
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Categories />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.queryByTestId("add-category-btn")).toBeInTheDocument();

    expect(screen.queryByTestId("modal-div")).not.toBeInTheDocument();
    userEvent.click(screen.queryByTestId("add-category-btn")!);
    expect(screen.queryByTestId("modal-div")).toBeInTheDocument();
    userEvent.click(screen.queryByTestId("modal-footer-close-btn")!);
    expect(screen.queryByTestId("modal-div")).not.toBeInTheDocument();

    expect(screen.queryByText("Фильтр")).toBeInTheDocument();

    expect(screen.queryByText("test")).toBeInTheDocument();
    expect(screen.queryByText("test-sab")).toBeInTheDocument();
    expect(screen.queryByText("test-sub-child")).toBeInTheDocument();

    userEvent.click(screen.queryByText("test")!);
    expect(screen.queryByTestId("modal-div")).toBeInTheDocument();
    userEvent.click(screen.queryByTestId("modal-footer-close-btn")!);
    expect(screen.queryByTestId("modal-div")).not.toBeInTheDocument();

    expect(screen.queryByText("test-123")).not.toBeInTheDocument();
    userEvent.click(screen.queryByTestId("add-category-btn")!);
    userEvent.paste(screen.queryByTestId("modal-category-input")!, "test-123");
    userEvent.click(screen.queryByTestId("modal-footer-save-btn")!);
    expect(screen.queryByTestId("modal-div")).not.toBeInTheDocument();
  });
});
