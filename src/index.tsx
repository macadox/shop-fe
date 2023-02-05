import React from "react";
import App from "./App";
import GlobalStyles from "./GlobalStyles";
import "./services/i18n/i18n";

import { createRoot } from "react-dom/client";

const container = document.getElementById("app-root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <React.Suspense fallback={<div />}>
      <GlobalStyles />
      <App />
    </React.Suspense>
  </React.StrictMode>
);
