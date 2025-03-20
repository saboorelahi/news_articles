export const FETCH_NEWS_REQUEST = "FETCH_NEWS_REQUEST";
export const FETCH_NEWS_SUCCESS = "FETCH_NEWS_SUCCESS";
export const FETCH_NEWS_FAILURE = "FETCH_NEWS_FAILURE";
import { LOADING_STATUS } from "../../enums/enums";

export interface NewsArticle {
  title: string;
  source: { name: string };
  publishedAt: string;
  description: string;
  url: string;
  urlToImage: string;
  dataSource: string
}

export interface NewsState {
  articles: NewsArticle[];
  error: string | null;
  status: LOADING_STATUS
}

interface FetchNewsRequestAction {
  type: typeof FETCH_NEWS_REQUEST;
}

interface FetchNewsSuccessAction {
  type: typeof FETCH_NEWS_SUCCESS;
  payload: NewsArticle[];
}

interface FetchNewsFailureAction {
  type: typeof FETCH_NEWS_FAILURE;
  payload: string;
}

export type NewsActionTypes =
  | FetchNewsRequestAction
  | FetchNewsSuccessAction
  | FetchNewsFailureAction;
