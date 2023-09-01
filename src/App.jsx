/* eslint-disable react/prop-types */
import "./App.css";
import { Home } from "./Home";
import { MsalProvider } from "@azure/msal-react";

function App({ pca }) {
  return (
    <MsalProvider instance={pca}>
      <Home />
    </MsalProvider>
  );
}

export default App;
