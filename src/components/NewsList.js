import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import NewsItem from "./NewsItem";
import "./NewsList.css";

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef();

  const fetchNews = async (page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=bitcoin&page=${page}&pageSize=10&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      );
      setArticles((prevArticles) => [
        ...prevArticles,
        ...response.data.articles,
      ]);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNews(page);
  }, [page]);

  const lastNewsItemRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  return (
    <div className="news-list">
      {articles.map((article, index) => (
        <div
          key={index}
          ref={index === articles.length - 1 ? lastNewsItemRef : null}
        >
          <NewsItem article={article} />
        </div>
      ))}
      {isLoading && <p>Loading more news...</p>}
    </div>
  );
};

export default NewsList;
