import axios from "axios";
import {
  MATCHDETAILS,
  DROPPING_ODDS,
  DROPPING_ODDS_LOADING,
  HOT_MATCHES,
  NEXT_MATCHES,
  NEXT_MATCHES_LOADING,
  SPORT_LEAGUES,
  SPORT_LEAGUES_IS_LOADING,
  SURE_BETS,
  TOP_EVENTS,
  SET_COUPON,
  SET_LEAGUE_MATCHES,
  LOAD_MORE_NEXT_MATCHES,
} from "./data.action";

const _getCoupon = () => {
  const readFromLocal = localStorage.getItem("MY_COUPON");
  if (readFromLocal) {
    try {
      const parseData = JSON.parse(readFromLocal);
      return parseData;
    } catch (error) {
      return {};
    }
  }
};

const initialState = {
  sportsLeagues: {},
  isSportsLeaguesLoading: false,
  isDroppingOddsLoading: false,
  hotMatches: [],
  nextMatches: [],
  sureBets: [],
  droppingOdds: [],
  activeDroppingOddsFilter: [],
  isNextMatchLoading: false,
  matchDetails: {},
  topEvents: [],
  coupons: _getCoupon(),
  leagueMatches: {},
};

export const dataReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case SPORT_LEAGUES:
      const copyOfLeagues = { ...state.sportsLeagues };
      copyOfLeagues[actions.value.sport] = actions.value.data;
      return {
        ...state,
        sportsLeagues: copyOfLeagues,
      };

    case SPORT_LEAGUES_IS_LOADING:
      return { ...state, isSportsLeaguesLoading: actions.value };

    case DROPPING_ODDS_LOADING:
      return { ...state, isDroppingOddsLoading: actions.value };

    case HOT_MATCHES:
      return { ...state, hotMatches: actions.value, isNextMatchLoading: false };

    case NEXT_MATCHES:
      return { ...state, nextMatches: actions.value };

    case LOAD_MORE_NEXT_MATCHES:
      return {
        ...state,
        nextMatches: { ...state.nextMatches, ...actions.value },
      };

    case SURE_BETS:
      return { ...state, sureBets: actions.value };

    case DROPPING_ODDS:
      return {
        ...state,
        activeDroppingOddsFilter: actions.value,
      };

    case NEXT_MATCHES_LOADING:
      return {
        ...state,
        isNextMatchLoading: actions.value,
      };

    case MATCHDETAILS:
      return { ...state, matchDetails: actions.value };

    case TOP_EVENTS:
      return { ...state, topEvents: actions.value };

    case SET_COUPON:
      return { ...state, coupons: actions.value };

    case SET_LEAGUE_MATCHES:
      // console.log("HERE", actions.value );
      return { ...state, leagueMatches: actions.value };

    default:
      return state;
  }
};

export const countryName = async () => {
  const response = await axios.get("https://ipapi.co/json/");
  window.localStorage.setItem("countryName", response.data.country_name);
};
