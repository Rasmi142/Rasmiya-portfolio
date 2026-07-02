import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LoadingProvider } from "./context/LoadingProvider";
import SplashCursor from "./components/SplashCursor";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const MiyaPage = lazy(() => import("./pages/MiyaPage"));

const PortfolioRoot = () => (
  <MainContainer>
    <Suspense fallback={null}>
      <CharacterModel />
    </Suspense>
  </MainContainer>
);

const App = () => {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <SplashCursor RAINBOW_MODE={false} COLOR="#ffcc00" />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<PortfolioRoot />} />
            <Route path="/miya" element={<MiyaPage />} />
          </Routes>
        </Suspense>
      </LoadingProvider>
    </BrowserRouter>
  );
};

export default App;
