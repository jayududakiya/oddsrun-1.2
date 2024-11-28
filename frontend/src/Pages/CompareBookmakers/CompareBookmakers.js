import React, { useEffect, useState } from "react";
import Default from "../../components/Default/Default";
import CouponDetails from "../../components/MyCoupon/CouponDetails";
import { Col, Row, Stack, Table } from "react-bootstrap";
import BreadcrumbComponent from "../../components/DroppingOdds/Breadcrumbs";
import styles from "../LeaguesData/LeaguesData.module.css";
import myCouponstyles from "../../components/MyCoupon/MyCoupon.module.css";
import bookmakersStyles from "../BookMakers/bookmakers.module.css";
import matchWithoddStyle from "../MatchWithOdds/MatchWithOdds.module.css";
import { OddsFormat, doFormatText, getDateAndTime } from "../../data/formater";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import ReactTooltip from "react-tooltip";
import ReactDOMServer from "react-dom/server";
import { useSelector } from "react-redux";
import { markets } from "../../data/markets";
import PostRequest from "../../services/PostRequest";
import BOOKIES_DATA from "../../data/bookies";

const statusArray = [];

const CompareBookmakers = () => {
  const _coupons = useSelector((state) => state.dataReducer.coupons);
  const [coupons, setCoupons] = useState({});
  const [overallStatus, setOverallStatus] = useState("Loading");
  const [bookiesOdds, setBookiesOdds] = useState([]);
  const [bookiesValues, setBookiesValues] = useState({});
  const [matchUpdatedResult, settMatchUpdatedResult] = useState({});
  const [bookieMatchOdds, setBookieMatchOdds] = useState({});
  const [openResultIndex, setOpenResultIndex] = useState(null);
  const [bookies, setBookies] = useState([]);

  const navs = [
    {
      title: "Odds Comparison",
      url: ``,
    },
    {
      title: "My Coupon - Best Odds On Your Combination",
      url: ``,
    },
  ];

  useEffect(() => {
    // Fetch bookies data from the API
    const fetchBookies = async () => {
      try {
        const response = await PostRequest("/bookies");
        if (response && response && response.length > 0) {
          const formatBookiesName = response.map((bookie) => ({
            ...bookie,
            bookieName: doFormatText(bookie.bookieName),
          }));
          setBookies(formatBookiesName);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookies();
  }, []);

  const getCol = (key, count) => {
    return count == 3 && key == 1 ? "X" : key + 1 >= 3 ? key : key + 1;
  };

  const _saveResult = (s) => {
    statusArray.push(s);
  };

  const _getMatchResult = (match, colIndex, marketLength) => {
    if (match?.eventStageName == "Canceled") {
      return "";
    }
    if (match?.text?.includes("Canceled")) {
      return "";
    }
    if (match?.text?.includes("Interrupted")) {
      return "";
    }
    if (!match) return "";
    if (!match.isFinished) return "";

    if (match.isFinished) {
      if (marketLength == 3) {
        switch (colIndex) {
          case 0:
            if (Number(match.homeResult) > Number(match.awayResult)) {
              return "WON";
            } else {
              return "LOSS";
            }
          case 1:
            if (Number(match.homeResult) == Number(match.awayResult)) {
              return "WON";
            } else {
              return "LOSS";
            }
          case 2:
            if (Number(match.homeResult) < Number(match.awayResult)) {
              return "WON";
            } else {
              return "LOSS";
            }
          default:
            return "";
        }
      } else {
        switch (colIndex) {
          case 0:
            if (Number(match.homeResult) > Number(match.awayResult)) {
              return "WON";
            } else {
              return "LOSS";
            }
          case 1:
            if (Number(match.homeResult) < Number(match.awayResult)) {
              return "WON";
            } else {
              return "LOSS";
            }
          default:
            return "";
        }
      }
    }
    return "";
  };

  const getBookmarkerStatus = (matchResult) => {
    if (matchResult == "WON") {
      return "W";
    } else if (matchResult == "LOSS") {
      return "L";
    } else {
      return "P";
    }
  };

  const getOddsTextColor = (r) => {
    if (r == "WON") {
      return "#23bf24";
    } else if (r == "LOSS") {
      return "#dc2427";
    } else {
      return "#f5ab39";
    }
  };

  const toggleOpenResult = (index) => {
    setOpenResultIndex(openResultIndex === index ? null : index);
  };

  const loadMatchOdds = async () => {
    const matchKeys = Object.keys(coupons);
    const mainOdds = [];
    const updatedResult = {};

    for (let index = 0; index < matchKeys.length; index++) {
      const element = coupons[matchKeys[index]];
      var url = element.match.url.replace("inplay-odds/", "");
      const sport = element.match.breadcrumbs.sport.name;
      // console.log('sport', sport.toLowerCase());

      try {
        const market = markets[sport.toLowerCase()][0].key;
        const data = {
          match: url,
          market: market,
          // date: moment.unix(date).format("YYYYMMDD"),
        };
        const response = await PostRequest("/match/details", data);
        var oddsData = [];
        if (
          response &&
          response.matchOdds &&
          response.matchOdds.data.oddsdata &&
          response.matchOdds.data.oddsdata.back
        ) {
          const fullTimeKey = Object.keys(
            response.matchOdds.data.oddsdata.back
          )[0];
          const odds = response.matchOdds.data.oddsdata.back[fullTimeKey].odds;
          mainOdds.push({
            col: element.col,
            odds: odds,
          });
        }
        if (response && response.matchData) {
          const market = "1X2";
          updatedResult[`${element.match.id}__KD_MASTER_${market}`] =
            response.matchData;
        }
        // setBookiesOdds(oddsData)
      } catch (error) {
        console.log("error", error);
      }
    }
    const finalBookiesData = {};
    const finalBookiesMatchOdds = {};
    if (mainOdds.length > 0) {
      mainOdds.map((item, index) => {
        const bookiesIdes = Object.keys(item.odds);
        bookiesIdes.map((bookieID) => {
          const v = mainOdds[index].odds[bookieID];

          if (finalBookiesMatchOdds[bookieID]) {
            finalBookiesMatchOdds[bookieID].push(v[item.col]);
          } else {
            finalBookiesMatchOdds[bookieID] = [v[item.col]];
          }

          if (finalBookiesData[bookieID]) {
            finalBookiesData[bookieID] =
              finalBookiesData[bookieID] * v[item.col];
          } else {
            finalBookiesData[bookieID] = v[item.col];
          }
        });
      });
    }

    setBookieMatchOdds(finalBookiesMatchOdds);

    const sortedKeys = Object.keys(finalBookiesData).sort(
      (a, b) => finalBookiesData[b] - finalBookiesData[a]
    );
    setBookiesOdds(sortedKeys);
    setBookiesValues(finalBookiesData);
    settMatchUpdatedResult(updatedResult);
  };

  useEffect(() => {
    loadMatchOdds();
  }, [coupons]);

  useEffect(() => {
    const readFromLocal = localStorage.getItem("MY_COUPON");
    if (readFromLocal) {
      try {
        const parseData = JSON.parse(readFromLocal);
        setCoupons(parseData);
      } catch (error) {}
    }
  }, [_coupons]);

  useEffect(() => {
    const checkStatus = setInterval(() => {
      if (statusArray.includes("L")) {
        setOverallStatus("LOSS");
      } else if (statusArray.includes("P")) {
        setOverallStatus("PENDING");
      } else {
        setOverallStatus("WON");
      }
    }, 1500);

    return () => clearInterval(checkStatus);
  }, []);

  const getURL = (bookieName) => {
    const bookie = bookies.filter(
      (bookie) => bookie.bookieName === bookieName
    )[0];
    if (bookie) {
      return bookie.URL.startsWith("https://")
        ? bookie.URL
        : `https://${bookie.URL}`;
    }
    return null;
  };

  return (
    <Default>
      <Row>
        <Col md={8}>
          <div className={`mt-4 ${styles.bg} p-3`}>
            <BreadcrumbComponent navs={navs} />
            <div className={styles.premierTitle}>
              <b>My Coupon - Best Odds on Your Combination</b>
            </div>
            <div className="mt-3 d-flex justify-content-between">
              <div>
                Status:
                <span
                  className={` ms-2 ${styles.bookmakersStatus} ${
                    myCouponstyles.matchResult
                  } ${overallStatus == "LOSS" && styles.standingsResultL} ${
                    overallStatus == "PANDING" && styles.standingsResultD
                  }`}
                >
                  {overallStatus}
                </span>
              </div>
              {/* <MycouponMsgBtn title='Save & Publish' /> */}
            </div>
            <div className={`${myCouponstyles.leaguesHeading} mt-4`}>
              Current odds
            </div>
            <div className={`mt-2 ${bookmakersStyles.tableOutLine}`}>
              <Table>
                <thead>
                  <tr>
                    <td>Selected Bets</td>
                    <td>Result</td>
                    <td>odds</td>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(coupons).map((key) => {
                    const match = coupons[key].match;
                    const market = match.cols.split("|");
                    const odds = Object.values(coupons[key].odds[0]);
                    const colIndex = coupons[key].col;
                    let result = "";
                    let timeStats = "";
                    if (matchUpdatedResult[key]?.text?.includes("(")) {
                      const resultArray =
                        matchUpdatedResult[key]?.text?.split("(");
                      result = resultArray[0].trim();
                      timeStats = "(" + resultArray[1] || "";
                    } else {
                      result = matchUpdatedResult[key]?.text;
                    }
                    const resultStatus = _getMatchResult(
                      matchUpdatedResult[key],
                      colIndex,
                      market.length
                    );

                    const status = getBookmarkerStatus(resultStatus);

                    _saveResult(status);

                    return (
                      <tr>
                        <td>
                          <Stack direction="horizontal">
                            <Stack direction="horizontal" gap={3}>
                              <div
                                className={`${styles.bookmakersStatus} ${
                                  status == "L" && styles.standingsResultL
                                } ${status == "P" && styles.standingsResultD}`}
                              >
                                {status}
                              </div>
                              <div>
                                <div className="text-muted">
                                  {getDateAndTime(
                                    match["date-start-timestamp"]
                                  )}
                                </div>
                                <div className="text-muted">
                                  Tip: {getCol(colIndex, market.length)}
                                  {`(${market.length == 3 ? "1X2" : "H/A"})`}-
                                  {_getMatchResult(
                                    matchUpdatedResult[key],
                                    colIndex,
                                    market.length
                                  )}
                                </div>
                              </div>
                            </Stack>

                            <div
                              className={`m-auto ${myCouponstyles.playerName}`}
                            >
                              {match.name}
                            </div>
                          </Stack>
                        </td>
                        <td>{match.result}</td>
                        <td style={{ color: getOddsTextColor(resultStatus) }}>
                          {OddsFormat(odds[colIndex].avg)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>

            <div className={`${myCouponstyles.leaguesHeading} mt-5`}>
              Best Total odds
            </div>

            <div className={`mt-2 ${bookmakersStyles.tableOutLine}`}>
              <Table
                className={`${bookmakersStyles.tableBookmakers} ${
                  bookmakersStyles.showBorder && bookmakersStyles.showBorder
                }  p-1`}
              >
                <thead>
                  <tr className="">
                    <td
                      className={bookmakersStyles.tableHeading}
                      style={{ width: "80%" }}
                    >
                      Bookmakers{" "}
                      <Icon
                        icon="octicon:arrow-up-24"
                        color="#656ef5"
                        fontSize={"15px"}
                      />
                    </td>
                    <td className={bookmakersStyles.profitLossAmount}>
                      <span className="pe-1"> Result </span>
                      <Icon
                        icon="octicon:arrow-up-24"
                        color="#656ef5"
                        fontSize={"15px"}
                      />
                    </td>
                    <td className={bookmakersStyles.profitLossAmount}></td>
                  </tr>
                </thead>
                <tbody>
                  {bookiesOdds.map((item, index) => {
                    const bookie = BOOKIES_DATA[item];
                    if (!bookie) return null;
                    return (
                      <>
                        <tr>
                          <td>
                            <a
                              href={getURL(bookie?.WebUrl)}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Stack direction="horizontal" gap={2}>
                                {bookie.logo && (
                                  <img
                                    src={require(`../../assets/bookmarkers/${bookie.logo}`)}
                                    className={matchWithoddStyle.betLogo}
                                  />
                                )}
                                <span>{bookie.WebName}</span>
                                <a href={bookie.Url} target="__blank">
                                  <Icon
                                    icon={"solar:square-top-down-linear"}
                                    fontSize={"15px"}
                                  />
                                </a>

                                {bookie.bonus && (
                                  <div>
                                    <div
                                      className={bookmakersStyles.bonus}
                                      data-html={true}
                                      data-tip={ReactDOMServer.renderToString(
                                        <div
                                          className={bookmakersStyles.tooltip}
                                        >
                                          <b>{bookie.bonus.title}</b>{" "}
                                          <p>{bookie.bonus.text}</p>
                                        </div>
                                      )}
                                      title={bookie.WebName}
                                    >
                                      Bonus
                                    </div>
                                    <ReactTooltip place="top" />
                                  </div>
                                )}
                              </Stack>
                            </a>
                          </td>
                          <td>{OddsFormat(bookiesValues[item].toFixed(2))}</td>
                          <td
                            className="text-center"
                            onClick={() => toggleOpenResult(index)}
                          >
                            {openResultIndex === index ? (
                              <Icon icon="teenyicons:up-solid" />
                            ) : (
                              <Icon icon="teenyicons:down-solid" />
                            )}
                          </td>
                        </tr>
                        {openResultIndex === index && (
                          <tr>
                            <td colSpan={3} style={{ background: "#f0f1fe" }}>
                              Ind. Odds :
                              {bookieMatchOdds[item].map(
                                (modds) => ` ${OddsFormat(modds.toFixed(2))}, `
                              )}
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="p-3">
            <CouponDetails />
          </div>
        </Col>
      </Row>
    </Default>
  );
};

export default CompareBookmakers;
