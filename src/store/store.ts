import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import transactionsReducer from "./transactionsReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    transactions: transactionsReducer,
  },
});
