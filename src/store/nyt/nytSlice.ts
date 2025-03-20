import { createSlice } from "@reduxjs/toolkit";
import { LOADING_STATUS } from "../../enums/enums";
import { fetchNYTNews } from "./nytActions";
import { NYTState } from "./nytTypes";

const initialState: NYTState = {
  articles: [],
  error: null,
  status: LOADING_STATUS.IDLE,
};

const nytSlice = createSlice({
  name: "nyt",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNYTNews.pending, (state) => {
        state.status = LOADING_STATUS.LOADING;
        state.error = null;
      })
      .addCase(fetchNYTNews.fulfilled, (state, action) => {
        state.status = LOADING_STATUS.SUCCEEDED;
        state.articles = action.payload.map(a => ({
          ...a, dataSource: 'nyt'
        }));
      })
      .addCase(fetchNYTNews.rejected, (state, action) => {
        state.status = LOADING_STATUS.FAILED;
        state.error = action.error.message || "Failed to fetch NYT news";
      });
  },
});

export default nytSlice.reducer;
