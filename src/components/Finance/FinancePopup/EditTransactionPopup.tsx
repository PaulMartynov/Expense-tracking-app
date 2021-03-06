import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import Modal from "../../ModalComponent/Modal";
import "./TransactionsPopup.css";

interface popupProps {
  active: boolean;
  setActive: () => void;
  categoryList: ExpCategory[];
  transaction: Transaction;
  saveFn: (data: Transaction) => Promise<void>;
  deleteFn: (uuid: string) => Promise<void>;
}

export default class EditTransactionPopup extends React.Component<
  popupProps,
  {
    description: string;
    date: string;
    time: string;
    amount: number;
    category: ExpCategory;
    subcategory: SubCategories;
    childCategories: string[];
    selectedSubCat: string;
    selectedChild: string;
    expense: boolean;
    income: boolean;
  }
> {
  constructor(props: popupProps) {
    super(props);
    const date = new Date(this.props.transaction.date);
    const category = this.props.categoryList.filter(
      (item) => item.categoryName === this.props.transaction.category
    )[0];
    const subcategory =
      category?.subCategoriesList.filter(
        (item) => item.name === this.props.transaction.subcategory
      )[0] ?? null;
    this.state = {
      description: this.props.transaction.description,
      date: `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(
        -2
      )}-${`0${date.getDate()}`.slice(-2)}`,
      time: `${`0${date.getHours()}`.slice(-2)}:${`0${date.getMinutes()}`.slice(
        -2
      )}`,
      amount: this.props.transaction.amount,
      category,
      subcategory,
      childCategories: subcategory?.children,
      selectedSubCat: this.props.transaction.subcategory ?? "",
      selectedChild: this.props.transaction.childSubCategory ?? "",
      expense: this.props.transaction.type === "expense",
      income: this.props.transaction.type === "income",
    };
  }

  onDateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      date: event.target.value,
    });
  };

  onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      description: event.target.value,
    });
  };

  onTimeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      time: event.target.value,
    });
  };

  changeAmount = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      amount: Number(event.target.value),
    });
  };

  onTypeChange = (): void => {
    this.setState({
      income: !this.state.income,
      expense: !this.state.expense,
    });
  };

  onChangeOption = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const cat =
      this.props.categoryList.filter(
        (item) => item.categoryName === event.target.value
      )[0] ?? this.props.categoryList[0];
    this.setState({
      category: cat,
      subcategory: cat?.subCategoriesList[0],
      childCategories: cat?.subCategoriesList[0]?.children,
      selectedSubCat: "",
      selectedChild: "",
    });
  };

  onChangeSubCategory = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    if (this.state.category) {
      const subCat = this.state.category.subCategoriesList.filter(
        (item) => item.name === event.target.value
      )[0];
      this.setState({
        subcategory: subCat,
        childCategories: subCat?.children,
        selectedSubCat: subCat.name ?? "",
        selectedChild: "",
      });
    }
  };

  onChangeChild = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    this.setState({
      selectedChild: event.target.value,
    });
  };

  getCategories = (): JSX.Element[] => {
    if (this.props.categoryList.length <= 0) {
      return [
        <option key={`category-option-no-option`}>
          * ?????? ?????????????????? ?????????????????? *
        </option>,
      ];
    }
    return this.props.categoryList.map((category, index) => (
      <React.Fragment key={`category-option-${index}`}>
        <option id={`category-option-${index}`}>{category.categoryName}</option>
      </React.Fragment>
    ));
  };

  getSubCategories = (): JSX.Element[] => {
    if (!this.state.category) {
      return [];
    }
    return this.state.category.subCategoriesList.map((subCat, ind) => (
      <React.Fragment key={`sub-cat-option-${ind}`}>
        <option id={`sub-cat-option-${ind}`}>{subCat.name}</option>
      </React.Fragment>
    ));
  };

  getSubCategoryChildrens = (): JSX.Element[] => {
    if (!this.state.childCategories) {
      return [];
    }
    return this.state.childCategories.map((item, i) => (
      <React.Fragment key={`sub-cat-child-option-${i}`}>
        <option id={`sub-cat-child-option-${i}`}>{item}</option>
      </React.Fragment>
    ));
  };

  saveTransaction = async (): Promise<void> => {
    if (this.state.description === "" || !this.state.category) {
      return;
    }
    const dateString = this.state.date.split("-");
    const timeString = this.state.time.split(":");
    const date = new Date(
      Number(dateString[0]),
      Number(dateString[1]) - 1,
      Number(dateString[2]),
      Number(timeString[0]),
      Number(timeString[1])
    ).getTime();
    const transaction: Transaction = {
      description: this.state.description,
      date,
      amount: this.state.amount,
      type: this.state.expense ? "expense" : "income",
      category: this.state.category.categoryName,
      subcategory: this.state.selectedSubCat,
      childSubCategory: this.state.selectedChild,
      uuid: this.props.transaction.uuid,
    };
    await this.props.saveFn(transaction);
  };

  render(): JSX.Element {
    return (
      <Modal
        title={"???????????????? ????????????"}
        active={this.props.active}
        setActive={this.props.setActive}
        children={
          <>
            <div className="modal-body" data-testid={`modal-transaction-body`}>
              <Row>
                <Col className={"row-label"}>
                  <label
                    htmlFor="operation-description"
                    className="col-sm-2 col-form-label"
                  >
                    ????????????????:
                  </label>
                </Col>
                <Col>
                  <input
                    type="text"
                    className="form-control description-input"
                    id={"operation-description"}
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                    data-testid={`modal-transaction-description-input`}
                    placeholder={"???????????????? ????????????????"}
                  />
                </Col>
              </Row>
              <Row>
                <Col className={"row-label"}>
                  <label
                    htmlFor="operation-date"
                    className="col-sm-2 col-form-label"
                  >
                    ????????:
                  </label>
                </Col>
                <Col>
                  <div className="col-sm-10 operation-date">
                    <input
                      type="date"
                      className="form-control"
                      id="operation-date"
                      data-testid={`modal-transaction-date`}
                      value={this.state.date.toString()}
                      onChange={this.onDateChange}
                    />
                  </div>
                  <div className="col-sm-10 operation-date">
                    <input
                      type="time"
                      id="operation-time"
                      className="form-control"
                      data-testid={`modal-transaction-time`}
                      value={this.state.time}
                      onChange={this.onTimeChange}
                      required
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className={"row-label"}>
                  <label
                    htmlFor="operation-amount"
                    className="col-sm-2 col-form-label"
                  >
                    ??????????:
                  </label>
                </Col>
                <Col>
                  <div className="col-sm-10 operation-amount">
                    <input
                      type="number"
                      className="form-control"
                      id={"operation-amount"}
                      data-testid={`modal-transaction-amount`}
                      value={this.state.amount}
                      step={0.01}
                      min={0}
                      onChange={this.changeAmount}
                      required={true}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className={"row-label"}>
                  <label className="col-sm-2 col-form-label">??????:</label>
                </Col>
                <Col>
                  <div className="col-sm-10">
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic radio toggle button group"
                    >
                      <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio1"
                        autoComplete="off"
                        data-testid={`modal-transaction-expense`}
                        checked={this.state.expense}
                        onChange={this.onTypeChange}
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="btnradio1"
                      >
                        ????????????
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio2"
                        data-testid={`modal-transaction-income`}
                        autoComplete="off"
                        checked={this.state.income}
                        onChange={this.onTypeChange}
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="btnradio2"
                      >
                        ????????????????????
                      </label>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className={"row-label"}>
                  <label
                    htmlFor="category-select"
                    className="col-sm-2 col-form-label"
                  >
                    ??????????????????:
                  </label>
                </Col>
                <Col>
                  <div className="col-sm-10 operation-type operation-category">
                    <select
                      className="form-control"
                      id="category-select"
                      data-testid={`modal-transaction-select-cat`}
                      onChange={this.onChangeOption}
                    >
                      {this.getCategories()}
                    </select>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className={"row-label"}>
                  <label
                    htmlFor="category-select"
                    className="col-sm-2 col-form-label"
                  >
                    ????????????????????????:
                  </label>
                </Col>
                <Col>
                  <div className="col-sm-10 operation-type operation-category">
                    <select
                      className="form-control"
                      id="category-select"
                      data-testid={`modal-transaction-select-sub-cat`}
                      onChange={this.onChangeSubCategory}
                    >
                      <option key={`sub-category-option-no-option`} />
                      {this.getSubCategories()}
                    </select>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className={"row-label"}>
                  <label
                    htmlFor="category-select"
                    className="col-sm-2 col-form-label"
                  >
                    ????????????????????????-2:
                  </label>
                </Col>
                <Col>
                  <div className="col-sm-10 operation-type operation-category">
                    <select
                      className="form-control"
                      id="category-select"
                      data-testid={`modal-transaction-select-sub-child`}
                      onChange={this.onChangeChild}
                    >
                      <option key={`sub-child-category-option-no-option`} />
                      {this.getSubCategoryChildrens()}
                    </select>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="modal-footer">
              <Button
                className="btn btn-primary"
                data-testid={`modal-transaction-save-btn`}
                onClick={this.saveTransaction}
              >
                ??????????????????
              </Button>
              <Button
                className="btn btn-danger"
                data-testid={`modal-transaction-del-btn`}
                onClick={async () => {
                  await this.props.deleteFn(this.props.transaction.uuid);
                }}
              >
                ??????????????
              </Button>
              <Button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                data-testid={`modal-transaction-close-btn`}
                onClick={this.props.setActive}
              >
                ??????????????
              </Button>
            </div>
          </>
        }
      />
    );
  }
}
