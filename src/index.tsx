import React from "react";
import App from "./App";
import GlobalStyles from "./GlobalStyles";
import "./services/i18n/i18n";

import { createRoot } from "react-dom/client";

const isDev = process.env.NODE_ENV === "development";
const container = document.getElementById("app-root")!;
const root = createRoot(container);

const AppComponents = () => {
  return (
    <React.Suspense fallback={<div />}>
      <GlobalStyles />
      <App />
    </React.Suspense>
  );
};

root.render(
  isDev ? (
    <React.StrictMode>
      <AppComponents />
    </React.StrictMode>
  ) : (
    <AppComponents />
  )
);
