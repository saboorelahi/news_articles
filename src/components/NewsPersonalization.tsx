import React from "react";
import { Input } from "antd";
import Selector from "./Selector";

const dataSources = [
  { value: "news", label: "News API" },
  { value: "g_news", label: "G News API" },
  { value: "nyt", label: "NewYork Times" }
];

const newsCategories = [
  { value: "us", label: "US" },
  { value: "world", label: "World" },
  { value: "business", label: "Business" },
  { value: "science", label: "Science" },
  { value: "climate", label: "Climate" }
];

interface NewsPersonalizationProps {
  preferredSource: string | null;
  setPreferredSource: (value: string | null) => void;
  preferredCategory: string | null;
  setPreferredCategory: (value: string | null) => void;
  author: string;
  setAuthor: (value: string) => void;
}

const NewsPersonalization: React.FC<NewsPersonalizationProps> = ({
  preferredSource,
  setPreferredSource,
  preferredCategory,
  setPreferredCategory,
  author,
  setAuthor,
}) => {
  return (
    <div>
      <Selector
        placeholder="Preferred Source"
        options={dataSources.map((source) => ({
          value: source.value, 
          label: source.label, 
        }))}
        value={preferredSource}
        onChange={setPreferredSource}
      />

      <Selector
        placeholder="Preferred Category"
        options={newsCategories.map((source) => ({
          value: source.value, 
          label: source.label, 
        }))}
        value={preferredCategory}
        onChange={setPreferredCategory}
      />

      <Input
        placeholder="Preferred Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full"
      />
    </div>
  );
};

export default NewsPersonalization;
