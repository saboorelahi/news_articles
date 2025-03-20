import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GNewsArticle } from "./gNewsTypes";

const G_NEWS_API_KEY = process.env.REACT_APP_G_NEWS_API_KEY; 
const BASE_URL = "https://gnews.io/api/v4";

interface GNewsApiResponse {
  articles: GNewsArticle[];
}

export const fetchGNews = createAsyncThunk<GNewsArticle[]>(
  "news/fetchNews",
  async () => {
    const response = await axios.get<GNewsApiResponse>(`${BASE_URL}/top-headlines`, {
      params: { q: "technology", country: "us", category: "technology", token: G_NEWS_API_KEY }, 
    });
    return response.data.articles;
  }
);
