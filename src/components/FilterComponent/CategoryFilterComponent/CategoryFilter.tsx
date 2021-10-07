import React from "react";
import { Col, Row } from "react-bootstrap";
import "../Filter.css";
import {
  filterCategories,
  filterCategoriesByText,
  filterTransactionsByCheckList,
  filterTransactionsByText,
} from "../Filter";
import FilterMenu from "./FilterMenu";

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
    modalActive: boolean;
    categorySelected: CheckedList;
    filterValue: string;
  }
> {
  constructor(props: FilterProps) {
    super(props);
    this.state = {
      modalActive: false,
      filterValue: "",
      categorySelected: filterCategoriesByText("", this.props.categoryList),
    };
  }

  countSelected = (): number => {
    let count = 0;
    Object.keys(this.state.categorySelected).forEach((key) => {
      if (this.state.categorySelected[key]) {
        count += 1;
      }
    });
    return count;
  };

  componentDidMount(): void {
    this.setState({
      categorySelected: filterCategoriesByText(
        this.state.filterValue,
        this.props.categoryList
      ),
    });
  }

  componentDidUpdate(prevProps: Readonly<FilterProps>): void {
    if (prevProps.categoryList !== this.props.categoryList) {
      this.setState({
        categorySelected: filterCategoriesByText(
          this.state.filterValue,
          this.props.categoryList
        ),
      });
    }
  }

  showCategoryList = (): void => {
    this.setState({
      modalActive: !this.state.modalActive,
    });
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
      this.props.filterCategories(
        filterCategories(filteredCategories, this.props.categoryList)
      );
    }
  };

  onKeyUp = (): void => {
    if (this.state.filterValue === "") {
      this.props.resetFilter();
    }
  };

  updateTransactionList = (list: CheckedList): void => {
    this.props.resetFilter();
    if (
      this.props.transactionsList &&
      this.props.transactionsList?.length > 0 &&
      this.props.filterTransactions
    ) {
      this.props.filterTransactions(
        filterTransactionsByCheckList(list, this.props.transactionsList)
      );
    }

    if (this.props.filterCategories) {
      this.props.filterCategories(
        filterCategories(list, this.props.categoryList)
      );
    }

    this.setState({
      filterValue: "",
      categorySelected: list,
    });
  };

  render(): JSX.Element {
    return (
      <Row>
        <Col className={"col-filter-check"}>
          <ul className="list-group nav nav-tabs">
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              onClick={this.showCategoryList}
            >
              Фильтр
              <span
                className="badge bg-primary rounded-pill"
                data-testid={`checked-count`}
              >
                {this.countSelected()}
              </span>
            </li>
            {this.state.modalActive ? (
              <FilterMenu
                active={this.state.modalActive}
                setActive={this.showCategoryList}
                updateFn={this.updateTransactionList}
                categoryList={this.props.categoryList}
                checkedList={this.state.categorySelected}
              />
            ) : null}
          </ul>
        </Col>
        <Col>
          <div className="form-group row">
            <label htmlFor="categorySearch" className="col-sm-2 col-form-label">
              Поиск:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                data-testid={`categorySearchInput`}
                className="form-control col-filter-input"
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
