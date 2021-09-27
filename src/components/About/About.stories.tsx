import React from "react";
import { Story } from "@storybook/react";
import About from "./About";

export default {
  component: About,
  title: "Components/About",
};

const Template: Story = () => <About />;

export const collapseBlock = Template;
