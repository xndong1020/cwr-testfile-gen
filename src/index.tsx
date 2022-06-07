import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { CreateFormContextProvider } from "./contexts/FormContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <CreateFormContextProvider>
      <App />
    </CreateFormContextProvider>
  </ThemeProvider>
);
