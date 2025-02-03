import React, { useCallback, useEffect, useRef, useState } from "react";
import "./trendingNews.css";
import axios from "axios";
import NewsPopup from "../newsPopup/NewsPopup";

const TrendingNews = ({ noMarginTop }) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const observer = useRef();

  const fetchNews = async (page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=sports&page=${page}&pageSize=10&apiKey=${process.env.REACT_APP_NEWS_API_KEY_NEW}`
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

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  return (
    <div className={`trending-section ${noMarginTop ? "no-margin" : ""}`}>
      <h1>TRENDING</h1>
      <div className="trending-card">
        {articles.map((article, index) => (
          <div
            key={index}
            ref={index === articles.length - 1 ? lastNewsItemRef : null}
            className="news-card"
            onClick={() => setSelectedArticle(article)}
          >
            <h3>{index + 1 < 10 ? `0${index + 1}` : index + 1}</h3>
            <img src={article.urlToImage} alt="news-thumbnail" />
            <p className="desc">{article.description}</p>
          </div>
        ))}
      </div>

      {selectedArticle && (
        <NewsPopup
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {isLoading && <p className="loading">Loading more news...</p>}
    </div>
  );
};

export default TrendingNews;
