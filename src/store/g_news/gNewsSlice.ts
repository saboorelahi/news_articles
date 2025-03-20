import { createSlice } from "@reduxjs/toolkit";
import { LOADING_STATUS } from "../../enums/enums";
import { fetchGNews } from "./gNewsActions";
import { GNewsState } from "./gNewsTypes";

const initialState: GNewsState = {
  articles: [],
  status: LOADING_STATUS.IDLE,
  error: null,
};

const gNewsSlice = createSlice({
  name: "g_news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGNews.pending, (state) => {
        state.status = LOADING_STATUS.LOADING;
      })
      .addCase(fetchGNews.fulfilled, (state, action) => {
        state.status = LOADING_STATUS.SUCCEEDED;
        state.articles = action.payload.map(a => ({
          ...a, dataSource: 'g_news'
        }));
      })
      .addCase(fetchGNews.rejected, (state, action) => {
        state.status = LOADING_STATUS.FAILED;
        state.error = action.error.message || "Failed to fetch g news";
      });
  },
});

export default gNewsSlice.reducer;
