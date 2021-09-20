import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
  },
});
