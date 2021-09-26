import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PyeChart from "./PyeChart";
import ColumnChart from "./ColumnChart";

describe("testing charts", () => {
  test("rendering PyChart", () => {
    render(
      <>
        <PyeChart type={""} transactions={[]} />
      </>
    );

    expect(screen.getByText("Загрузка статистики...")).toBeInTheDocument();
  });

  test("rendering ColumnChart", () => {
    render(
      <>
        <ColumnChart transactions={[]} />
      </>
    );

    expect(screen.getByText("Loading Chart")).toBeInTheDocument();
  });
});
