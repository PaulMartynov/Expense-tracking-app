import React from "react";
import { Col, Row } from "react-bootstrap";
import "./TransactionCard.css";

interface TransactionCardProps {
  transaction: Transaction;
}

export default class TransactionCard extends React.Component<
  TransactionCardProps,
  {
    isModalActive: boolean;
  }
> {
  constructor(props: TransactionCardProps) {
    super(props);
    this.state = {
      isModalActive: false,
    };
  }

  render(): JSX.Element {
    const date = new Date(this.props.transaction.date);
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear();
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    return (
      <Row className={`transaction`}>
        <Col
          className={"transaction-content"}
        >{`${day}.${month}.${year} ${hours}:${minutes}`}</Col>
        <Col
          className={`transaction-content transaction-type-${this.props.transaction.type}`}
        >
          {this.props.transaction.amount}
        </Col>
        <Col className={"transaction-content"}>
          {this.props.transaction.description}
        </Col>
        <Col>
          <span className="badge bg-primary transaction-category-card-item">
            {this.props.transaction.category}
          </span>
          <span className="badge bg-primary transaction-category-card-item">
            {this.props.transaction.subcategory}
          </span>
          <span className="badge bg-primary transaction-category-card-item">
            {this.props.transaction.childSubCategory}
          </span>
        </Col>
      </Row>
    );
  }
}
