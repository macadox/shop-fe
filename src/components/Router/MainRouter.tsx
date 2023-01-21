import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "../atoms/Container/Container";
import Footer from "../molecules/Footer/Footer";
import Navbar from "../molecules/Navbar/Navbar";
import HomePage from "../../pages/HomePage/HomePage";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

import * as colors from "../../constants/colors";

const MainRouter = () => {
  return (
    <Router>
      <Navbar />
      {/* APP WRAPPER */}
      <Container $flexGrow={1} $background={colors.LIGHTER}>
        <Routes>
          <Route path="/categories" element={<div>CategoriesPage</div>} />
          <Route path="/profile" element={<div>ProfilePage</div>} />
          <Route path="/favorites" element={<div>FavoritesPage</div>} />
          <Route path="/cart" element={<div>CartPage</div>} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Container>

      <Footer />
    </Router>
  );
};

export default MainRouter;
