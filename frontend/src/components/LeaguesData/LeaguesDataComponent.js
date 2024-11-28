import React, { useEffect, useState } from "react";
import styles from "../../Pages/LeaguesData/LeaguesData.module.css";
import myCouponStyle from "../MyCoupon/MyCoupon.module.css";
import { Icon } from "@iconify/react";
import { Stack } from "react-bootstrap";
import MycouponMsgBtn from "../MyCoupon/MycouponMsgBtn";
import { useParams } from "react-router-dom";
import BreadcrumbComponent from "../DroppingOdds/Breadcrumbs";
import { doFormatText, stringToSlug } from "../../data/formater";
import { getFlagIconKey } from "../../data/flag";
import PostRequest from "../../services/PostRequest";
import Loading from "../../Loader/Loading";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLeagueMatches } from "../../store/data.action";
import LeagueResult from "./LeagueResult";
import Standings from "./Standings";

const LeaguesDataComponent = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [matches, setMatches] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectPage, setSelectPage] = useState("nextMatch");
  const [leagueResult, setLeagueResult] = useState([]);
  const [leagueContent, setLeagueContent] = useState("");
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
    } catch (error) {}
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
      </div>
    </>
  );
};

export default LeaguesDataComponent;
