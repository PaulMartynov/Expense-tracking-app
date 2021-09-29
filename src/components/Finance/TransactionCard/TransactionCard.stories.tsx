import React from "react";
import { Story } from "@storybook/react";
import TransactionCard from "./TransactionCard";
import "./TransactionCard.css";
import "../../index.scss";

export default {
  component: TransactionCard,
  title: "Components/TransactionCard",
};
const exampleCategory: ExpCategory = {
  categoryName: "Продукты",
  subCategoriesList: [
    {
      name: "Фрукты",
      children: ["Яблоки", "Бананы", "Апельсины", "Виноград"],
    },
    {
      name: "Овощи",
      children: ["Огурцы", "Помидоры", "Лук", "Чеснок", "Салат"],
    },
  ],
};
const exampleTransaction: Transaction = {
  amount: 2000,
  type: "expense",
  uuid: "123",
  date: 1631705400000,
  description: "Купил яблоки",
  category: "Продукты",
  subcategory: "Фрукты",
  childSubCategory: "Яблоки",
};
const Template: Story<TransactionCard> = () => (
  <TransactionCard
    categoryList={[exampleCategory]}
    deleteFn={(id) => Promise.resolve()}
    saveFn={(id) => Promise.resolve()}
    transaction={exampleTransaction}
  />
);

export const categoryCard = Template;
