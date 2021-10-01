import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import TransactionsFilter from "./TransactionsFilter";

describe("testing TransactionsFilter", () => {
  test("rendering TransactionsFilter", () => {
    const viewCountFn = jest.fn().mockReturnValue(Promise.resolve());
    const viewByDateFn = jest.fn().mockReturnValue(Promise.resolve());
    render(
      <TransactionsFilter
        viewCountFn={viewCountFn}
        viewByDateFn={viewByDateFn}
      />
    );

    expect(screen.queryByTestId("filter-date-from")).toBeInTheDocument();
    expect(screen.queryByTestId("filter-time-from")).toBeInTheDocument();
    expect(screen.queryByTestId("filter-date-to")).toBeInTheDocument();
    expect(screen.queryByTestId("filter-time-to")).toBeInTheDocument();
    expect(screen.queryByTestId("filter-date-btn")).toBeInTheDocument();
    expect(screen.queryByTestId("filter-count-input")).toBeInTheDocument();
    expect(screen.queryByTestId("filter-count-btn")).toBeInTheDocument();

    userEvent.click(screen.queryByTestId("filter-count-btn")!);
    expect(viewCountFn).toBeCalledWith(20);

    userEvent.clear(screen.queryByTestId("filter-count-input")!);
    userEvent.paste(screen.queryByTestId("filter-count-input")!, "33");
    userEvent.click(screen.queryByTestId("filter-count-btn")!);
    expect(viewCountFn).toBeCalledWith(33);

    const dateStringFrom = screen
      .queryByTestId<HTMLInputElement>("filter-date-from")
      ?.value.split("-");
    const timeStringFrom = screen
      .queryByTestId<HTMLInputElement>("filter-time-from")
      ?.value.split(":");

    const dateStringTo = screen
      .queryByTestId<HTMLInputElement>("filter-date-to")
      ?.value.split("-");
    const timeStringTo = screen
      .queryByTestId<HTMLInputElement>("filter-time-to")
      ?.value.split(":");

    let dateFrom = new Date(
      Number(dateStringFrom![0]),
      Number(dateStringFrom![1]) - 1,
      Number(dateStringFrom![2]),
      Number(timeStringFrom![0]),
      Number(timeStringFrom![1])
    ).getTime();

    let dateTo = new Date(
      Number(dateStringTo![0]),
      Number(dateStringTo![1]) - 1,
      Number(dateStringTo![2]),
      Number(timeStringTo![0]),
      Number(timeStringTo![1])
    ).getTime();

    userEvent.click(screen.queryByTestId("filter-date-btn")!);
    expect(viewByDateFn).toBeCalledWith(dateFrom, dateTo);

    userEvent.clear(screen.queryByTestId("filter-date-from")!);
    userEvent.paste(screen.queryByTestId("filter-date-from")!, "2021-01-01");
    userEvent.clear(screen.queryByTestId("filter-time-from")!);
    userEvent.paste(screen.queryByTestId("filter-time-from")!, "00:01");
    userEvent.clear(screen.queryByTestId("filter-date-to")!);
    userEvent.paste(screen.queryByTestId("filter-date-to")!, "2021-02-02");
    userEvent.clear(screen.queryByTestId("filter-time-to")!);
    userEvent.paste(screen.queryByTestId("filter-time-to")!, "02:02");

    dateFrom = new Date(
      Number(dateStringFrom![0]),
      Number(dateStringFrom![1]) - 1,
      Number(dateStringFrom![2]),
      Number(timeStringFrom![0]),
      Number(timeStringFrom![1])
    ).getTime();
    dateTo = new Date(
      Number(dateStringTo![0]),
      Number(dateStringTo![1]) - 1,
      Number(dateStringTo![2]),
      Number(timeStringTo![0]),
      Number(timeStringTo![1])
    ).getTime();

    userEvent.click(screen.queryByTestId("filter-date-btn")!);
    expect(viewByDateFn).toBeCalledWith(dateFrom, dateTo);
  });
});
