import React from "react";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { Button, Container } from "react-bootstrap";
import { getAllCategories } from "../../store/categoryReducer";
import {
  deleteUserTransaction,
  getAllUserTransactions,
  getLastNUserTransactions,
  getUsersTransactionsByDate,
  saveTransaction,
  updateUserTransaction,
} from "../../store/transactionsReducer";
import { ReturnState, ThunkProps } from "../ThunkTypes";
import "./Finance.css";
import NewTransactionPopup from "./FinancePopup/NewTransactionPopup";
import TransactionCard from "./TransactionCard/TransactionCard";
import TransactionsFilter from "../FilterComponent/TransactionsFilterComponent/TransactionsFilter";
import { sortTransactionsBy } from "../FilterComponent/Sort";
import CategoryFilter from "../FilterComponent/CategoryFilterComponent/CategoryFilter";

const mapStateToProps = (state: ReturnState) => ({
  userId: state.auth.userId,
  categoryList: state.category.categoryList,
  categoriesIsLoaded: state.category.isLoaded,
  transactionsList: state.transactions.transactionsList,
  transactionsIsLoaded: state.transactions.transactionsIsLoaded,
  transactionIsSaved: state.transactions.transactionIsSaved,
});

const mapDispatchToProps = {
  getAllCategories,
  saveTransaction,
  getAllUserTransactions,
  getLastNUserTransactions,
  getUsersTransactionsByDate,
  deleteUserTransaction,
  updateUserTransaction,
};

export type DispatchPropsType = ReturnType<typeof mapStateToProps> &
  ThunkProps<typeof mapDispatchToProps>;

class Finance extends React.Component<
  DispatchPropsType,
  {
    modalActive: boolean;
    categoryList: ExpCategory[];
    transactionsList: Transaction[];
  }
> {
  constructor(props: DispatchPropsType) {
    super(props);
    this.state = {
      modalActive: false,
      categoryList: [...this.props.categoryList],
      transactionsList: sortTransactionsBy("DATE-FROM-NEW", [
        ...this.props.transactionsList,
      ]),
    };
  }

  viewLastNTransactions = async (count: number): Promise<void> => {
    if (this.props.userId) {
      try {
        await this.props.getLastNUserTransactions({
          userId: this.props.userId,
          n: count,
        });
        this.setState({
          transactionsList: sortTransactionsBy("DATE-FROM-NEW", [
            ...this.props.transactionsList,
          ]),
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  viewByDate = async (from: number, to: number): Promise<void> => {
    if (this.props.userId) {
      try {
        await this.props.getUsersTransactionsByDate({
          userId: this.props.userId,
          start: from,
          end: to,
        });
        this.setState({
          transactionsList: sortTransactionsBy("DATE-FROM-NEW", [
            ...this.props.transactionsList,
          ]),
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  componentDidUpdate(prevProps: Readonly<DispatchPropsType>) {
    if (
      prevProps.categoryList !== this.props.categoryList ||
      prevProps.transactionsList !== this.props.transactionsList
    ) {
      this.setState({
        categoryList: [...this.props.categoryList],
        transactionsList: sortTransactionsBy("DATE-FROM-NEW", [
          ...this.props.transactionsList,
        ]),
      });
    }
  }

  override async componentDidMount(): Promise<void> {
    if (this.props.userId) {
      try {
        await this.props.getAllCategories(this.props.userId);
        await this.props.getLastNUserTransactions({
          userId: this.props.userId,
          n: 20,
        });
        this.setState({
          categoryList: [...this.props.categoryList],
          transactionsList: sortTransactionsBy("DATE-FROM-NEW", [
            ...this.props.transactionsList,
          ]),
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  setModalActive = (): void => {
    this.setState({ modalActive: !this.state.modalActive });
  };

  addNewTransaction = async (data: TransactionData): Promise<void> => {
    this.setState({ modalActive: !this.state.modalActive });
    if (this.props.userId) {
      const newTransaction: Transaction = { ...data, uuid: uuidv4() };
      try {
        await this.props.saveTransaction({
          userId: this.props.userId,
          transaction: newTransaction,
        });
        await this.viewLastNTransactions(20);
      } catch (err) {
        console.log(err);
      }
    }
  };

  deleteTransaction = async (uuid: string): Promise<void> => {
    if (this.props.userId) {
      try {
        await this.props.deleteUserTransaction({
          userId: this.props.userId,
          uuid,
        });
        await this.viewLastNTransactions(20);
      } catch (err) {
        console.log(err);
      }
    }
  };

  updateTransaction = async (transaction: Transaction): Promise<void> => {
    if (this.props.userId) {
      try {
        await this.props.updateUserTransaction({
          userId: this.props.userId,
          transaction,
        });
        await this.viewLastNTransactions(20);
      } catch (err) {
        console.log(err);
      }
    }
  };

  filterTransactions = (list: Transaction[]): void => {
    this.setState({
      transactionsList: list,
    });
  };

  resetFilter = (): void => {
    this.setState({
      transactionsList: sortTransactionsBy("DATE-FROM-NEW", [
        ...this.props.transactionsList,
      ]),
    });
  };

  render(): JSX.Element {
    return (
      <>
        <br />
        <h3>Расходы/Зачисления:</h3>
        {this.state.modalActive ? (
          <NewTransactionPopup
            active={this.state.modalActive}
            setActive={this.setModalActive}
            categoryList={this.state.categoryList}
            saveFn={this.addNewTransaction}
          />
        ) : null}
        <TransactionsFilter
          viewCountFn={this.viewLastNTransactions}
          viewByDateFn={this.viewByDate}
        />
        <br />
        <CategoryFilter
          categoryList={this.props.categoryList}
          transactionsList={this.props.transactionsList}
          filterTransactions={this.filterTransactions}
          resetFilter={this.resetFilter}
        />
        <br />
        <div>
          <div className={"add-transaction-card-btn"}>
            <Button
              onClick={this.setModalActive}
              id="add-category-btn"
              data-testid={"add-category-btn"}
            >
              Добавить
            </Button>
          </div>
          <div className={"transactions-list"}>
            <Container>
              {this.state.transactionsList.map((value, index) => (
                <React.Fragment key={`transaction-id-${index}`}>
                  <TransactionCard
                    transaction={value}
                    categoryList={this.state.categoryList}
                    deleteFn={this.deleteTransaction}
                    saveFn={this.updateTransaction}
                  />
                </React.Fragment>
              ))}
            </Container>
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Finance);
