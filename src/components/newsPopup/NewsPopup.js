import React, { useEffect, useRef } from "react";
import "./NewsPopup.css";

const NewsPopup = ({ article, onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="news-popup" onClick={onClose}>
      <div
        className="popup-content"
        ref={popupRef}
        onClick={(event) => event.stopPropagation()}
      >
        <button onClick={onClose} className="close-button">
          X
        </button>
        <h2>{article.title}</h2>
        <p>{article.content}</p>
        <img src={article.urlToImage} alt="news-detail" />
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
        >
          Read more...
        </a>
      </div>
    </div>
  );
};

export default NewsPopup;
