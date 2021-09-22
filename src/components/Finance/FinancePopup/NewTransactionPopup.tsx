import React from "react";
import { Button } from "react-bootstrap";
import Modal from "../../ModalComponent/Modal";
import "./TransactionsPopup.css";

interface popupProps {
  active: boolean;
  setActive: () => void;
  categoryList: ExpCategory[];
  saveFn: (data: TransactionData) => Promise<void>;
}

export default class NewTransactionPopup extends React.Component<
  popupProps,
  {
    description: string;
    date: string;
    time: string;
    amount: number;
    category: string;
    subcategory: string;
    childSubCategory: string;
    expense: boolean;
    income: boolean;
  }
> {
  constructor(props: popupProps) {
    super(props);
    const date = new Date();
    const month = `${date.getMonth() + 1}`;
    this.state = {
      description: "",
      date: `${date.getFullYear()}-${
        month.length === 2 ? month : `0${month}`
      }-${date.getDate()}`,
      time: `${date.getHours()}:${date.getMinutes()}`,
      amount: 0,
      category: "",
      subcategory: "",
      childSubCategory: "",
      expense: true,
      income: false,
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

  render(): JSX.Element {
    return (
      <Modal
        title={"Добавить новую операцию"}
        active={this.props.active}
        setActive={this.props.setActive}
        children={
          <>
            <div className="modal-body">
              <div className="form-group row">
                <label
                  htmlFor="operation-description"
                  className="col-sm-2 col-form-label"
                >
                  Описание:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id={"operation-description"}
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                    placeholder={"Добавьте описание"}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="operation-date"
                  className="col-sm-2 col-form-label"
                >
                  Дата:
                </label>
                <div className="col-sm-10 operation-date">
                  <input
                    type="date"
                    className="form-control"
                    id="operation-date"
                    value={this.state.date.toString()}
                    onChange={this.onDateChange}
                  />
                </div>
                <label
                  htmlFor="operation-time"
                  className="col-sm-2 col-form-label"
                >
                  Время:
                </label>
                <div className="col-sm-10 operation-time">
                  <input
                    type="time"
                    id="operation-time"
                    className="form-control"
                    value={this.state.time}
                    onChange={this.onTimeChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="operation-amount"
                  className="col-sm-2 col-form-label"
                >
                  Сумма:
                </label>
                <div className="col-sm-10 operation-amount">
                  <input
                    type="number"
                    className="form-control"
                    id={"operation-amount"}
                    value={this.state.amount}
                    step={0.01}
                    min={0}
                    onChange={this.changeAmount}
                  />
                </div>
              </div>
              <div className="form-group row operation-type">
                <label className="col-sm-2 col-form-label">Тип:</label>
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
                      checked={this.state.expense}
                      onChange={this.onTypeChange}
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="btnradio1"
                    >
                      Расход
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="btnradio"
                      id="btnradio2"
                      autoComplete="off"
                      checked={this.state.income}
                      onChange={this.onTypeChange}
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="btnradio2"
                    >
                      Зачисление
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <Button className="btn btn-primary">Сохранить</Button>
              <Button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={this.props.setActive}
              >
                Закрыть
              </Button>
            </div>
          </>
        }
      />
    );
  }
}
