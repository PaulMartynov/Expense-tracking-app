import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getExpCategories, setExpCategory } from "../api/firebase/database";

export const getAllCategories = createAsyncThunk<ExpCategory[], string>(
  "getAllCategories",
  async (userId) => {
    const data = await getExpCategories(userId);
    return data;
  }
);

export const saveCategories = createAsyncThunk<
  ExpCategory[],
  { userId: string; categories: ExpCategory[] }
>("saveCategories", async ({ userId, categories }) => {
  const data = await setExpCategory(userId, { categories });
  return data;
});

const initState: CategoryState = {
  categoryList: [],
  isLoaded: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.pending, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categoryList = action.payload;
      state.isLoaded = true;
    });

    builder.addCase(saveCategories.pending, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(saveCategories.rejected, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(saveCategories.fulfilled, (state, action) => {
      state.categoryList = action.payload;
      state.isLoaded = true;
    });
  },
});

const { reducer } = categorySlice;

export default reducer;
