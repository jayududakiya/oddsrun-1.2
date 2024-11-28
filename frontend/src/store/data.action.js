import { toast } from "react-toastify";
import PostRequest from "../services/PostRequest";
import { useSelector } from "react-redux";

export const UPCOMING_MATCHES = "UPCOMING_MATCHES";
export const SPORT_LEAGUES = "SPORT_LEAGUES";
export const SPORT_LEAGUES_IS_LOADING = "SPORT_LEAGUES_IS_LOADING";
export const HOT_MATCHES = "HOT_MATCHES";
export const NEXT_MATCHES = "NEXT_MATCHES";
export const LOAD_MORE_NEXT_MATCHES = "LOAD_MORE_NEXT_MATCHES";
export const SURE_BETS = "SURE_BETS";
export const DROPPING_ODDS = "DROPPING_ODDS";
export const DROPPING_ODDS_LOADING = "DROPPING_ODDS_LOADING";
export const NEXT_MATCHES_LOADING = "NEXT_MATCHES_LOADING";
export const MATCHDETAILS = "MATCHDETAILS";
export const TOP_EVENTS = "TOP_EVENTS";
export const SET_COUPON = "SET_COUPON";
export const SET_LEAGUE_MATCHES = "SET_LEAGUE_MATCHES";

export const loadmatchDetails = (data = {}) => {

  const sortKey = (obj) => {

    const keys = Object.keys(obj);

    keys.sort((a, b) => {
      const numA = parseFloat(a.match(/-?\d+(\.\d+)?$/)[0]);
      const numB = parseFloat(b.match(/-?\d+(\.\d+)?$/)[0]);
      return numA - numB;
    });

    // Optionally, create a new object with sorted keys
    const sortedObj = {};
    for (let key of keys) {
      sortedObj[key] = obj[key];
    }

    return sortedObj;

  }
  if (!Array.isArray(data.market)) {
    return async (dispatch) => {
      try {
        setLoader(dispatch, true, DROPPING_ODDS_LOADING);

        const response = await PostRequest("/match/details", data);
        const sortResponse = sortKey(response.matchOdds.data.oddsdata.back);
        response.matchOdds.data.oddsdata.back = sortResponse
        dispatch({
          type: MATCHDETAILS,
          value: response,
        });
      } catch (error) {
        toast.error(error);
      } finally {
        setLoader(dispatch, false, DROPPING_ODDS_LOADING);
      }
    };
  } else {
    return async (dispatch) => {
      try {
        setLoader(dispatch, true, DROPPING_ODDS_LOADING);

        const gameData = {
          date: data.date,
          match: data.match,
          market: data.market[0],
        };

        const gameResponse = await PostRequest("/match/details", gameData);
        const gameResponseData = sortKey(gameResponse.matchOdds.data.oddsdata.back);
        // console.log("response1", gameResponse);

        const setData = {
          date: data.date,
          match: data.match,
          market: data.market[1],
        };
        const setResponse = await PostRequest("/match/details", setData);
        const setResponseData = sortKey(setResponse.matchOdds.data.oddsdata.back);
        // console.log("response2", setResponseData);

        var lastKey = Object.keys(setResponseData)
        lastKey = lastKey[lastKey.length - 1];
        setResponseData[lastKey].isLast = true;
        const response1 = { ...setResponseData, ...gameResponseData };
        setResponse.matchOdds.data.oddsdata.back = response1;
        // console.log('response action', response1);

        dispatch({
          type: MATCHDETAILS,
          value: setResponse,
        });
      } catch (error) {
        toast.error(error);
      } finally {
        setLoader(dispatch, false, DROPPING_ODDS_LOADING);
      }
    };
  }
};

export const loadDroppingOdds = (data = {}) => {
  return async (dispatch) => {
    try {
      setLoader(dispatch, true, DROPPING_ODDS_LOADING);

      const response = await PostRequest(
        `/dropping-odds?sport=${data.sport}&market=${data.market}&timeFilter=${data.timeFilter}`,
        data
      );

      dispatch({
        type: DROPPING_ODDS,
        value: response,
      });
    } catch (error) {
      toast.error(error);
    } finally {
      setLoader(dispatch, false, DROPPING_ODDS_LOADING);
    }
  };
};

export const loadNextMatches = (data = {}) => {
  // console.log("tomorrow", data);
  return async (dispatch) => {
    try {
      setLoader(dispatch, true, NEXT_MATCHES_LOADING);

      const response = await PostRequest("/matches/next-matches", data);

      dispatch({
        type: NEXT_MATCHES,
        value: response,
      });
    } catch (error) {
      toast.error(error);
    } finally {
      setLoader(dispatch, false, NEXT_MATCHES_LOADING);
    }
  };
};

export const loadMoreNextMatches = (data = {}) => {
  return async (dispatch) => {
    try {
      setLoader(dispatch, true, NEXT_MATCHES_LOADING);

      const response = await PostRequest("/matches/next-matches", data);

      dispatch({
        type: LOAD_MORE_NEXT_MATCHES,
        value: response,
      });
    } catch (error) {
      toast.error(error);
    } finally {
      setLoader(dispatch, false, NEXT_MATCHES_LOADING);
    }
  };
};

export const loadHotMatches = (data = {}) => {
  return async (dispatch) => {
    try {
      const response = await PostRequest("/matches/hot-matches", data);

      dispatch({
        type: HOT_MATCHES,
        value: response,
      });
      return response;
    } catch (error) {
      toast.error(error);
    }
  };
};

export const loadUpComingMatches = (data = {}) => {
  return async (dispatch) => {
    try {
      var response = await PostRequest("", data);

      dispatch({
        type: UPCOMING_MATCHES,
        value: response,
      });
    } catch (error) {
      toast.error(error);
    }
  };
};

export const loadSportLeagues = (data = {}) => {
  return async (dispatch) => {
    try {
      setLoader(dispatch, true, SPORT_LEAGUES_IS_LOADING);

      var response = await PostRequest("/sport/leagues", data);

      dispatch({
        type: SPORT_LEAGUES,
        value: {
          sport: data.sport,
          data: response,
        },
      });
    } catch (error) {
      toast.error(error);
    } finally {
      setLoader(dispatch, false, SPORT_LEAGUES_IS_LOADING);
    }
  };
};

export const setLoader = (dispatch, value, key) => {
  // console.log("setLoader", value, key);
  dispatch({
    type: key,
    value: value,
  });
};

export const loadSureBets = (data = {}) => {
  return async (dispatch) => {
    try {
      const response = await PostRequest("/sure-bets", data);
      dispatch({
        type: SURE_BETS,
        value: response,
      });
    } catch (error) {
      toast.error(error);
    }
  };
};

export const loadTopEvents = (data = {}) => {
  return async (dispatch) => {
    try {
      const response = await PostRequest(`/events?data=${Object.values(data).join('_')}`, data);

      dispatch({
        type: TOP_EVENTS,
        value: response.events,
      });
    } catch (error) {
      toast.error(error);
    }
  };
};

export const setCoupon = (data = {}) => {
  return (dispatch) => {
    try {

      dispatch({
        type: SET_COUPON,
        value: data,
      });

    } catch (error) { }
  };
};

export const setLeagueMatches = (matches = []) => {
  return (dispatch) => {
    try {
      dispatch({
        type: SET_LEAGUE_MATCHES,
        value: matches,
      });
    } catch (error) { }
  };
};
