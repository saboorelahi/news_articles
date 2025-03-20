import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "antd";
import dayjs from "dayjs";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import "tailwindcss/tailwind.css";

import { RootState, AppDispatch } from "../store/store";
import Filters from "../components/NewsFilters";
import Personalization from "../components/NewsPersonalization";
import Loader from "../components/Loader";
import NewsCard from "../components/NewsCard";
import { fetchNYTNews } from "../store/nyt/nytActions";
import { fetchNews } from "../store/news/newsActions";
import { fetchGNews } from "../store/g_news/gNewsActions";
import { NewsArticle } from "../store/news/newsTypes";
import { NYTArticle } from "../store/nyt/nytTypes";
import { GNewsArticle } from "../store/g_news/gNewsTypes";
import { LOADING_STATUS } from "../enums/enums";

const NewsFeed: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const news = useSelector((state: RootState) => state.news);
  const nyt = useSelector((state: RootState) => state.nyt);
  const gNews = useSelector((state: RootState) => state.g_news);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [preferredSource, setPreferredSource] = useState<string | null>(null);
  const [preferredCategory, setPreferredCategory] = useState<string | null>(null);
  const [author, setAuthor] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  useEffect(() => {
    dispatch(fetchNews());
    dispatch(fetchNYTNews());
    // dispatch(fetchGNews());    // max 100 times a day
  }, [dispatch]);

  const isNewsAPIArticle = (article: NewsArticle | NYTArticle | GNewsArticle): article is NewsArticle => {
    return article.dataSource == 'news';
  };

  const isGNewsAPIArticle = (article: NewsArticle | NYTArticle | GNewsArticle): article is GNewsArticle => {
    return article.dataSource == 'g_news';
  };

  const isNYTArticle = (article: NewsArticle | NYTArticle | GNewsArticle): article is NYTArticle => {
    return article.dataSource == 'nyt';
  };
  
  const filteredArticles = [...news.articles, ...nyt.articles /*...gNews.articles*/].filter((article) => {
    if (!article) return false;

    let articleTitle = "";
    let articleDate = "";
    let articleCategory = "";
    let articleSource = "";
    let articleAuthor = "";

    articleSource = article.dataSource || "";
    if (isNewsAPIArticle(article)) {
      articleTitle = article.title?.toLowerCase() || "";
      articleDate = article.publishedAt || "";
      articleAuthor = article.source?.name.toLowerCase() || "";
    } else if (isGNewsAPIArticle(article)) {
      articleTitle = article.title?.toLowerCase() || "";
      articleDate = article.publishedAt || "";
      articleAuthor = article.source?.name.toLowerCase() || "";
    } else if (isNYTArticle(article)) {
      articleTitle = article.title?.toLowerCase() || "";
      articleDate = article.published_date || "";
      articleAuthor = article.byline?.toLowerCase() || "";
      articleCategory = article.section || "";
    }

    const isSearchTermFound = !searchTerm || articleTitle.includes(searchTerm.toLowerCase());
    const isDateMatched = !selectedDate || (articleDate && dayjs(dayjs(articleDate).format('YYYY-MM-DD')).isSame(dayjs(selectedDate)));
    const isSourceMatched = !selectedSource || articleSource === selectedSource;

    const isPreferredSourceMatched = !preferredSource || articleSource === preferredSource;
    const isPreferredCategoryMatched = !preferredCategory || articleCategory === preferredCategory;
    const isAuthorMatched = !author || articleAuthor.includes(author.toLowerCase());

    return (
      isSearchTermFound &&
      isDateMatched &&
      isSourceMatched &&
      isPreferredSourceMatched &&
      isPreferredCategoryMatched &&
      isAuthorMatched
    );
  });
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex">
      <aside className={`w-72 bg-white shadow-md p-6 sticky top-0 h-screen flex flex-col gap-8 ${isFilterVisible ? 'block' : 'hidden'} md:block`}>
        <header className="flex justify-between items-center mb-4">
          <Typography.Title level={4}>Filters</Typography.Title>
          <button className="md:hidden" onClick={() => setIsFilterVisible(false)}>
            <CloseOutlined className="text-lg" />
          </button>
        </header>

        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSource={selectedSource}
          setSelectedSource={setSelectedSource}
        />

        <div className="border-t border-gray-300 my-4 mb-6"></div>

        <header className="mb-4">
          <Typography.Title level={4}>Personalization</Typography.Title>
        </header>

        <Personalization
          preferredSource={preferredSource}
          setPreferredSource={setPreferredSource}
          preferredCategory={preferredCategory}
          setPreferredCategory={setPreferredCategory}
          author={author}
          setAuthor={setAuthor}
        />
      </aside>

      <button className="md:hidden fixed top-4 left-4 bg-blue-500 text-white p-2 rounded-full" onClick={() => setIsFilterVisible(!isFilterVisible)}>
        {!isFilterVisible ? <MenuOutlined className="text-lg" /> : null}
      </button>

      <main className="flex-1 px-6">
        <header className="text-center mb-6">
          <Typography.Title level={2}>📰 Latest News</Typography.Title>
        </header>
        <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto md:w-[80%] sm:w-[90%]">
          {(news.status === LOADING_STATUS.LOADING || nyt.status === LOADING_STATUS.LOADING || gNews.status === LOADING_STATUS.LOADING) ? (
            <Loader />
          ) : (
            filteredArticles.map((article, index) => <NewsCard key={index} article={article} />)
          )}
        </section>
      </main>
    </div>
  );
};

export default NewsFeed;
