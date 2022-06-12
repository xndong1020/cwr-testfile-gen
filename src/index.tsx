import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { CreateFormContextProvider } from "./contexts/FormContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <DndProvider backend={HTML5Backend}>
      <CreateFormContextProvider>
        <App />
      </CreateFormContextProvider>
    </DndProvider>
  </ThemeProvider>
);
