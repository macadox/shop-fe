import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const withScrollToTop = (Component: React.FC) => {
  const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [location.pathname]);

    return <Component />;
  };

  return <ScrollToTop />;
};

export default withScrollToTop;
