import React from "react";
import { Meta, Story } from "@storybook/react";
import CategoryFilter from "./CategoryFilter";

export default {
  component: CategoryFilter,
  title: "Components/CategoryFilter",
} as Meta;
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

const Template: Story<CategoryFilter> = () => (
  <CategoryFilter categoryList={[exampleCategory]} resetFilter={() => ""} />
);
export const categoryFilter = Template;
