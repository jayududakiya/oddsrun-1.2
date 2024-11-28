import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { dataReducer } from "./store/data.reducer";
import Loader from "./Loader/Loader";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InitAPICall from "./components/Default/InitAPICall";
import BookMakersMain from "./Pages/BookMakers/BookMakersMain";
import AllLeagues from "./Pages/allLeagues/AllLeagues";
import SearchResult from "./Pages/SearchResult/SearchResult";
import ReactTooltip from "react-tooltip";
import LeagueResult from "./components/LeaguesData/LeagueResult";
import CompareBookmakers from "./Pages/CompareBookmakers/CompareBookmakers";
import ManullyTags from "./Utils.js/ManullyTags";

const DroppingOdds = lazy(() => import("./Pages/DroppingOdds/DroppingOdds"));
const Home = lazy(() => import("./Pages/Home/Home"));
const MatchWithOdds = lazy(() => import("./Pages/MatchWithOdds/MatchWithOdds"));
const SureBets = lazy(() => import("./Pages/SureBets/SureBets"));
const LeaguesData = lazy(() => import("./Pages/LeaguesData/LeaguesData"));
const NextMatches = lazy(() => import("./Pages/NextMatches/NextMatches"));
const Article = lazy(() => import("./Pages/Article/Article"));
const ArticleDetails = lazy(() =>
  import("./Pages/ArticleDetails/ArticleDetails")
);
const SaveCoupon = lazy(() => import("./Pages/saveCoupon/SaveCoupon"));
const Register = lazy(() => import("./Pages/Register/Register"));
const Login = lazy(() => import("./Pages/Login/Login"));
const ForgotPassword = lazy(() =>
  import("./Pages/ForgotPassword/ForgotPassword")
);
const ResetPassword = lazy(() => import("./Pages/ResetPassword/ResetPassword"));

const rootReducers = combineReducers({
  dataReducer: dataReducer,
});

const store = legacy_createStore(rootReducers, applyMiddleware(thunk));

export const App = () => {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense
            fallback={
              <div>
                <Loader />
              </div>
            }
          >
            <Routes > 
              {/* <Route path="/" element={<Navigate to={"/home"} />} /> */}
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/droppingOdds" element={<DroppingOdds />} />
              <Route path="/sure-bets" element={<SureBets />} />
              <Route path="/bookmakers" element={<BookMakersMain />} />
              <Route path="/article" element={<Article />} />
              <Route
                path="/article-details/:title/:id"
                element={<ArticleDetails />}
              />
              <Route
                path="/matches/:sport/:country/:league"
                element={<LeaguesData />}
              />
              <Route
                path="/match/:sport/:country/:league/:match/:date"
                element={<MatchWithOdds />}
              />
              <Route
                path="/match/:sport/:country/:league/:match/:date/:id"
                element={<MatchWithOdds />}
              />
              <Route
                path="/:sport-name/next-matches"
                element={<NextMatches />}
              />
              <Route path="/:sport-name" element={<AllLeagues />} />
              <Route
                path="/:sport-name/:country-name"
                element={<AllLeagues />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/coupon" element={<CompareBookmakers />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/save-coupon" element={<SaveCoupon />} />
              <Route
                path="/search/:team-name/:sport/:country/:turnament"
                element={<SearchResult />}
              />
            </Routes>
          </Suspense>
          <ToastContainer />
          {/* <InitAPICall /> */}
        </BrowserRouter>
      </Provider>
    </>
  );
};
