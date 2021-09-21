import React from "react";
import "./catCard.css";

interface CategoryCardProps {
  category: ExpCategory;
}

export default function CategoryCard(props: CategoryCardProps): JSX.Element {
  return (
    <div className={"category-card"}>
      <div className="card-header category-card-header">
        <h4>{props.category.categoryName}</h4>
      </div>
      <div className="card-body">
        {props.category.subCategoriesList.map((value, index) => (
          <React.Fragment
            key={`${props.category.categoryName}-sub-category-id-${index}`}
          >
            <div className={"category-card sub-category-card"}>
              <div className="card-header category-card-header">
                <h5>{value.name}</h5>
              </div>
              <div>
                {value.children.map((item, ind) => (
                  <React.Fragment
                    key={`${props.category.categoryName}-sub-category-id-${index}-child-${ind}`}
                  >
                    <span className="badge rounded-pill bg-success sub-cat-children">
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
