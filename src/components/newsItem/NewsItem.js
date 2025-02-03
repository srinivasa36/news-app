import React, { forwardRef, useState } from "react";
import NewsPopup from "../newsPopup/NewsPopup";
import "./NewsItem.css";

const NewsItem = forwardRef(({ article, position }, ref) => {
  const getPositionClass = () => {
    if (position === "first-column") return "first-item";
    if (position === "second-column") return "second-column";
    return "";
  };
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div
      className={`news-item ${getPositionClass()} ${
        showPopup ? "no-hover" : ""
      }`}
      onClick={() => setShowPopup(true)}
      ref={ref}
    >
      <img src={article.urlToImage} alt="news-thumbnail" />
      <h3>{article.description}</h3>
      {showPopup && (
        <NewsPopup article={article} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
});

export default NewsItem;
