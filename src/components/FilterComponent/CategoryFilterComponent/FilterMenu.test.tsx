import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import FilterMenu from "./FilterMenu";

describe("testing CategoryFilterComponent", () => {
  test("rendering CategoryFilterComponent", () => {
    const testCategory: ExpCategory = {
      categoryName: "test",
      subCategoriesList: [
        {
          name: "test-sab",
          children: ["test-sub-child"],
        },
      ],
    };
    const chList: CheckedList = {
      test: true,
      "test test-sab": true,
      "test test-sab test-sub-child": true,
    };
    const setActiveFn = jest.fn();
    const updateFn = jest.fn();

    render(
      <FilterMenu
        active={true}
        setActive={setActiveFn}
        categoryList={[testCategory]}
        checkedList={chList}
        updateFn={updateFn}
      />
    );

    expect(screen.queryByTestId("check-category-all")).toBeInTheDocument();
    expect(screen.queryByTestId("check-category-test")).toBeInTheDocument();
    expect(
      screen.queryByTestId("check-category-test-test-sab")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("check-category-test-test-sab-test-sub-child")
    ).toBeInTheDocument();

    expect(screen.queryByText("Все")).toBeInTheDocument();
    expect(screen.queryByText("test")).toBeInTheDocument();
    expect(screen.queryByText("test-sab")).toBeInTheDocument();
    expect(screen.queryByText("test-sub-child")).toBeInTheDocument();

    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-all")?.checked
    ).toBeTruthy();
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-test")?.checked
    ).toBeTruthy();
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-test-test-sab")
        ?.checked
    ).toBeTruthy();
    expect(
      screen.queryByTestId<HTMLInputElement>(
        "check-category-test-test-sab-test-sub-child"
      )?.checked
    ).toBeTruthy();

    userEvent.click(screen.queryByTestId("check-category-all")!);
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-all")?.checked
    ).toBeFalsy();
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-test")?.checked
    ).toBeFalsy();
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-test-test-sab")
        ?.checked
    ).toBeFalsy();
    expect(
      screen.queryByTestId<HTMLInputElement>(
        "check-category-test-test-sab-test-sub-child"
      )?.checked
    ).toBeFalsy();

    userEvent.click(
      screen.queryByTestId("check-category-test-test-sab-test-sub-child")!
    );
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-all")?.checked
    ).toBeFalsy();
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-test")?.checked
    ).toBeFalsy();
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-test-test-sab")
        ?.checked
    ).toBeFalsy();
    expect(
      screen.queryByTestId<HTMLInputElement>(
        "check-category-test-test-sab-test-sub-child"
      )?.checked
    ).toBeTruthy();

    userEvent.click(screen.queryByTestId("check-category-test-test-sab")!);
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-all")?.checked
    ).toBeFalsy();
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-test")?.checked
    ).toBeFalsy();
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-test-test-sab")
        ?.checked
    ).toBeTruthy();
    expect(
      screen.queryByTestId<HTMLInputElement>(
        "check-category-test-test-sab-test-sub-child"
      )?.checked
    ).toBeTruthy();

    userEvent.click(screen.queryByTestId("check-category-test")!);
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-all")?.checked
    ).toBeTruthy();
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-test")?.checked
    ).toBeTruthy();
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-test-test-sab")
        ?.checked
    ).toBeTruthy();
    expect(
      screen.queryByTestId<HTMLInputElement>(
        "check-category-test-test-sab-test-sub-child"
      )?.checked
    ).toBeTruthy();

    userEvent.click(screen.queryByTestId("check-category-test")!);
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-all")?.checked
    ).toBeFalsy();
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-test")?.checked
    ).toBeFalsy();
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-test-test-sab")
        ?.checked
    ).toBeFalsy();
    expect(
      screen.queryByTestId<HTMLInputElement>(
        "check-category-test-test-sab-test-sub-child"
      )?.checked
    ).toBeFalsy();

    userEvent.click(screen.queryByTestId("check-category-test-test-sab")!);
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-all")?.checked
    ).toBeFalsy();
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-test")?.checked
    ).toBeFalsy();
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-test-test-sab")
        ?.checked
    ).toBeTruthy();
    expect(
      screen.queryByTestId<HTMLInputElement>(
        "check-category-test-test-sab-test-sub-child"
      )?.checked
    ).toBeTruthy();

    userEvent.click(
      screen.queryByTestId("check-category-test-test-sab-test-sub-child")!
    );
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-all")?.checked
    ).toBeFalsy();
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-test")?.checked
    ).toBeFalsy();
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-test-test-sab")
        ?.checked
    ).toBeTruthy();
    expect(
      screen.queryByTestId<HTMLInputElement>(
        "check-category-test-test-sab-test-sub-child"
      )?.checked
    ).toBeFalsy();

    userEvent.click(screen.queryByTestId("check-category-all")!);
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-all")?.checked
    ).toBeTruthy();
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-test")?.checked
    ).toBeTruthy();
    expect(
      screen.queryByTestId<HTMLInputElement>("check-category-test-test-sab")
        ?.checked
    ).toBeTruthy();
    expect(
      screen.queryByTestId<HTMLInputElement>(
        "check-category-test-test-sab-test-sub-child"
      )?.checked
    ).toBeTruthy();
  });
});
