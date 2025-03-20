import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./news/newsSlice";
import nytReducer from "./nyt/nytSlice";
import GNewsReducer from "./g_news/gNewsSlice";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    nyt: nytReducer,
    g_news: GNewsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, thunk: true }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;