import React, { useState } from "react";
import NewsPopup from "./NewsPopup";
import "./NewsItem.css";

const NewsItem = ({ article }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div
      className={`news-item ${showPopup ? "no-hover" : ""}`}
      onClick={() => setShowPopup(true)}
    >
      <img src={article.urlToImage} alt="news-thumbnail" />
      <h3>{article.title}</h3>
      <p>
        By, <strong>{article.author}</strong>
      </p>
      {showPopup && (
        <NewsPopup article={article} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default NewsItem;
