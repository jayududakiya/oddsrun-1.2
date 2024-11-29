import React, { Fragment } from "react";
import styles from "../../Pages/LeaguesData/LeaguesData.module.css";
import { Col, Row, Stack } from "react-bootstrap";
import MycouponMsgBtn from "../MyCoupon/MycouponMsgBtn";
import { NavLink, useLocation } from "react-router-dom";
import { getAssetImage, getFlagIconKey } from "../../data/flag";
import {
  OddsFormat,
  doFormatText,
  getDateAndTime,
  isSavedCoupon,
} from "../../data/formater";
import MatchPoint from "../MatchPoint/MatchPoint";
import { setCoupon } from "../../store/data.action";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getName } from "country-list";
import droppingStyle from "../../Pages/DroppingOdds/DroppingOdds.module.css";
import homeStyle from "../../Pages/Home/Home.module.css";
import ReactTooltip from "react-tooltip";
import useMetaTags from "../../hooks/useMetaTags";

const LeagueMatchItem = (props) => {
  const getGreenIndex = (match, colsCount) => {
    if (match["home-winner"] == "win") {
      return 0;
    }

    if (match["home-winner"] == "lost") {
      if (colsCount > 2) {
        return 2;
      } else {
        return 1;
      }
    }

    if (colsCount > 2) {
      return 1;
    } else {
      return -1;
    }
  };

  const {
    matchIndex,
    match,
    dateMatches,
    isSaveable = false,
    showWinder = false,
  } = props;

  const oddsValue = Object.values(match.odds[0]);
  const cols = match.match.cols.split("|");
  const sport = match.match.breadcrumbs.sport.name;

  var greenIndex = -1;

  if (["win", "lost", "draw"].indexOf(match.match["home-winner"]) != -1) {
    greenIndex = getGreenIndex(match?.match, cols.length);
  }
  const awayCountryFlag = getName(match.match["away-country-two-chart-name"]);
  const homeCountryFlag = getName(match.match["home-country-two-chart-name"]);

  const dispatch = useDispatch();

  const handleSaveOddsToLocal = (col) => {
    if (!isSaveable) return false;
    var existingCoupon = {};
    try {
      if (isSavedCoupon(match.match.id, col, "1X2")) {
        // Delete from list

        const readFromLocal = localStorage.getItem("MY_COUPON");
        if (readFromLocal) {
          existingCoupon = JSON.parse(readFromLocal);
        }
        const market = "1X2";
        delete existingCoupon[`${match.match.id}__KD_MASTER_${market}`];
        localStorage.setItem(`MY_COUPON`, JSON.stringify(existingCoupon));
        dispatch(setCoupon());
        toast("Coupon Removed");
      } else {
        const readFromLocal = localStorage.getItem("MY_COUPON");
        if (readFromLocal) {
          existingCoupon = JSON.parse(readFromLocal);
        }

        const odds = Object.values(match.odds[0]);
        const market = "1X2";
        existingCoupon[`${match.match.id}__KD_MASTER_${market}`] = {
          col: col,
          match: match.match,
          odds: match.odds,
          originValue: odds[col].avg,
          market: market,
        };

        localStorage.setItem(`MY_COUPON`, JSON.stringify(existingCoupon));
        dispatch(setCoupon());

        toast("Coupon added!");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getOddsBg = (colIndex) => {
    if (
      isSavedCoupon(match.match.id, colIndex, "1X2") &&
      greenIndex == colIndex &&
      showWinder
    ) {
      return "linear-gradient(to bottom, #D4EFD1, #ffe7a7)";
    } else if (isSavedCoupon(match.match.id, colIndex, "1X2")) {
      return "#ffe7a7";
    } else if (greenIndex == colIndex && showWinder) {
      return "#D4EFD1";
    } else {
      return "";
    }
  };

  const location = useLocation();

  const soccerNextMatches = {
    title: `Next matches betting odds in football, tennis, basketball – order of play, schedule`,
    description: `Discover all next matches betting odds and compare lines - football, tennis, basketball – order of play, schedule`,
    keyword: `Next matches, order of play, schedule, football, soccer, tennis, basketball, leagues, tournaments, odds comparison, matched betting, compare sport odds, betting lines`,
  };

  const droppingOdds = {
    title: `Track Betting Odds Movements | Comparison and Dropping odds`,
    description: `Monitor live betting odds changes with our advanced tracker. Stay informed and makes smarter bets with comparison real-time updates. Perfect dropping odds`,
    keyword: `dropping odds, arbitrage sports odds, comparison football odds, odds tracker, odds movement, compare betting`,
  };

  const sureBets = {
    title: `Sports Arbitrage Betting Guide | Maximize Your Betting Profits`,
    description: `Learn how to profit from sports arbitrage betting with our comprehensive guide. Get tips, strategies, sure bets and real-time updates to make risk-free bets across various sports.`,
    keyword: `arbitrage sports odds, sure bets, best odds, best betting odds`,
  };

  const bookMakers = {
    title: `Best Betting Bookmakers | Top-Rated Sites & Reviews`,
    description: `Find the best betting bookmakers with our expert reviews. Discover top-rated sites offering great odds, bonuses, and user-friendly interfaces for all your betting needs.`,
    keyword: `list of bookies, best bookmakers, top rated bookmakers, top betting sites, betting bookies, sports bookmakers, esport bookmakers`,
  };

  const autoMateSoccerNextMatches = {
    title: match?.match.breadcrumbs
      ? `${
          match?.match.breadcrumbs.sport.name +
          "," +
          " " +
          doFormatText(match?.match["sport-url-name"]) +
          " " +
          match?.match["country-name"] +
          " " +
          match?.match["tournament-name"] +
          " "
        } best betting odds, results and comparison betting lines`
      : "",

    description: match?.match.breadcrumbs
      ? `Compare best betting lines and betting odds for the ${
          match?.match["country-name"] +
          " " +
          match?.match["tournament-name"] +
          " " +
          match?.match.breadcrumbs.sport.name +
          "," +
          " " +
          doFormatText(match?.match["sport-url-name"]) +
          " " +
          "match" +
          match.match.name +
          " " +
          "."
        } Explore odds arbitrage, results and find the best betting bookmakers.`
      : "",

    keyword: match?.match.breadcrumbs
      ? `${
          match?.match.breadcrumbs.sport.name +
          "," +
          " " +
          doFormatText(match?.match["sport-url-name"]) +
          "," +
          " " +
          match?.match["country-name"] +
          "," +
          " " +
          match?.match["tournament-name"]
        }, odds comparison, dropping odds, matched betting, compare sport odds, predictions, tips, results, betting lines`
      : "",
  };

  const getMetatags = () => {
    if (location.pathname === "/soccer/next-matches") {
      return soccerNextMatches;
    } else if (location.pathname === "/droppingOdds") {
      return droppingOdds;
    } else if (location.pathname === "/sure-bets") {
      return sureBets;
    } else if (location.pathname === "/bookmakers") {
      return bookMakers;
    } else {
      return autoMateSoccerNextMatches;
    }
  };

  const meta = {
    title: getMetatags().title,
    description: getMetatags().description,

    canonical: window.location.href,
    meta: {
      charset: "utf-8",
      name: {
        keywords: getMetatags().keyword,
      },
    },
  };

  const metaTags = [
    { name: "description", content: meta.description },
    { name: "keywords", content: meta.meta.name.keywords },
  ];

  useMetaTags(metaTags, meta.title);

  return (
    <div className='p-2' key={matchIndex}>
      <div className={dateMatches.length - 1 == matchIndex ? "" : styles.b}>
        <Row className={`${styles.dataItem} gy-2`}>
          <Col xs={12} xl={6}>
            <Stack
              direction="horizontal"
              gap={3}
              className={styles.displayReverse}
            >
              <div>
                <MycouponMsgBtn
                  bg={true}
                  title={getDateAndTime(
                    match.match["date-start-timestamp"],
                    "HH:mm"
                  )}
                />
              </div>
              {match.match["event-stage-name"] == "Canceled" && (
                <div
                  style={{ color: "red", fontSize: "12px" }}
                  className={`ms-auto ${styles.cancledDisplay}`}
                >
                  canc.
                </div>
              )}
              {props.timeFrom !== "" && props.timeTo != "" && (
                <span
                  className={`${droppingStyle.odds_p} ${droppingStyle.setToggle}`}
                >
                  <div>{props.timeFrom}</div>
                  <div>{props.timeTo}</div>
                </span>
              )}

              <NavLink
                to={`/match${match.match.url}${match.match["date-start-timestamp"]} /${match.match["id"]}`}
                state={match}
              >
                <Stack direction="horizontal" className={styles.setDisplay}>
                  <Stack
                    direction="horizontal"
                    className={homeStyle.nextMatchDisplay}
                  >
                    <span
                      className={`${styles.countryName} ${styles.displayReverse} ${styles.displayReverseFlexEnd} d-flex`}
                      style={{
                        fontWeight:
                          match.match["home-winner"] == "win" && "bold",
                      }}
                    >
                      <div className={styles.textDecoration}>
                        {doFormatText(match.match["home-name"])}
                      </div>

                      <span>
                        {sport == "Tennis" ||
                        sport == "Boxing" ||
                        sport == "Darts" ||
                        sport == "Snooker" ||
                        sport == "Badminton" ||
                        sport == "Mma" ? (
                          <div
                            style={{ width: "34px" }}
                            className={`${styles.marginLeft15}`}
                          >
                            <Icon
                              // fontSize={"25px"}
                              width={"25px"}
                              icon={getFlagIconKey(homeCountryFlag)}
                              className=""
                            />
                          </div>
                        ) : (
                          <div
                            style={{ width: "34px" }}
                            className={`${styles.marginLeft15}`}
                          >
                            <img
                              className={`${styles.smFlag} playerImage`}
                              src={getAssetImage(
                                match.match["home-participant-images"]
                              )}
                              alt="home-participant-images"
                            />
                          </div>
                        )}
                      </span>
                    </span>

                    {props.timeFrom !== "" && props.timeTo != "" ? (
                      <>
                        <Stack
                          direction="horizontal"
                          gap={2}
                          className={`mt-2 ${droppingStyle.odds_p} ${droppingStyle.aboutdiscription}`}
                          data-tip={""}
                          data-for={`${match.match.id}`}
                        >
                          <div>{props.timeFrom}</div>
                          <span
                            style={{ color: "black", marginBottom: "2px" }}
                            className={`ms-1 me-1`}
                          >
                            :
                          </span>
                          <div>{props.timeTo}</div>
                        </Stack>
                        {match.match.partialresult && (
                          <ReactTooltip
                            id={`${match.match.id}`}
                            place="top"
                            getContent={function () {
                              return (
                                <span
                                  className="d-flex"
                                  dangerouslySetInnerHTML={{
                                    __html: match.match.partialresult,
                                  }}
                                ></span>
                              );
                            }}
                          />
                        )}
                      </>
                    ) : (
                      <span className={homeStyle.displayNone}>-</span>
                    )}
                  </Stack>
                  <div className={`d-flex ${styles.marginLeft15}`}>
                    {sport == "Tennis" ||
                    sport == "Boxing" ||
                    sport == "Darts" ||
                    sport == "Snooker" ||
                    sport == "Badminton" ||
                    sport == "Mma" ? (
                      <div style={{ width: "34px" }}>
                        <Icon
                          // fontSize={"25px"}
                          width={"25px"}
                          icon={getFlagIconKey(awayCountryFlag)}
                          className=""
                        />
                      </div>
                    ) : (
                      <div style={{ width: "34px" }}>
                        <img
                          src={getAssetImage(
                            match.match["away-participant-images"]
                          )}
                          className={`${styles.paddingTop10}  ${styles.msSet} playerImage`}
                          alt="away-participant-images"
                        />
                      </div>
                    )}
                    <div className={styles.textDecoration}>
                      <span
                        className={`${styles.countryName} ${styles.paddingTop10}`}
                        style={{
                          fontWeight:
                            match.match["away-winner"] == "win" && "bold",
                        }}
                      >
                        {doFormatText(match.match["away-name"])}
                      </span>
                    </div>
                  </div>
                </Stack>
              </NavLink>

              {match.match["event-stage-name"] == "Canceled" && (
                <div
                  style={{ color: "red", fontSize: "12px" }}
                  className={`ms-auto ${styles.premierLanDisplay}`}
                >
                  Canceled
                </div>
              )}
            </Stack>
          </Col>
          <Col
           xs={12} xl={6}
            className={styles.matchPointMargin}
          >
            <div className={styles.matchPoint}>
              <Stack
                direction="horizontal"
                gap={3}
                className={`d-flex justify-content-start justify-content-xl-end mb-2`}
              >
                {cols.map((col, colIndex) => (
                  <div key={colIndex}>
                    <MatchPoint
                      className={isSaveable ? "pointer" : ""}
                      heightSet="auto"
                      pointOne={col}
                      bgColor={getOddsBg(colIndex)}
                      onClick={() =>
                        oddsValue[colIndex]?.avg
                          ? handleSaveOddsToLocal(colIndex)
                          : () => {}
                      }
                      pointTwo={
                        <div className="pb-2">
                          {OddsFormat(oddsValue[colIndex]?.avg)}
                        </div>
                      }
                    />
                  </div>
                ))}
              </Stack>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LeagueMatchItem;
