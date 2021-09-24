import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./Filter.css";

interface FilterProps {
  viewCountFn: (count: number) => Promise<void>;
  viewByDateFn: (from: number, to: number) => Promise<void>;
}

export default class TransactionsFilter extends React.Component<
  FilterProps,
  {
    dateFrom: string;
    dateTo: string;
    timeFrom: string;
    timeTo: string;
    count: number;
  }
> {
  constructor(props: FilterProps) {
    super(props);
    const date = new Date();
    const fromDate = new Date();
    fromDate.setTime(fromDate.getTime() - 30 * 24 * 3600000);
    this.state = {
      dateTo: `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(
        -2
      )}-${`0${date.getDate()}`.slice(-2)}`,
      timeTo: `${`0${date.getHours()}`.slice(
        -2
      )}:${`0${date.getMinutes()}`.slice(-2)}`,
      dateFrom: `${fromDate.getFullYear()}-${`0${
        fromDate.getMonth() + 1
      }`.slice(-2)}-${`0${fromDate.getDate()}`.slice(-2)}`,
      timeFrom: `${`0${fromDate.getHours()}`.slice(
        -2
      )}:${`0${fromDate.getMinutes()}`.slice(-2)}`,
      count: 20,
    };
  }

  onDateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.id === "filter-date-from") {
      this.setState({
        dateFrom: event.target.value,
      });
    }
    if (event.target.id === "filter-date-to") {
      this.setState({
        dateTo: event.target.value,
      });
    }
  };

  onTimeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.id === "filter-time-from") {
      this.setState({
        timeFrom: event.target.value,
      });
    }
    if (event.target.id === "filter-time-to") {
      this.setState({
        timeTo: event.target.value,
      });
    }
  };

  onCountChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const count = Number(event.target.value);
    if (
      Number.isNaN(count) ||
      event.target.value.includes(",") ||
      event.target.value.includes(".")
    ) {
      return;
    }
    this.setState({
      count,
    });
  };

  viewCount = async (): Promise<void> => {
    await this.props.viewCountFn(this.state.count);
  };

  viewByDate = async (): Promise<void> => {
    const dateStringFrom = this.state.dateFrom.split("-");
    const timeStringFrom = this.state.timeFrom.split(":");

    const dateStringTo = this.state.dateTo.split("-");
    const timeStringTo = this.state.timeTo.split(":");

    const dateFrom = new Date(
      Number(dateStringFrom[0]),
      Number(dateStringFrom[1]) - 1,
      Number(dateStringFrom[2]),
      Number(timeStringFrom[0]),
      Number(timeStringFrom[1])
    ).getTime();

    const dateTo = new Date(
      Number(dateStringTo[0]),
      Number(dateStringTo[1]) - 1,
      Number(dateStringTo[2]),
      Number(timeStringTo[0]),
      Number(timeStringTo[1])
    ).getTime();

    await this.props.viewByDateFn(dateFrom, dateTo);
  };

  render(): JSX.Element {
    return (
      <>
        <Row>
          <Col className={"col-filter-date"}>
            <div className="form-group row">
              <label
                htmlFor="operation-date"
                className="col-sm-2 col-form-label"
              >
                От:
              </label>
              <div className="col-sm-10 filter-date">
                <input
                  type="date"
                  className="form-control"
                  id="filter-date-from"
                  value={this.state.dateFrom}
                  onChange={this.onDateChange}
                />
              </div>
              <div className="col-sm-10 filter-time">
                <input
                  type="time"
                  id="filter-time-from"
                  className="form-control"
                  value={this.state.timeFrom}
                  onChange={this.onTimeChange}
                  required
                />
              </div>
            </div>
          </Col>
          <Col className={"col-filter-date"}>
            <div className="form-group row">
              <label
                htmlFor="filter-date-to"
                className="col-sm-2 col-form-label"
              >
                До:
              </label>
              <div className="col-sm-10 filter-date">
                <input
                  type="date"
                  className="form-control"
                  id="filter-date-to"
                  value={this.state.dateTo}
                  onChange={this.onDateChange}
                />
              </div>
              <div className="col-sm-10 filter-time">
                <input
                  type="time"
                  id="filter-time-to"
                  className="form-control"
                  value={this.state.timeTo}
                  onChange={this.onTimeChange}
                  required
                />
              </div>
            </div>
          </Col>
          <Col className={"filter-date"} onClick={this.viewByDate}>
            <Button>Найти</Button>
          </Col>
          <Col>
            <div className="form-group row">
              <label htmlFor="filter-count" className="col-sm-2 col-form-label">
                Количество:
              </label>
              <div className="col-sm-10 filter-count">
                <input
                  type="text"
                  id={"filter-count"}
                  value={this.state.count}
                  className="form-control"
                  onChange={this.onCountChange}
                  required={true}
                />
              </div>
            </div>
          </Col>
          <Col className={"filter-date"}>
            <Button
              className="btn btn-primary btn-filter-count"
              type="button"
              onClick={this.viewCount}
            >
              Показать
            </Button>
          </Col>
        </Row>
      </>
    );
  }
}
