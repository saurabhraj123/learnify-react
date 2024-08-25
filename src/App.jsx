// external
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// components
import { Header, Footer } from "./components";
import LoadingBar from "react-top-loading-bar";

// pages
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage/LangingPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

// css
import classes from "./App.module.css";

function App() {
  const [topBarProgress, setTopBarProgress] = useState(0);

  return (
    <div className={classes.container}>
      <LoadingBar
        color="#6381f3"
        height={3}
        waitingTime={200}
        loaderSpeed={150}
        progress={topBarProgress}
      />
      <Header setTopBarProgress={setTopBarProgress} />

      <Routes>
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
          path="/"
          element={<LandingPage setTopBarProgress={setTopBarProgress} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
