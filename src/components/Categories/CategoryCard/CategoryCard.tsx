import React from "react";
import "./catCard.css";
import EditCategoryPopup from "../CategoryPopup/EditCategoryPopup";

export interface CategoryCardProps {
  id: number;
  category: ExpCategory;
  saveFn: (id: number, category: ExpCategory) => Promise<void>;
  deleteFn: (id: number) => Promise<void>;
}

export default class CategoryCard extends React.Component<
  CategoryCardProps,
  { isActive: boolean }
> {
  constructor(props: CategoryCardProps) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  setActive = (): void => {
    this.setState({ isActive: !this.state.isActive });
  };

  saveFn = async (id: number, category: ExpCategory): Promise<void> => {
    this.setState({ isActive: !this.state.isActive });
    await this.props.saveFn(id, category);
  };

  deleteFn = async (id: number): Promise<void> => {
    this.setState({ isActive: !this.state.isActive });
    await this.props.deleteFn(id);
  };

  render(): JSX.Element {
    return (
      <div
        className={"category-card"}
        onClick={this.setActive}
        data-testid={"category-card"}
      >
        {this.state.isActive ? (
          <EditCategoryPopup
            active={this.state.isActive}
            setActive={this.setActive}
            saveFn={this.saveFn}
            category={this.props.category}
            deleteFn={this.deleteFn}
            id={this.props.id}
          />
        ) : null}
        <div className="card-header category-card-header">
          <h4 data-testid={"category-card-name"}>
            {this.props.category.categoryName}
          </h4>
        </div>
        <div className="card-body">
          {this.props.category.subCategoriesList.map((value, index) => (
            <React.Fragment
              key={`${this.props.category.categoryName}-sub-category-id-${index}`}
            >
              <div className={"category-card sub-category-card"}>
                <div className="card-header category-card-header">
                  <h5 data-testid={"subcategory-card-name"}>{value.name}</h5>
                </div>
                <div>
                  {value.children.map((item, ind) => (
                    <React.Fragment
                      key={`${this.props.category.categoryName}-sub-category-id-${index}-child-${ind}`}
                    >
                      <span
                        data-testid={"subcategory-child-name"}
                        className="badge bg-primary sub-cat-children"
                      >
                        {item}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}
