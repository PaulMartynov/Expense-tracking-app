import React from "react";
import { Col, Row } from "react-bootstrap";
import "./TransactionCard.css";
import EditTransactionPopup from "../FinancePopup/EditTransactionPopup";

interface TransactionCardProps {
  transaction: Transaction;
  categoryList: ExpCategory[];
  deleteFn: (uuid: string) => Promise<void>;
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

  setModalActive = (): void => {
    this.setState({ isModalActive: !this.state.isModalActive });
  };

  deleteCard = async (uuid: string): Promise<void> => {
    this.setState({ isModalActive: !this.state.isModalActive });
    await this.props.deleteFn(uuid);
  };

  render(): JSX.Element {
    const date = new Date(this.props.transaction.date);
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear();
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    return (
      <Row className={`transaction`} onClick={this.setModalActive}>
        {this.state.isModalActive ? (
          <EditTransactionPopup
            active={this.state.isModalActive}
            setActive={this.setModalActive}
            categoryList={this.props.categoryList}
            transaction={this.props.transaction}
            deleteFn={this.deleteCard}
          />
        ) : null}
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
        <Col className={"transaction-content-categories"}>
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
