import React from "react";
import WizardPage from "./features/wizard/WizardsPage";

export default function App() {
  return (
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
  );
}
