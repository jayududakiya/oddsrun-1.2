import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Loader from "./Loader/Loader";

const DroppingOdds = lazy(() => import("./Pages/DroppingOdds/DroppingOdds"));
const Home = lazy(() => import("./Pages/Home/Home"));
const MatchWithOdds = lazy(() => import("./Pages/MatchWithOdds/MatchWithOdds"));
const SureBets = lazy(() => import("./Pages/SureBets/SureBets"));
const LeaguesData = lazy(() => import("./Pages/LeaguesData/LeaguesData"));
const NextMatches = lazy(() => import("./Pages/NextMatches/NextMatches"));

export const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense
          fallback={
            <div>
              <Loader />
            </div>
          }
        >
          <Routes>
            {/* <Route path="/" element={<Navigate to="/home" />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/droppingOdds" element={<DroppingOdds />} />
            <Route path="/match-with-odds" element={<MatchWithOdds />} />
            <Route path="/sure-bets" element={<SureBets />} />
            <Route path="/leagues-data" element={<LeaguesData />} />
            <Route path="/next-matches" element={<NextMatches />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};
