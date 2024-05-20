// src/app/App.tsx
import React from "react";
import WizardPage from "./features/wizard/WizardsPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Multi-Step Wizard</h1>
        <WizardPage />
      </header>
    </div>
  );
};

export default App;
