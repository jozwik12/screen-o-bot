import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { TourProvider } from "@reactour/tour";
import steps from "./tourSteps";

ReactDOM.render(
  <TourProvider
    steps={steps}
    padding={{ mask: 5 }}
    showBadge={false}
    styles={{
      popover: (base) => ({
        ...base,
        borderRadius: 10,
        padding: 8,
        paddingLeft: 20,
        paddingRight: 20,
      }),
      maskArea: (base) => ({ ...base, rx: 10 }),
      close: (base) => ({ ...base, right: 8, top: 8 }),
    }}
  >
    <App />
  </TourProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
