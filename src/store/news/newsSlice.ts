import { createSlice } from "@reduxjs/toolkit";
import { LOADING_STATUS } from "../../enums/enums";
import { fetchNews } from "./newsActions";
import { NewsState } from "./newsTypes";

const initialState: NewsState = {
  articles: [],
  status: LOADING_STATUS.IDLE,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = LOADING_STATUS.LOADING;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = LOADING_STATUS.SUCCEEDED;
        state.articles = action.payload.map(a => ({
          ...a, dataSource: 'news'
        }));
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = LOADING_STATUS.FAILED;
        state.error = action.error.message || "Failed to fetch news";
      });
  },
});

export default newsSlice.reducer;
