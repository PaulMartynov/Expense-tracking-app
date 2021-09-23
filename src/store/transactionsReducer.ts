import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  getAllTransactions,
  getLastNTransactions,
  getTransactionsByDate,
  updateTransaction,
} from "../api/firebase/database";

export const saveTransaction = createAsyncThunk<
  boolean,
  { userId: string; transaction: Transaction }
>("saveTransaction", async ({ userId, transaction }) => {
  const data = await addTransaction(userId, transaction);
  return data;
});

export const getAllUserTransactions = createAsyncThunk<
  Transaction[],
  { userId: string }
>("getAllUserTransactions", async ({ userId }) => {
  const data = await getAllTransactions(userId);
  return data;
});

export const getLastNUserTransactions = createAsyncThunk<
  Transaction[],
  { userId: string; n: number }
>("getLastNUserTransactions", async ({ userId, n }) => {
  const data = await getLastNTransactions(userId, n);
  return data;
});

export const getUsersTransactionsByDate = createAsyncThunk<
  Transaction[],
  { userId: string; start: number; end: number }
>("getUsersTransactionsByDate", async ({ userId, start, end }) => {
  const data = await getTransactionsByDate(userId, start, end);
  return data;
});

export const deleteUserTransaction = createAsyncThunk<
  boolean,
  { userId: string; uuid: string }
>("deleteUserTransaction", async ({ userId, uuid }) => {
  const data = await deleteTransaction(userId, uuid);
  return data;
});

export const updateUserTransaction = createAsyncThunk<
  boolean,
  { userId: string; transaction: Transaction }
>("updateUserTransaction", async ({ userId, transaction }) => {
  const data = await updateTransaction(userId, transaction);
  return data;
});

const initState: TransactionsState = {
  transactionsList: [],
  transactionsIsLoaded: false,
  transactionIsSaved: false,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveTransaction.pending, (state) => {
      state.transactionIsSaved = false;
    });
    builder.addCase(saveTransaction.rejected, (state) => {
      state.transactionIsSaved = false;
    });
    builder.addCase(saveTransaction.fulfilled, (state) => {
      state.transactionIsSaved = true;
    });

    builder.addCase(updateUserTransaction.pending, (state) => {
      state.transactionIsSaved = false;
    });
    builder.addCase(updateUserTransaction.rejected, (state) => {
      state.transactionIsSaved = false;
    });
    builder.addCase(updateUserTransaction.fulfilled, (state) => {
      state.transactionIsSaved = true;
    });

    builder.addCase(deleteUserTransaction.pending, (state) => {
      state.transactionIsSaved = false;
    });
    builder.addCase(deleteUserTransaction.rejected, (state) => {
      state.transactionIsSaved = false;
    });
    builder.addCase(deleteUserTransaction.fulfilled, (state) => {
      state.transactionIsSaved = true;
    });

    builder.addCase(getAllUserTransactions.pending, (state) => {
      state.transactionsIsLoaded = false;
    });
    builder.addCase(getAllUserTransactions.rejected, (state) => {
      state.transactionsIsLoaded = false;
    });
    builder.addCase(getAllUserTransactions.fulfilled, (state, action) => {
      state.transactionsList = action.payload;
      state.transactionsIsLoaded = true;
    });

    builder.addCase(getLastNUserTransactions.pending, (state) => {
      state.transactionsIsLoaded = false;
    });
    builder.addCase(getLastNUserTransactions.rejected, (state) => {
      state.transactionsIsLoaded = false;
    });
    builder.addCase(getLastNUserTransactions.fulfilled, (state, action) => {
      state.transactionsList = action.payload;
      state.transactionsIsLoaded = true;
    });

    builder.addCase(getUsersTransactionsByDate.pending, (state) => {
      state.transactionsIsLoaded = false;
    });
    builder.addCase(getUsersTransactionsByDate.rejected, (state) => {
      state.transactionsIsLoaded = false;
    });
    builder.addCase(getUsersTransactionsByDate.fulfilled, (state, action) => {
      state.transactionsList = action.payload;
      state.transactionsIsLoaded = true;
    });
  },
});

const { reducer } = transactionsSlice;

export default reducer;
