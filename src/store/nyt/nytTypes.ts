export const FETCH_NYT_NEWS_REQUEST = "FETCH_NYT_NEWS_REQUEST";
export const FETCH_NYT_NEWS_SUCCESS = "FETCH_NYT_NEWS_SUCCESS";
export const FETCH_NYT_NEWS_FAILURE = "FETCH_NYT_NEWS_FAILURE";
import { LOADING_STATUS } from "../../enums/enums";

export interface NYTArticle {
  title: string;
  byline: string;
  published_date: string;
  abstract: string;
  url: string;
  multimedia?: { url: string }[];
  source: string;
  section: string;
  dataSource: string;
}

export interface NYTState {
  articles: NYTArticle[];
  status: LOADING_STATUS
  error: string | null;
}

interface FetchNYTNewsRequestAction {
  type: typeof FETCH_NYT_NEWS_REQUEST;
}

interface FetchNYTNewsSuccessAction {
  type: typeof FETCH_NYT_NEWS_SUCCESS;
  payload: NYTArticle[];
}

interface FetchNYTNewsFailureAction {
  type: typeof FETCH_NYT_NEWS_FAILURE;
  payload: string;
}

export type NYTNewsActionTypes =
  | FetchNYTNewsRequestAction
  | FetchNYTNewsSuccessAction
  | FetchNYTNewsFailureAction;
