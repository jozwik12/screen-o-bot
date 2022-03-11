import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { TourProvider } from "@reactour/tour";
import steps from "./tourSteps"

ReactDOM.render(
  <TourProvider steps={steps}>
    <App />
  </TourProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
