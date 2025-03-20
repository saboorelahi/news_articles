import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { NYTArticle } from "./nytTypes";

const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY;
const BASE_URL = "https://api.nytimes.com/svc/topstories/v2/home.json";

interface NYTApiResponse {
  results: NYTArticle[];
}

export const fetchNYTNews = createAsyncThunk("nyt/fetchNYTNews", async () => {
  try {
    const response = await axios.get<NYTApiResponse>(`${BASE_URL}`, {
      params: { "api-key": NYT_API_KEY },
    });
    return response.data.results;
  } catch (err) {
    // show notification
  }
});
