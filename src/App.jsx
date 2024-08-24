// external
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// components
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LangingPage";
import PageNotFound from "./pages/PageNotFound";
import LoadingBar from "react-top-loading-bar";

function App() {
  const [topBarProgress, setTopBarProgress] = useState(0);

  return (
    <>
      <LoadingBar
        color="#6381f3"
        height={3}
        waitingTime={500}
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
    </>
  );
}

export default App;
