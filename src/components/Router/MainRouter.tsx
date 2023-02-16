import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "../atoms/Container/Container";
import Footer from "../molecules/Footer/Footer";
import Navbar from "../molecules/Navbar/Navbar";
import Loading from "../molecules/Loading/Loading";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const ProductPage = lazy(() => import("../../pages/ProductPage/ProductPage"));
const ErrorPage = lazy(() => import("../../pages/ErrorPage/ErrorPage"));
const CartPage = lazy(() => import("../../pages/CartPage/CartPage"));
const SustainabilityPage = lazy(
  () => import("../../pages/SustainabilityPage/SustainabilityPage")
);

import withScrollToTop from "../hoc/withScrollToTop";

import { ROUTES, PRODUCT_SUBROUTES } from "../../constants/routes";
import * as colors from "../../constants/colors";

const MainRouter = () => {
  return (
    <Router>
      <Navbar />
      <Container
        $flexGrow={1}
        $width="100%"
        $display="flex"
        $background={colors.LIGHTER}
      >
        <Suspense fallback={<Loading />}>
          {withScrollToTop(() => (
            <Routes>
              <Route path={ROUTES.PRODUCT}>
                <Route
                  path={`:${PRODUCT_SUBROUTES.slug}`}
                  element={<ProductPage />}
                />
              </Route>
              <Route
                path={ROUTES.SUSTAINABILITY}
                element={<SustainabilityPage />}
              />
              <Route path={ROUTES.PROFILE} element={<div>ProfilePage</div>} />
              {/* <Route path={ROUTES.FAVORITES} element={<div>FavoritesPage</div>} /> */}
              <Route path={ROUTES.CART} element={<CartPage />} />
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          ))}
        </Suspense>
      </Container>
      <Footer />
    </Router>
  );
};

export default MainRouter;
