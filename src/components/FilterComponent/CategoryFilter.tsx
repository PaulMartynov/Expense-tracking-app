import React from "react";
import { Col, Row } from "react-bootstrap";
import "./Filter.css";
import { filterCategoriesByText, filterTransactionsByText } from "./Filter";

interface FilterProps {
  categoryList: ExpCategory[];
  resetFilter: () => void;
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
      categorySelected: [...this.props.categoryList],
      filterValue: "",
    };
  }

  componentDidMount(): void {
    this.setState({
      categorySelected: [...this.props.categoryList],
    });
  }

  componentDidUpdate(prevProps: Readonly<FilterProps>): void {
    if (prevProps.categoryList !== this.props.categoryList) {
      this.setState({
        categorySelected: [...this.props.categoryList],
      });
    }
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
    return `${count}`;
  };

  onFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const filteredCategories = filterCategoriesByText(
      event.target.value,
      this.props.categoryList
    );

    this.setState({
      filterValue: event.target.value,
      categorySelected: filteredCategories,
    });

    if (
      this.props.transactionsList &&
      this.props.transactionsList?.length > 0 &&
      this.props.filterTransactions
    ) {
      this.props.filterTransactions(
        filterTransactionsByText(
          event.target.value,
          this.props.transactionsList
        )
      );
    }

    if (this.props.filterCategories) {
      this.props.filterCategories(filteredCategories);
    }
  };

  onKeyUp = (): void => {
    if (this.state.filterValue === "") {
      this.props.resetFilter();
    }
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
                onKeyUp={this.onKeyUp}
              />
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}
