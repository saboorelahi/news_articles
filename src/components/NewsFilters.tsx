import React from "react";
import { Input } from "antd";
import DateSelector from "./DateSelector";
import Selector from "./Selector";

const dataSources = [
  { value: "news", label: "News API" },
  { value: "g_news", label: "G News API" },
  { value: "nyt", label: "NewYork Times" }
];

interface NewsFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedDate: string | null;
  setSelectedDate: (value: string | any) => void;
  selectedCategory: string | null;
  setSelectedCategory: (value: string | null) => void;
  selectedSource: string | null;
  setSelectedSource: (value: string | null) => void;
}

const NewsFilters: React.FC<NewsFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedDate,
  setSelectedDate,
  selectedSource,
  setSelectedSource,
}) => {
  return (
    <div>
      <Input
        placeholder="Search news..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full"
      />
      
      <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      <Selector
        placeholder="Select Source"
        options={dataSources.map((source) => ({
          value: source.value, 
          label: source.label, 
        }))}
        value={selectedSource}
        onChange={(s) => { setSelectedSource(s) }}
      />
    </div>
  );
};

export default NewsFilters;
