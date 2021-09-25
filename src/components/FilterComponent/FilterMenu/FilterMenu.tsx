import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { allChecked } from "../Filter";

interface FilterProps {
  active: boolean;
  setActive: () => void;
  categoryList: ExpCategory[];
  checkedList: CheckedList;
  updateFn: (data: CheckedList) => void;
}

export default class FilterMenu extends React.Component<
  FilterProps,
  {
    chekAll: boolean;
    checkedList: CheckedList;
  }
> {
  constructor(props: FilterProps) {
    super(props);
    this.state = {
      chekAll: allChecked(this.props.checkedList),
      checkedList: { ...this.props.checkedList },
    };
  }

  componentDidMount(): void {
    this.setState({
      checkedList: { ...this.props.checkedList },
      chekAll: allChecked(this.props.checkedList),
    });
  }

  componentDidUpdate(prevProps: Readonly<FilterProps>): void {
    if (prevProps.checkedList !== this.props.checkedList) {
      this.setState({
        checkedList: { ...this.props.checkedList },
        chekAll: allChecked(this.props.checkedList),
      });
    }
  }

  toggleAll = (): void => {
    const check = !this.state.chekAll;
    const checkedList = { ...this.state.checkedList };
    Object.keys(checkedList).forEach((k) => {
      checkedList[k] = check;
    });
    this.setState({
      chekAll: check,
      checkedList,
    });
    this.props.updateFn(checkedList);
  };

  toggle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event.target.value;
    const checkedList = { ...this.state.checkedList };
    const check = !this.state.checkedList[target];

    if (!check) {
      Object.keys(checkedList).forEach((k) => {
        if (k.startsWith(target)) {
          checkedList[k] = check;
        }
      });
    }

    const subs = target.split(" ");
    if (check && subs.length > 1) {
      if (subs.length === 3) {
        checkedList[`${subs[0]} ${subs[1]}`] = check;
        checkedList[subs[0]] = check;
      }
      if (subs.length === 2) {
        checkedList[subs[0]] = check;
      }
    }

    checkedList[target] = !this.state.checkedList[target];
    this.setState({
      checkedList,
      chekAll: allChecked(checkedList),
    });

    this.props.updateFn(checkedList);
  };

  getCategoryList = (): JSX.Element => {
    return (
      <Container>
        {this.props.categoryList.map((cat) => {
          return (
            <React.Fragment key={`chek-for-category-${cat.categoryName}`}>
              <Row>
                <Col>
                  <div className="form-check">
                    <input
                      className="form-check-input filter-check"
                      type="checkbox"
                      value={`${cat.categoryName}`}
                      id={`flexCheck-${cat.categoryName}`}
                      checked={this.state.checkedList[cat.categoryName]}
                      onChange={this.toggle}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`flexCheck-${cat.categoryName}`}
                    >
                      {cat.categoryName}
                    </label>
                  </div>
                </Col>
              </Row>
              {cat.subCategoriesList.map((subCat) => {
                return (
                  <React.Fragment
                    key={`chek-for-category-${cat.categoryName}-${subCat.name}`}
                  >
                    <Container>
                      <Row>
                        <Col>
                          <div className="form-check">
                            <input
                              className="form-check-input filter-check"
                              type="checkbox"
                              value={`${cat.categoryName} ${subCat.name}`}
                              id={`flexCheck-${cat.categoryName}-${subCat.name}`}
                              checked={
                                this.state.checkedList[
                                  `${cat.categoryName} ${subCat.name}`
                                ]
                              }
                              onChange={this.toggle}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`flexCheck-${cat.categoryName}-${subCat.name}`}
                            >
                              {subCat.name}
                            </label>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                    {subCat.children.map((child) => {
                      return (
                        <Container
                          key={`chek-for-category-${cat.categoryName}-${subCat.name}-${child}`}
                        >
                          <Row>
                            <Col>
                              <div className="form-check">
                                <input
                                  className="form-check-input filter-check"
                                  type="checkbox"
                                  value={`${cat.categoryName} ${subCat.name} ${child}`}
                                  id={`flexCheck-${cat.categoryName}-${subCat.name}-${child}`}
                                  checked={
                                    this.state.checkedList[
                                      `${cat.categoryName} ${subCat.name} ${child}`
                                    ]
                                  }
                                  onChange={this.toggle}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`flexCheck-${cat.categoryName}-${subCat.name}-${child}`}
                                >
                                  {child}
                                </label>
                              </div>
                            </Col>
                          </Row>
                        </Container>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        })}
      </Container>
    );
  };

  render(): JSX.Element {
    return (
      <li className="nav-item dropdown">
        <div className="dropdown-menu show" data-bs-popper="none">
          <Container>
            <Row>
              <Col>
                <div className="form-check">
                  <input
                    className="form-check-input filter-check"
                    type="checkbox"
                    value=""
                    id="flexCheck-all"
                    checked={this.state.chekAll}
                    onClick={this.toggleAll}
                    onChange={this.toggleAll}
                  />
                  <label className="form-check-label" htmlFor="flexCheck-all">
                    Все
                  </label>
                </div>
              </Col>
            </Row>
            <Row className={"check-category-scrolled"}>
              <Col>{this.getCategoryList()}</Col>
            </Row>
          </Container>
        </div>
      </li>
    );
  }
}
