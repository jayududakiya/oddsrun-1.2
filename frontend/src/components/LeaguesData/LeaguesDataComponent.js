import React, { useEffect, useState } from "react";
import styles from "../../Pages/LeaguesData/LeaguesData.module.css";
import myCouponStyle from "../MyCoupon/MyCoupon.module.css";
import PagesNav from "../DroppingOdds/PagesNav";
import { Icon } from "@iconify/react";
import { Col, Row, Stack, Table } from "react-bootstrap";
import ButtonBg from "../ButtonBg.js/ButtonBg";
import MycouponMsgBtn from "../MyCoupon/MycouponMsgBtn";
import SportsNav from "../DroppingOdds/SportsNav";
import MatchPoint from "../MatchPoint/MatchPoint";

import { NavLink, useLocation, useParams } from "react-router-dom";
import BreadcrumbComponent from "../DroppingOdds/Breadcrumbs";
import { doFormatText, stringToSlug } from "../../data/formater";
import { getAssetImage, getFlagIconKey } from "../../data/flag";
import { getSportsIcon } from "../../data/SportsIcon";
import PostRequest from "../../services/PostRequest";
import moment from "moment";
import Loading from "../../Loader/Loading";
import { toast } from "react-toastify";
import LeagueMatchItem from "./LeagueMatchItem";
import { useDispatch } from "react-redux";
import { setLeagueMatches } from "../../store/data.action";
import LeagueResult from "./LeagueResult";
import Standings from "./Standings";

