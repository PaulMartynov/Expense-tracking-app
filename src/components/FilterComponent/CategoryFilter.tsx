import React from "react";
import { Col, Row } from "react-bootstrap";
import "./Filter.css";

interface FilterProps {
  categoryList: ExpCategory[];
  transactionsList?: Transaction[];
  filterTransactions?: (list: Transaction[]) => void;
  filterCategories?: (list: ExpCategory[]) => void;
}

export default class CategoryFilter extends React.Component<
  FilterProps,
  {
    dropActive: boolean;
    categorySelected: ExpCategory[];
    filterValue: string;
  }
> {
  constructor(props: FilterProps) {
    super(props);
    this.state = {
      dropActive: false,
      categorySelected: [],
      filterValue: "",
    };
  }

  showCategoryList = (): void => {
    this.setState({
      dropActive: !this.state.dropActive,
    });
  };

  categoriesSelected = (): string => {
    let count = 0;
    this.state.categorySelected.forEach((cat) => {
      count += 1;
      cat.subCategoriesList.forEach((subcat) => {
        count += 1;
        subcat.children.forEach(() => {
          count += 1;
        });
      });
    });
    return count > 0 ? `${count}` : "все";
  };

  onFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      filterValue: event.target.value,
    });
  };

  render(): JSX.Element {
    return (
      <Row>
        <Col className={"col-filter-date"}>
          <ul className="list-group">
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              onClick={this.showCategoryList}
            >
              Категории
              <span className="badge bg-primary rounded-pill">
                {this.categoriesSelected()}
              </span>
            </li>
          </ul>
        </Col>
        <Col>
          <div className="form-group row">
            <label htmlFor="categorySearch" className="col-sm-2 col-form-label">
              Поиск:
            </label>
            <div className="col-sm-10 col-filter-date-2">
              <input
                type="text"
                className="form-control"
                id="categorySearch"
                value={this.state.filterValue}
                onChange={this.onFilterChange}
              />
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}
