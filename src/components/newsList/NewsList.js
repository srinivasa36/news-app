import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import NewsItem from "../newsItem/NewsItem";
import "./NewsList.css";

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("bitcoin");
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef();

  const fetchNews = async (page, query) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=10&apiKey=${process.env.REACT_APP_NEWS_API_KEY_NEW}`
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
    if (query) {
      setArticles([]);
      setPage(1);
      fetchNews(1, query);
    }
  }, [query]);

  useEffect(() => {
    if (page > 1) fetchNews(page, query);
  }, [page, query]);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchInput = event.target.elements.search;
    const searchTerm = searchInput.value.trim();
    if (searchTerm) setQuery(searchTerm);
    searchInput.value = "";
  };

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
    <div className="news-section">
      <form onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search news..." />
        <button type="submit">Search</button>
      </form>
      <div className="news-list">
        {articles.map((article, index) => (
          <NewsItem
            key={index}
            article={article}
            ref={index === articles.length - 1 ? lastNewsItemRef : null}
          />
        ))}
        {isLoading && <p>Loading more news...</p>}
      </div>
    </div>
  );
};

export default NewsList;
