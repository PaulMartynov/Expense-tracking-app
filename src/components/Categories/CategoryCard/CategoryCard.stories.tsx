import React from "react";
import { Meta, Story } from "@storybook/react";
import CategoryCard, { CategoryCardProps } from "./CategoryCard";
import "../../index.scss";

export default {
  component: CategoryCard,
  title: "Components/CategoryCard",
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
const Template: Story<CategoryCardProps> = (args) => <CategoryCard {...args} />;

export const categoryCard = Template;
export const categoryCardParts = Template.bind({});
export const categoryCardEmpty = Template.bind({});

categoryCard.args = {
  id: 1,
  category: exampleCategory,
  saveFn: (id: number, category: ExpCategory) => Promise.resolve(),
  deleteFn: (id) => Promise.resolve(),
};
categoryCardParts.args = {
  id: 2,
  category: {
    categoryName: "Машина",
    subCategoriesList: [
      {
        name: "Заправка",
        children: [],
      },
      {
        name: "Ремонт",
        children: [],
      },
    ],
  },
  saveFn: (id: number, category: ExpCategory) => Promise.resolve(),
  deleteFn: (id) => Promise.resolve(),
};
categoryCardEmpty.args = {
  id: 3,
  category: {
    categoryName: "Пустая категория",
    subCategoriesList: [],
  },
  saveFn: (id: number, category: ExpCategory) => Promise.resolve(),
  deleteFn: (id) => Promise.resolve(),
};
