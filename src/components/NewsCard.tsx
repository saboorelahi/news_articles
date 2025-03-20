import React from "react";
import { Card, Typography } from "antd";

const { Meta } = Card;

interface NewsCardProps {
  article
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <Card
      hoverable
      cover={
        <img
          alt={article.title}
          src={article.urlToImage || article.multimedia?.[0]?.url || article.image || "https://picsum.photos/200/300"}
          className="h-80 object-cover rounded-t-lg"
        />
      }
      className="shadow-xl rounded-lg w-full text-left bg-white border"
    >
      <Meta
        title={article.title}
        description={
          <div>
            <Typography.Text type="secondary">
              {article.source?.name || article.byline} •{" "}
              {new Date(article.publishedAt || article.published_date).toDateString()}
            </Typography.Text>
            <p className="mt-2 text-lg">{article.abstract || article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Read More
            </a>
          </div>
        }
      />
    </Card>
  );
};

export default NewsCard;
