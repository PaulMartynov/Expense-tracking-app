import React from "react";

interface SubCatProps {
  name: string;
  children: string[];
}

export default class SubCategory extends React.Component<
  SubCatProps,
  {
    childName: string;
    childrens: string[];
  }
> {
  constructor(props: SubCatProps) {
    super(props);
    this.state = {
      childName: "",
      childrens: this.props.children,
    };
  }

  render(): JSX.Element {
    return (
      <div>
        <label>{this.props.name}</label>
      </div>
    );
  }
}
