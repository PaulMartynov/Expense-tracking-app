import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  getAllTransactions,
  getLastNTransactions,
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

const initState: TransactionsState = {
  transactionsList: [],
  isLoaded: false,
  isSaved: false,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveTransaction.pending, (state) => {
      state.isSaved = false;
    });
    builder.addCase(saveTransaction.rejected, (state) => {
      state.isSaved = false;
    });
    builder.addCase(saveTransaction.fulfilled, (state) => {
      state.isSaved = true;
    });

    builder.addCase(getAllUserTransactions.pending, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(getAllUserTransactions.rejected, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(getAllUserTransactions.fulfilled, (state, action) => {
      state.transactionsList = action.payload;
      state.isLoaded = true;
    });

    builder.addCase(getLastNUserTransactions.pending, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(getLastNUserTransactions.rejected, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(getLastNUserTransactions.fulfilled, (state, action) => {
      state.transactionsList = action.payload;
      state.isLoaded = true;
    });
  },
});

const { reducer } = transactionsSlice;

export default reducer;
