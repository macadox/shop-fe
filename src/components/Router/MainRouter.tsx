import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "../atoms/Container/Container";
import Footer from "../molecules/Footer/Footer";
import Navbar from "../molecules/Navbar/Navbar";
import HomePage from "../../pages/HomePage/HomePage";
import ProductPage from "../../pages/ProductPage/ProductPage";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import CartPage from "../../pages/CartPage/CartPage";
import withScrollToTop from "../hoc/withScrollToTop";

import { ROUTES, PRODUCT_SUBROUTES } from "../../constants/routes";
import * as colors from "../../constants/colors";

const MainRouter = () => {
  return (
    <Router>
      <Navbar />
      <Container $flexGrow={1} $display="flex" $background={colors.LIGHTER}>
        {withScrollToTop(() => (
          <Routes>
            <Route path={ROUTES.PRODUCT}>
              <Route
                path={`:${PRODUCT_SUBROUTES.slug}`}
                element={<ProductPage />}
              />
            </Route>
            <Route
              path={ROUTES.CATEGORIES}
              element={<div>CategoriesPage</div>}
            />
            <Route path={ROUTES.PROFILE} element={<div>ProfilePage</div>} />
            <Route path={ROUTES.FAVORITES} element={<div>FavoritesPage</div>} />
            <Route path={ROUTES.CART} element={<CartPage />} />
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        ))}
      </Container>

      <Footer />
    </Router>
  );
};

export default MainRouter;
