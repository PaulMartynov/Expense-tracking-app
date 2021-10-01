import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import CategoryFilter from "./CategoryFilter";

describe("testing CategoryFilter", () => {
  const testCategoryList = [
    {
      categoryName: "test",
      subCategoriesList: [
        {
          name: "test-sab",
          children: ["test-sub-child"],
        },
      ],
    },
    {
      categoryName: "test-2",
      subCategoriesList: [
        {
          name: "test-sab-2",
          children: ["test-sub-child-2"],
        },
      ],
    },
    {
      categoryName: "test-3",
      subCategoriesList: [
        {
          name: "test-sab-3",
          children: ["test-sub-child-3"],
        },
      ],
    },
  ];
  test("rendering CategoryFilter", () => {
    const resetFn = jest.fn();
    render(
      <CategoryFilter categoryList={testCategoryList} resetFilter={resetFn} />
    );
    expect(screen.queryByText("Фильтр")).toBeInTheDocument();
    expect(screen.queryByTestId("checked-count")).toBeInTheDocument();
    expect(screen.queryByTestId("categorySearchInput")).toBeInTheDocument();

    expect(screen.queryByTestId("checked-count")?.innerHTML).toBe("9");

    userEvent.paste(screen.queryByTestId("categorySearchInput")!, "test-211");
    expect(screen.queryByTestId("checked-count")?.innerHTML).toBe("0");

    userEvent.clear(screen.queryByTestId("categorySearchInput")!);
    expect(screen.queryByTestId("checked-count")?.innerHTML).toBe("9");

    userEvent.paste(screen.queryByTestId("categorySearchInput")!, "test-sab");
    expect(screen.queryByTestId("checked-count")?.innerHTML).toBe("6");

    userEvent.clear(screen.queryByTestId("categorySearchInput")!);
    userEvent.paste(screen.queryByTestId("categorySearchInput")!, "child");
    expect(screen.queryByTestId("checked-count")?.innerHTML).toBe("9");

    userEvent.clear(screen.queryByTestId("categorySearchInput")!);
    userEvent.paste(screen.queryByTestId("categorySearchInput")!, "child-3");
    expect(screen.queryByTestId("checked-count")?.innerHTML).toBe("3");

    userEvent.click(screen.queryByText("Фильтр")!);
    expect(screen.queryByTestId("check-category-all")).toBeInTheDocument();

    userEvent.click(screen.queryByText("Фильтр")!);
    expect(screen.queryByTestId("check-category-all")).not.toBeInTheDocument();

    expect(resetFn).toHaveBeenCalled();
  });
});