const LeaguesDataComponent = () => {
  const params = useParams();
  const location = useLocation()
  const dispatch = useDispatch();

  const [matches, setMatches] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectPage, setSelectPage] = useState("nextMatch");
  const [leagueResult, setLeagueResult] = useState([]);
  const [leagueContent, setLeagueContent] = useState("");
  // console.log("leagueContent....", leagueContent);
  const [navs, setNavs] = useState([
    {
      title: params.sport,
      url: `/${stringToSlug(params.sport)}`,
    },
    {
      title: params.country,
      url: `/${stringToSlug(params.sport)}/${stringToSlug(params.country)}`,
    },
    {
      title: params.league,
      url: `/matches/${stringToSlug(params.sport)}/${stringToSlug(
        params.country
      )}/${stringToSlug(params.league)}`,
    },
    {
      title: selectPage,
      url: ``,
    },
  ]);

  const loadLeagueMatches = async () => {
    try {
      setIsLoading(true);

      const data = {
        league: `${params.sport}/${params.country}/${params.league}`,
        groupBy: true,
      };
      const response = await PostRequest("/league/matches", data);
      dispatch(setLeagueMatches(response));

      setMatches(response);
      setIsLoading(false);
    } catch (error) {
      toast.error(error);
    }
  };
  // console.log("params.league", params.league);

  const getResultData = async () => {
    try {
      console.log("country", params.country);
      const response = await PostRequest("/league/results", {
        league: params.league,
        sport: params.sport,
        country: params.country,
      });
      if (response) {
        setLeagueResult(response);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const getLeagueContent = async () => {
    try {
      const response = await PostRequest("/league-content", {
        league: params.league,
        sport: params.sport,
        country: params.country,
      });

      if (response) {
        setLeagueContent(response.fullDescriptions);
      }
    } catch (error) {
      // toast.error(error);
    }
  };

  useEffect(() => {
    setNavs([
      {
        title: params.sport == "soccer" ? "football" : params.sport,
        url: `/${stringToSlug(params.sport)}`,
      },
      {
        title: params.country,
        url: `/${stringToSlug(params.sport)}/${stringToSlug(params.country)}`,
      },
      {
        title: params.league,
        url: `/matches/${stringToSlug(params.sport)}/${stringToSlug(
          params.country
        )}/${stringToSlug(params.league)}`,
      },
      {
        title: selectPage,
        url: ``,
      },
    ]);
  }, [params, selectPage]);

  useEffect(() => {
    getResultData();
    loadLeagueMatches();
    getLeagueContent();
  }, [params]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <div className="mt-4">
        <BreadcrumbComponent navs={navs} />
        <div className={`${styles.premierTitle} ${styles.headerPart}`}>
          <Icon icon={getFlagIconKey(params.country)} fontSize={24} />
          <span className="ms-3">
            {doFormatText(params.league)} Betting Odds
          </span>
        </div>
        <Stack
          gap={1}
          direction="horizontal"
          className={`${styles.headerPart1} mt-4`}
        >
          {/* <ButtonBg btnName="Next Matches" btnPadding={true} /> */}
          <div
            onClick={() => {
              setSelectPage("nextMatch");
            }}
          >
            <MycouponMsgBtn
              isActive={selectPage == "nextMatch" ? true : false}
              title={
                <p className={`${styles.premierLanMargin} m-1`}>Next Matches</p>
              }
            />
          </div>
          <div
            onClick={() => {
              setSelectPage("result");
            }}
          >
            <MycouponMsgBtn
              isActive={selectPage == "result" ? true : false}
              title={
                <p className={`${styles.premierLanMargin} m-1`}>Results</p>
              }
            />
          </div>
          {/* <div className={styles.premierLanDisplay} onClick={() => { setSelectPage('standings') }}>
            <MycouponMsgBtn isActive={selectPage == 'standings' ? true : false} title={<p className="m-1">Standings</p>} />
          </div> */}
        </Stack>
        {isLoading && <Loading height={50} width={50} />}

        {selectPage == "nextMatch" && (
          <LeagueResult params={params} matches={matches} />
        )}

        {selectPage == "result" && (
          <LeagueResult params={params} matches={leagueResult} />
        )}

        {selectPage == "standings" && <Standings />}
      </div>

      <div className={`mt-4 mb-3`}>
        {/* <div className={myCouponStyle.leaguesHeading}>
          <Icon icon="solar:star-outline" fontSize={"20px"} />
          <span className="ms-2"><u>Add "{params.league}" to My leagues</u></span>
        </div> */}

        {leagueContent != "" ? (
          <div
            className={`${myCouponStyle.leaguesHeading} p-3 fw-normal`}
            dangerouslySetInnerHTML={{ __html: `<div>${leagueContent}</div>` }}
          ></div>
        ) : (
          <div className={`${myCouponStyle.leaguesHeading} p-3 fw-normal`}>
            {`${doFormatText(
              params.league
            )} page assistance: OddsRun provides a comprehensive 
          list of all upcoming ${doFormatText(params.league)} ${stringToSlug(
              params.sport
            )} matches taking 
          place in ${capitalizeFirstLetter(
            stringToSlug(params.country)
          )}. It also details the number of bookmakers offering ${doFormatText(
              params.league
            )} 
          sports odds for each specific${stringToSlug(
            params.sport
          )} match. Displayed are the average and highest 
          ${doFormatText(
            params.league
          )} betting odds for the home team to win, draw, and the away team to win the 
          ${doFormatText(
            params.league
          )} match. The top row of the upcoming matches table 
          ( ${stringToSlug(params.sport)} - ${capitalizeFirstLetter(
              stringToSlug(params.country)
            )} - ${doFormatText(params.league)}) allows you to navigate 
           to higher categories within the OddsRun betting odds comparison service and best betting lines. For the best insights and 
           competitive odds on ${stringToSlug(
             params.sport
           )} matches in ${capitalizeFirstLetter(
              stringToSlug(params.country)
            )}, OddsRun is your go-to platform for informed sports betting decisions.
        `}
          </div>
        )}
        {/* <div className={`${myCouponStyle.leaguesHeading} p-3 fw-normal`}>
          {`${doFormatText(params.league)} page help: Odds Portal lists all upcoming ${doFormatText(params.league)} tennis matches played in Argentina. "B's" column indicates number of bookmakers offering ${doFormatText(params.league)} betting odds on a specific tennis match. Columns 1, X and 2 serve for average/biggest ${doFormatText(params.league)} betting odds offered on home team to win, draw and away team to win the ${doFormatText(params.league)} match. The top line of upcoming matches table (Tennis - Argentina - ${doFormatText(params.league)}) lets you click-through to higher categories of Odds Portal betting odds comparison service.`}
        </div> */}
      </div>
    </>
  );
};

export default LeaguesDataComponent;
