import React from "react";
import { Skeleton } from "antd";

interface LoaderProps {
  count?: number;
}

const Loader: React.FC<LoaderProps> = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton active key={index} />
      ))}
    </>
  );
};

export default Loader;
