import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CategoryCard from "./CategoryCard";

describe("render CategoryCard", () => {
  test("render CategoryCard test", () => {
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
        <CategoryCard
          id={1}
          category={testCategory}
          saveFn={jest.fn()}
          deleteFn={jest.fn()}
        />
      </>
    );
    expect(screen.queryByTestId("category-card")).toBeInTheDocument();
    expect(screen.queryByTestId("category-card-name")).toBeInTheDocument();
    expect(screen.queryByTestId("subcategory-card-name")).toBeInTheDocument();
    expect(screen.queryByTestId("subcategory-child-name")).toBeInTheDocument();
  });
});
