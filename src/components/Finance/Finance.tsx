import React from "react";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { store } from "../../store/store";
import { getAllCategories } from "../../store/categoryReducer";
import {
  getAllUserTransactions,
  getLastNUserTransactions,
  saveTransaction,
} from "../../store/transactionsReducer";
import { ThunkProps } from "../ThunkTypes";
import "./Finance.css";
import NewTransactionPopup from "./FinancePopup/NewTransactionPopup";

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
      transactionsList: [...this.props.transactionsList],
    };
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
      } catch (err) {
        console.log(err);
      }
    }
  };

  render(): JSX.Element {
    return (
      <>
        <h3>Расходы/Зачисления:</h3>
        {this.state.modalActive ? (
          <NewTransactionPopup
            active={this.state.modalActive}
            setActive={this.setModalActive}
            categoryList={this.state.categoryList}
            saveFn={this.addNewTransaction}
          />
        ) : null}
        <div>
          <div className={"add-transaction-card-btn"}>
            <Button onClick={this.setModalActive} id="add-category-btn">
              Добавить
            </Button>
          </div>
          <div className={"transactions-list"}>
            {this.state.transactionsList.map((value, index) => (
              <React.Fragment key={`transaction-id-${index}`}>
                <p>{value.description}</p>
              </React.Fragment>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Finance);
