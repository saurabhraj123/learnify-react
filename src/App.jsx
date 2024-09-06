// external
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// components
import LoadingBar from "react-top-loading-bar";

// utils
import { setupAxiosInterceptors } from "./utils/axios";

// pages
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
import AddNewPage from "./pages/AddNewPage";
import AuthSuccessRedirect from "./pages/AuthSuccessRedirect";

// css
import classes from "./App.module.css";

function App() {
  const [topBarProgress, setTopBarProgress] = useState(0);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    setupAxiosInterceptors(getAccessTokenSilently);
  }, [getAccessTokenSilently]);

  return (
    <div className={classes.container}>
      <LoadingBar
        color="#6381f3"
        height={3}
        waitingTime={200}
        loaderSpeed={150}
        progress={topBarProgress}
      />

      <Routes>
        <Route path="/login/success" element={<AuthSuccessRedirect />} />
        <Route
          path="/login"
          element={
            <AuthPage type="LOGIN" setTopBarProgress={setTopBarProgress} />
          }
        />
        <Route
          path="/signup"
          element={
            <AuthPage type="SIGNUP" setTopBarProgress={setTopBarProgress} />
          }
        />
        <Route
          path="/dashboard"
          element={<Dashboard setTopBarProgress={setTopBarProgress} />}
        />
        <Route
          path="/new"
          element={<AddNewPage setTopBarProgress={setTopBarProgress} />}
        />
        <Route
          path="/"
          element={<LandingPage setTopBarProgress={setTopBarProgress} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
