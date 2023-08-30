import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CampaignsContextProvider } from "./context/CampaignsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CampaignsContextProvider>
      <App />
    </CampaignsContextProvider>
  </React.StrictMode>
);
