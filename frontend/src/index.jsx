import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
