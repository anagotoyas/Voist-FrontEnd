import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { WebsocketComponent } from "./components/websocket/WebsocketComponent.jsx";
import InactivityDetector from "./components/inactivity/InactivityDetector.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WebsocketComponent>
          <InactivityDetector>
          <App/>
          </InactivityDetector>
        </WebsocketComponent>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
