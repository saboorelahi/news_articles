import React from "react";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";

interface DateSelectorProps {
  selectedDate: string | null;
  setSelectedDate: (value: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, setSelectedDate }) => {
  const formatDate = (date: Dayjs | null) => {
    if (date && date.isValid()) {
      const fDate = date.format("YYYY-MM-DD");
      setSelectedDate(fDate);
    } else {
      setSelectedDate(""); 
    }
  };

  return (
    <DatePicker
      className="mb-4 w-full"
      value={selectedDate ? dayjs(selectedDate) : null} 
      onChange={formatDate} 
      format="YYYY-MM-DD"
    />
  );
};

export default DateSelector;
