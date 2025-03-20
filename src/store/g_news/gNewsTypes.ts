export const FETCH_GNEWS_REQUEST = "FETCH_GNEWS_REQUEST";
export const FETCH_GNEWS_SUCCESS = "FETCH_GNEWS_SUCCESS";
export const FETCH_GNEWS_FAILURE = "FETCH_GNEWS_FAILURE";
import { LOADING_STATUS } from "../../enums/enums";

export interface GNewsArticle {
    title: string;
    description: string;
    content?: string;
    url: string;
    image?: string;
    publishedAt: string;
    source: {
      name: string;
      url: string;
    };
    dataSource: string
  }
  
export interface GNewsState {
  articles: GNewsArticle[];
  error: string | null;
  status: LOADING_STATUS
}

interface FetchGNewsRequestAction {
  type: typeof FETCH_GNEWS_REQUEST;
}

interface FetchGNewsSuccessAction {
  type: typeof FETCH_GNEWS_SUCCESS;
  payload: GNewsArticle[];
}

interface FetchGNewsFailureAction {
  type: typeof FETCH_GNEWS_FAILURE;
  payload: string;
}

export type GNewsActionTypes =
  | FetchGNewsRequestAction
  | FetchGNewsSuccessAction
  | FetchGNewsFailureAction;
