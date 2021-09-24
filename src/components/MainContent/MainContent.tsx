import React from "react";
import { connect } from "react-redux";
import { store } from "../../store/store";
import { getAllCategories } from "../../store/categoryReducer";
import {
  deleteUserTransaction,
  getAllUserTransactions,
  getLastNUserTransactions,
  getUsersTransactionsByDate,
  saveTransaction,
  updateUserTransaction,
} from "../../store/transactionsReducer";
import { ThunkProps } from "../ThunkTypes";
import { sortTransactionsBy } from "../FilterComponent/Sort";
import TransactionsFilter from "../FilterComponent/TransactionsFilter";

const mapStateToProps = (state: ReturnType<typeof store.getState>) => ({
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

class MainContent extends React.Component<
  DispatchPropsType,
  {
    categoryList: ExpCategory[];
    transactionsList: Transaction[];
  }
> {
  constructor(props: DispatchPropsType) {
    super(props);
    this.state = {
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

  render(): JSX.Element {
    return (
      <>
        <br />
        <h3>Ваша статистика:</h3>
        <TransactionsFilter
          viewCountFn={this.viewLastNTransactions}
          viewByDateFn={this.viewByDate}
        />
        <br />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
