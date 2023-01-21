import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import Navbar from "../molecules/Navbar/Navbar";

const MainRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/categories" element={<div>CategoriesPage</div>} />
        <Route path="/profile" element={<div>ProfilePage</div>} />
        <Route path="/favorites" element={<div>FavoritesPage</div>} />
        <Route path="/cart" element={<div>CartPage</div>} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
