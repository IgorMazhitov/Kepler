import React from "react";
import WizardPage from "./features/wizard/WizardsPage";
import { Provider } from "react-redux";
import store from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Multi-step Wizard</h1>
        <WizardPage />
      </div>
    </Provider>
  );
}
