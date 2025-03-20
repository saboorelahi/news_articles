import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NewsArticle } from "./newsTypes";

const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

interface NewsApiResponse {
  articles: NewsArticle[];
}

export const fetchNews = createAsyncThunk<NewsArticle[]>(
  "news/fetchNews",
  async () => {
    try {
      const response = await axios.get<NewsApiResponse>(`${BASE_URL}/top-headlines`, {
        params: { country: "us", apiKey: NEWS_API_KEY },
      });
      return response.data.articles;
    } catch (err) {
      // show notification
    }
  }
);
