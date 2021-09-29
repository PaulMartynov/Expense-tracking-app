import React from "react";
import { Story } from "@storybook/react";
import CategoryCard from "./CategoryCard";
import "../../index.scss";

export default {
  component: CategoryCard,
  title: "Components/CategoryCard",
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
const Template: Story<CategoryCard> = () => (
  <CategoryCard
    id={12}
    category={exampleCategory}
    deleteFn={(id) => Promise.resolve()}
    saveFn={(id) => Promise.resolve()}
  />
);

export const categoryCard = Template;
