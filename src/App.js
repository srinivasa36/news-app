import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import NewsList from "./components/newsList/NewsList";
import TrendingNews from "./components/trending/TrendingNews";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/trending" element={<TrendingNews />} />
      </Routes>
    </Router>
  );
};

export default App;
