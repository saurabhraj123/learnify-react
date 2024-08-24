import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-kfpcl4qpxpzjazlc.us.auth0.com"
        clientId="UxgfSnR4NWOz7gAUrveb8v1dvh2P1Amu"
        authorizationParams={{
          redirect_uri: `${window.location.origin}/dashboard`,
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </StrictMode>
);
