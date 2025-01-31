import React, { forwardRef, useState } from "react";
import NewsPopup from "../newsPopup/NewsPopup";
import "./NewsItem.css";

const NewsItem = forwardRef(({ article }, ref) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div
      className={`news-item ${showPopup ? "no-hover" : ""}`}
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
