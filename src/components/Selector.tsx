import React from "react";
import { Select } from "antd";

const { Option } = Select;

interface OptionType {
  value: string;
  label: string;
}

interface SelectorProps {
  placeholder: string;
  options: OptionType[];
  value: string | null;
  onChange: (value: string | null) => void;
}

const Selector: React.FC<SelectorProps> = ({ placeholder, options, value, onChange }) => {
  return (
    <Select
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      allowClear
      className="mb-4 w-full"
    >
      {options.map((o) => (
        <Option key={o.value} value={o.value}>
          {o.label}
        </Option>
      ))}
    </Select>
  );
};

export default Selector;
