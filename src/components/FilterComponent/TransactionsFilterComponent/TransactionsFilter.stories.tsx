import React from "react";
import { Meta, Story } from "@storybook/react";
import TransactionsFilter from "./TransactionsFilter";

export default {
  component: TransactionsFilter,
  title: "Components/TransactionsFilter",
} as Meta;

const Template: Story<TransactionsFilter> = () => (
  <TransactionsFilter
    viewCountFn={(c) => Promise.resolve()}
    viewByDateFn={(c) => Promise.resolve()}
  />
);
export const transactionFilter = Template;
