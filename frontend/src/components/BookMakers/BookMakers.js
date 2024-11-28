import React, { Fragment, useEffect, useState } from "react";
// import { Helmet } from "react-helmet";
import styles from "../../Pages/MatchWithOdds/MatchWithOdds.module.css";
import { Icon } from "@iconify/react";
import { Dropdown, Nav, NavDropdown, Stack, Table } from "react-bootstrap";
import MycouponMsgBtn from "../MyCoupon/MycouponMsgBtn";
import myCouponStyle from "../MyCoupon/MyCoupon.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BreadcrumbComponent from "../DroppingOdds/Breadcrumbs";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { loadmatchDetails } from "../../store/data.action";
import BOOKIES_DATA from "../../data/bookies";
import {
  OddsFormat,
  doFormatText,
  getDateAndTime,
  getMarketKeysCount,
  numFormate,
  stringToSlug,
} from "../../data/formater";
import Accordion from "react-bootstrap/Accordion";
import BookMarkerTable from "./BookMarkerTable";
import Loading from "../../Loader/Loading";
import { getAssetImage } from "../../data/flag";
import { markets } from "../../data/markets";
import NavTab from "../MyCoupon/NavTab";

// import DocumentMeta from 'react-document-meta';
import useMetaTags from "../../hooks/useMetaTags";
import PostRequest from "../../services/PostRequest";

function calculateStats(odds) {
  let total0 = 0;
  let total1 = 0;
  let total2 = 0;
  let highest0 = -Infinity;
  let highest1 = -Infinity;
  let highest2 = -Infinity;
  let count = 0;

  for (const key in odds) {
    const values = odds[key];
    if ("0" in values) {
      total0 += values["0"];
      highest0 = Math.max(highest0, values["0"]);
    }
    if ("1" in values) {
      total1 += values["1"];
      highest1 = Math.max(highest1, values["1"]);
    }
    if ("2" in values) {
      total2 += values["2"];
      highest2 = Math.max(highest2, values["2"]);
    }
    count++;
  }

  const average0 = total0 / count || 0;
  const average1 = total1 / count || 0;
  const average2 = total2 / count || 0;

  return {
    average: {
      0: average0,
      1: average1,
      2: average2,
    },
    highest: {
      0: highest0 === -Infinity ? 0 : highest0,
      1: highest1 === -Infinity ? 0 : highest1,
      2: highest2 === -Infinity ? 0 : highest2,
    },
  };
}

const getMovementData = (data) => {
  var convertedData = [];

  for (let i = 0; i < data.length - 1; i++) {
    const currentVersion = parseFloat(data[i][0]);
    const nextVersion = parseFloat(data[i + 1][0]);
    const date = data[i][2];
    const change = currentVersion - nextVersion;
    const changeType = nextVersion > currentVersion ? "down" : "up";

    convertedData.push({
      current: currentVersion.toString(),
      date: moment.unix(date).format("DD, MMM HH:mm"),
      change: change.toFixed(2),
      type: changeType,
    });
  }

  return convertedData;
};

const BookmarkerItem = (props) => {
  const {
    bookmarker,
    bookieId,
    highest1,
    highestX,
    highest2,
    isCanceled,
    bookies,
  } = props;

  const renderDropdown = (type) => {
    const lastDataOfBookmarker = bookmarker[type].movements[0];
    return (
      <Dropdown>
        <Dropdown.Toggle
          style={{
            background:
              OddsFormat(lastDataOfBookmarker?.current) ===
              OddsFormat(bookmarker[type].openingOdds.value)
                ? "transparent"
                : "",
            color:
              OddsFormat(lastDataOfBookmarker?.current) ===
              OddsFormat(bookmarker[type].openingOdds.value)
                ? "black"
                : "",
          }}
          className={`no-after ${styles.plusAmount} ${
            bookmarker[type].type == "up"
              ? styles.plusAmount
              : styles.minusAmount
          }`} //${bookmarker[type].type == "up" ? styles.plusAmount : styles.minusAmount}
          variant="success"
          id="dropdown-basic"
        >
          {
            <span
              style={{
                display:
                  OddsFormat(lastDataOfBookmarker?.current) ===
                  OddsFormat(bookmarker[type].openingOdds.value)
                    ? "none"
                    : "",
              }}
            >
              <Icon
                className="me-1 mb-1"
                fontSize={8}
                color={bookmarker[type].type == "up" ? "green" : "red"}
                icon={`teenyicons:${
                  bookmarker[type].type == "up" ? "up" : "down"
                }-solid`}
              />
            </span>
          }
          <span
            className={`${
              isCanceled == true && styles.cancledMatch
            } styles.cancledMatch`}
          >
            {OddsFormat(bookmarker[type].value.toFixed(2))}
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu className={styles.oddsMovementsBg}>
          <Dropdown.Item href="#/action-1">
            <div>
              <h5 className={styles.title}>ODDS Movement</h5>
              <div
                className={
                  bookmarker[type].movements.length <= 12
                    ? styles.movementScrollFitContent
                    : styles.movementScroll
                }
              >
                {bookmarker[type].movements.map((movement, index) => {
                  return (
                    <Stack
                      className={styles.timeAndDate}
                      direction="horizontal"
                      gap={3}
                      key={index}
                    >
                      <date>{movement.date}</date>
                      <span className={styles.profit}>
                        {OddsFormat(movement.current)}
                      </span>
                      <span className={styles[movement.type]}>
                        {movement.change}
                      </span>
                    </Stack>
                  );
                })}
              </div>
              <div>
                <h6 className={styles.joiningTimeOdds}>Opening odds:</h6>
                <span className={styles.timeAndDate}>
                  {bookmarker[type].openingOdds.date}{" "}
                  {bookmarker[type].openingOdds.time}
                </span>
                <span className={`${styles.profit} ps-3`}>
                  {OddsFormat(bookmarker[type].openingOdds.value)}
                </span>
                <div className="mt-2">
                  <a href={bookmarker.url}>
                    <MycouponMsgBtn title="Click to BET NOW" />
                  </a>
                </div>
              </div>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const getURL = (bookieName) => {
    const bookie = bookies?.filter(
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
    <tr>
      <td>
        <a
          href={getURL(bookmarker.name)}
          target="_blank"
          key={bookieId}
          rel="noreferrer"
        >
          <Stack direction="horizontal" gap={4} className={styles.matchTypes}>
            {bookmarker.logo && (
              <img
                src={require(`../../assets/bookmarkers/${bookmarker.logo}`)}
                alt={bookmarker.name}
                className={styles.betLogo}
              />
            )}

            <Stack
              direction="horizontal"
              gap={1}
              className={styles.numbersOfBet}
            >
              {bookmarker.name}
              <Icon
                icon="bi:exclamation-circle"
                color="black"
                className={`${styles.ms} ms-3 `}
              />
            </Stack>
          </Stack>
        </a>
      </td>
      <td
        className="text-center"
        style={{
          background:
            highest1.toFixed(2) ==
            OddsFormat(bookmarker["localOdds"].value.toFixed(2))
              ? "#fff5cf"
              : "",
        }}
      >
        {renderDropdown("localOdds")}
      </td>

      {bookmarker.drawOdds && (
        <td
          className="text-center"
          style={{
            background:
              highestX.toFixed(2) ==
              OddsFormat(bookmarker["drawOdds"].value.toFixed(2))
                ? "#fff5cf"
                : "",
          }}
        >
          {renderDropdown("drawOdds")}
        </td>
      )}

      {bookmarker.visitorOdds && (
        <td
          className="text-center"
          style={{
            background:
              highest2.toFixed(2) ==
              OddsFormat(bookmarker["visitorOdds"].value.toFixed(2))
                ? "#fff5cf"
                : "",
          }}
        >
          {renderDropdown("visitorOdds")}
        </td>
      )}

      {/* <td className="text-center">
          <span className={styles.percentageNumber}>97.8%</span>
        </td> */}
    </tr>
  );
};

const hasMatchData = (d) => {
  if (!d) return false;
  return Object.keys(d).length > 0 ? true : false;
};

const BookMakers = () => {
  const [bookies, setBookies] = useState([]);
  const params = useParams();

  const location = useLocation();
  const matchOdd = location.state;

  const [subMarket, setSubMarket] = useState("1X2");
  // console.log("subMarket", subMarket);
  const { sport, country, league, match, date } = useParams();
  const matchUrl = `/${sport}/${country}/${league}/${match}/`;

  const [activeMarket, setActiveMarket] = useState(
    sport == "basketball" ? markets[sport][1] : markets[sport][0]
  );
  const dispatch = useDispatch();

  const _matchDetails = useSelector((state) => state.dataReducer.matchDetails);
  const _isloading = useSelector(
    (state) => state.dataReducer.isDroppingOddsLoading
  );

  const data = {
    match: matchUrl,
    market: subMarket,
    date: moment.unix(date).format("YYYYMMDD"),
    id: params.id,
  };

  const meta = {
    title: _matchDetails?.matchData
      ? `${
          _matchDetails?.matchData["home"] +
          " - " +
          _matchDetails?.matchData["away"]
        } Best Betting Odds, ${
          sport == "soccer" ? "Football" : doFormatText(sport)
        } - ${doFormatText(league)}`
      : "",
    description: `Compare best betting lines and betting odds for the ${doFormatText(
      league
    )} 
    ${sport == "soccer" ? "Football" : doFormatText(sport)} match 
    ${
      _matchDetails?.matchData
        ? `${
            _matchDetails?.matchData["home"] +
            " - " +
            _matchDetails?.matchData["away"]
          }`
        : ""
    }. 
    Explore odds arbitrage and find the best betting bookmakers.`,
    canonical: window.location.href,
    meta: {
      charset: "utf-8",
      name: {
        keywords: `${
          sport == "soccer" ? "Football" : doFormatText(sport)
        }, ${doFormatText(country)}, ${doFormatText(league)}, ${
          _matchDetails?.matchData
            ? `${
                _matchDetails?.matchData["home"] +
                " - " +
                _matchDetails?.matchData["away"]
              }`
            : ""
        }`,
      },
    },
  };

  const matchDetails = () => {
    try {
      dispatch(loadmatchDetails(data));
    } catch (error) {}
  };

  useEffect(() => {
    matchDetails();
  }, [subMarket, location]);

  useEffect(() => {
    setSubMarket(activeMarket.subKeys[0]);
  }, [activeMarket]);

  const [navs, setNavs] = useState([
    {
      title: params.sport,
      url: `/${stringToSlug(params.sport)}`,
    },
    {
      title: params.country,
      url: `/${stringToSlug(params.country)}/${stringToSlug(params.sport)}`,
    },
    {
      title: params.league,
      url: `/matches/${stringToSlug(params.sport)}/${stringToSlug(
        params.country
      )}/${stringToSlug(params.league)}`,
    },
    {
      title: params.match,
      //  title: `${_matchDetails.matchData["home"]} VS ${_matchDetails.matchData["away"]}`,
    },
  ]);

  const renderOddsBodyData = ({
    isCanceled,
    odds,
    bookieId,
    openingOdd,
    openingChangeTime,
    changeTime,
    history,
    movementType,
    bookies,
  }) => {
    const bookie = BOOKIES_DATA[bookieId];
    if (!bookie) return null;

    const bookieOddsData = odds[bookieId];
    const bookieOpeningOdd = openingOdd[bookieId];
    const bookieOpeningChangeTime = openingChangeTime[bookieId];
    const bookiechangeTime = changeTime[bookieId];
    if (
      Object.keys(bookieOddsData).length == 2 ||
      Object.keys(bookieOddsData).length == 1
    ) {
      const withLastMovement = history[0][bookieId];
      withLastMovement.unshift([bookieOddsData["0"], 0, bookiechangeTime[0]]);
      var bookieLocalMovement = getMovementData(withLastMovement);
      bookieLocalMovement.shift();
    } else {
      const withLastMovement = history[1][bookieId];

      withLastMovement.unshift([bookieOddsData["0"], 0, bookiechangeTime[0]]);
      var bookieLocalMovement = getMovementData(withLastMovement);
      bookieLocalMovement.shift();
    }

    const bookieMovementType = movementType[bookieId];
    // console.log('bookieOddsData', bookieMovementType);
    const bookmarker = {
      name: doFormatText(bookie["WebName"]),
      logo: bookie["logo"],
      url: bookie["Url"],
      localOdds: {
        type: bookieMovementType["0"],
        value: bookieOddsData["0"],
        movements: bookieLocalMovement,
        openingOdds: {
          date: moment.unix(bookieOpeningChangeTime["0"]).format("DD,MMM"),
          time: moment.unix(bookieOpeningChangeTime["0"]).format("HH:mm"),
          value: bookieOpeningOdd["0"],
        },
      },
    };

    if (Object.keys(bookieOddsData).length >= 2) {
      if (Object.keys(bookieOddsData).length == 2) {
        const withLastMovement = history[1][bookieId];
        withLastMovement.unshift([bookieOddsData["1"], 0, bookiechangeTime[1]]);
        var bookieDrawMovement = getMovementData(withLastMovement);
      } else {
        const withLastMovement = history[0][bookieId];
        withLastMovement.unshift([bookieOddsData["1"], 0, bookiechangeTime[1]]);
        var bookieDrawMovement = getMovementData(history[0][bookieId]);
      }

      bookieDrawMovement.shift();

      bookmarker.drawOdds = {
        type: bookieMovementType["1"],
        value: bookieOddsData["1"],
        movements: bookieDrawMovement,
        openingOdds: {
          date: moment.unix(bookieOpeningChangeTime["1"]).format("DD,MMM"),
          time: moment.unix(bookieOpeningChangeTime["1"]).format("HH:mm"),
          value: bookieOpeningOdd["1"],
        },
      };
    }

    if (Object.keys(bookieOddsData).length == 3) {
      const withLastMovement = history[2][bookieId];
      withLastMovement.unshift([bookieOddsData["2"], 0, bookiechangeTime[2]]);
      const bookieVisitorMovement = getMovementData(withLastMovement);
      bookieVisitorMovement.shift();

      bookmarker.visitorOdds = {
        type: bookieMovementType["2"],
        value: bookieOddsData["2"],
        movements: bookieVisitorMovement,
        openingOdds: {
          date: moment.unix(bookieOpeningChangeTime["2"]).format("DD,MMM"),
          time: moment.unix(bookieOpeningChangeTime["2"]).format("HH:mm"),
          value: bookieOpeningOdd["2"],
        },
      };
    }

    const highestValue = calculateStats(odds);

    return (
      <BookmarkerItem
        isCanceled={isCanceled}
        key={bookieId}
        bookmarker={bookmarker}
        bookieId={bookieId}
        highest1={highestValue.highest[0]}
        highestX={highestValue.highest[1]}
        highest2={highestValue.highest[2]}
        bookies={bookies}
      />
    );
  };

  const getOddsObjectData = (_matchDetails, ouKey) => {
    // console.log('ouKey', ouKey)

    const odds = _matchDetails.matchOdds.data.oddsdata.back[ouKey].odds;
    const openingOdd =
      _matchDetails.matchOdds.data.oddsdata.back[ouKey].openingOdd;
    const openingChangeTime =
      _matchDetails.matchOdds.data.oddsdata.back[ouKey].openingChangeTime;
    const history = Object.values(
      _matchDetails.matchOdds.data.oddsdata.back[ouKey].history
    );
    const movementType =
      _matchDetails.matchOdds.data.oddsdata.back[ouKey].movement;

    const changeTime =
      _matchDetails.matchOdds.data.oddsdata.back[ouKey].changeTime;

    return {
      odds,
      openingOdd,
      openingChangeTime,
      history,
      movementType,
      changeTime,
    };
  };

  const renderBookies = (key, bookies) => {
    if (_isloading) return null;
    if (
      !_matchDetails.matchOdds ||
      !_matchDetails.matchOdds.data ||
      !_matchDetails.matchOdds.data.oddsdata ||
      !_matchDetails.matchOdds.data.oddsdata.back
    ) {
      return (
        <tr className="text-center">
          <td className="text-center" colSpan={4}>
            There are no any odds Data found!
          </td>
          {/* _matchDetails.matchOdds?.data.message */}
        </tr>
      );
    }

    if (_matchDetails.matchOdds.data.oddsdata.back.length == 0)
      return (
        <div className="text-center"> There are no any odds Data found! </div>
      );

    var kdOkey = Object.keys(_matchDetails.matchOdds.data.oddsdata.back);

    // console.log('kdOkey', kdOkey)

    if (kdOkey.length == 1) {
      const {
        odds,
        openingOdd,
        openingChangeTime,
        history,
        movementType,
        changeTime,
      } = getOddsObjectData(_matchDetails, kdOkey[0]);
      const statastic = calculateStats(odds);
      // console.log('odds new', Object.values(odds)[0]);

      var cols = 3;
      // THIS CODE IS  FOR IN RESPONSE OF API SOMETIME WE GET {} OR SOMETIME []
      // console.log('DDDD', typeof Object.values(odds)[0])
      if (typeof Object.values(odds)[0] == "object") {
        cols = Object.values(Object.values(odds)[0]).length;
      } else {
        cols = Object.values(odds)[0].length;
      }

      const isCanceled =
        _matchDetails.match?.match["event-stage-name"] == "Canceled"
          ? true
          : false;

      return (
        <BookMarkerTable
          showBorder={false}
          activeMarket={activeMarket}
          statastic={statastic}
          cols={cols}
          match={match}
          matchOddData={_matchDetails.matchOdds.data.oddsdata}
          matchFullDetails={_matchDetails.match}
        >
          {Object.keys(odds).map((bookieId) => {
            return renderOddsBodyData({
              isCanceled,
              odds,
              openingOdd,
              openingChangeTime,
              history,
              movementType,
              changeTime,
              bookieId,
              bookies,
            });
          })}
        </BookMarkerTable>
      );
    }

    const getAccordionHeading = (ouKey, value) => {
      if (activeMarket.title == "Over/Under") {
        return `Over/Under +${numFormate(value.handicapValue)} ${
          ouKey.toLowerCase().match("sets") ? "Sets" : "Games"
        }`;
      } else {
        return ouKey;
      }
    };

    return (
      <Accordion defaultActiveKey="0" alwaysOpen>
        {Object.entries(_matchDetails.matchOdds.data.oddsdata.back).map(
          ([ouKey, value], index) => {
            const {
              odds,
              openingOdd,
              openingChangeTime,
              history,
              changeTime,
              movementType,
            } = getOddsObjectData(_matchDetails, ouKey);
            const statastic = calculateStats(odds);

            var cols = getMarketKeysCount(odds);
            // console.log('cols')
            const isCanceled =
              _matchDetails.match?.match["event-stage-name"] == "Canceled"
                ? true
                : false;
            return (
              <Accordion.Item
                style={{
                  borderBottom: value.isLast ? "2px solid #656ef5" : "",
                }}
                eventKey={index}
              >
                <Table>
                  <tbody>
                    <tr>
                      <td>
                        <Accordion.Header>
                          {value.mixedParameterName
                            ? value.mixedParameterName
                            : getAccordionHeading(ouKey, value)}
                        </Accordion.Header>
                      </td>
                      {Array.from(Array(cols).keys()).map((key, index) => {
                        return (
                          <td className="text-center pt-4" width={"10%"}>
                            {OddsFormat(statastic.average[index].toFixed(2))}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </Table>
                <Accordion.Body>
                  {Object.keys(odds).length !== 0 && (
                    <BookMarkerTable
                      odds={odds}
                      isCanceled={
                        _matchDetails.match?.match["event-stage-name"] ==
                        "Canceled"
                          ? true
                          : false
                      }
                      activeMarket={activeMarket}
                      showBorder={true}
                      statastic={statastic}
                      cols={getMarketKeysCount(odds)}
                      matchFullDetails={_matchDetails.match}
                    >
                      {Object.keys(odds).map((bookieId) => {
                        return renderOddsBodyData({
                          isCanceled,
                          odds,
                          openingOdd,
                          openingChangeTime,
                          history,
                          movementType,
                          bookieId,
                          changeTime,
                        });
                      })}
                    </BookMarkerTable>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            );
          }
        )}
      </Accordion>
    );
  };

  const [isResponsive, setIsResponsive] = useState(false);

  const metaTags = [
    { name: "description", content: meta.description },
    { name: "keywords", content: meta.meta.name.keywords },
  ];

  useMetaTags(metaTags, meta.title);

  useEffect(() => {
    setNavs([
      {
        title: params.sport,
        url: `/${stringToSlug(params.sport)}`,
      },
      {
        title: params.country,
        url: `/${stringToSlug(params.country)}/${stringToSlug(params.sport)}`,
      },
      {
        title: params.league,
        url: `/matches/${stringToSlug(params.sport)}/${stringToSlug(
          params.country
        )}/${stringToSlug(params.league)}`,
      },
      {
        title: hasMatchData(_matchDetails.matchData)
          ? `${_matchDetails.matchData["home"]} VS ${_matchDetails.matchData["away"]}`
          : "",
      },
    ]);
  }, [params, _matchDetails]);

  useEffect(() => {
    const handleResize = () => {
      const newIsResponsive = window.innerWidth < 768;
      setIsResponsive(newIsResponsive);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const hasSoccer = params.sport === "soccer";

  return (
    <>
      <div className={styles.bookMakersBg}>
        {/* <Helmet>
        <title>{meta.title}</title>
        <meta name="title" content={meta.title} />
        <meta name="description" content={meta.description} />
        <meta name="Keyword" content={meta.meta.name.keywords} />
      </Helmet> */}
        <Stack direction="horizontal" gap={2} className={styles.navbarDisplay}>
          <BreadcrumbComponent navs={navs} />
        </Stack>

        {hasMatchData(_matchDetails) && (
          <Stack
            direction="horizontal"
            className={`${styles.countryAndTeamName} mt-3`}
            gap={2}
          >
            <div>
              <span className={styles.largeLabel}>
                {_matchDetails.matchData["home"]}
              </span>

              <img
                src={getAssetImage(
                  _matchDetails.matchData["home-participant-images"][0]
                )}
                className="ps-3 pe-3"
              />
            </div>
            <div>
              <span>-</span>
            </div>
            <div className={styles.flexReverse}>
              <img
                src={getAssetImage(
                  _matchDetails.matchData["away-participant-images"][0]
                )}
                className="ps-3 pe-3"
              />
              <span className={styles.largeLabel}>
                {_matchDetails.matchData["away"]}
              </span>
            </div>
          </Stack>
        )}

        <Stack direction="horizontal" gap={2} className="mt-4">
          {/* <MycouponMsgBtn title={moment.unix(_matchDetails.matchData["date-start-timestamp"]).format('dddd, DD MMM YYYY, HH:mm')} /> */}
          {/* <MycouponMsgBtn title={moment.unix(_matchDetails?.matchData?.startDate).format('dddd, DD MMM YYYY, HH:mm')} /> */}
          <MycouponMsgBtn
            title={getDateAndTime(
              _matchDetails?.matchData?.startDate,
              "dddd, DD MMM YYYY, HH:mm"
            )}
          />
          {_matchDetails.matchData?.isFinished == true && (
            <MycouponMsgBtn
              title=<div style={{ color: "#656ef5" }}>
                <span
                  className="d-flex"
                  dangerouslySetInnerHTML={{
                    __html: _matchDetails.matchData.text,
                  }}
                ></span>
                {/* <span dangerouslySetInnerHTML={{ __html: props.timeStats }}></span> */}
              </div>
            />
          )}

          {/* <MycouponMsgBtn title={<div>Live Streaming</div>} /> */}
        </Stack>

        <Stack
          direction="horizontal"
          className={`${styles.matchTypes} mt-4`}
          gap={5}
        >
          {markets[sport].slice(0, isResponsive ? 3 : 5).map((market) => (
            <span
              onClick={() => {
                setActiveMarket(market);
              }}
              key={market.key}
              className={`${
                market.subKeys.indexOf(activeMarket.key) !== -1 ||
                market.subKeys[0].indexOf(activeMarket.key) !== -1
                  ? styles.numberMultiply
                  : styles.headerOfTeam
              } pointer`}
            >
              {market.title}
            </span>
          ))}

          {markets[sport].length > (isResponsive ? 3 : 5) && (
            <div className={`ms-auto ${styles.more}`}>
              <Nav>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={<span style={{ color: "#656ef5" }}>More</span>}
                >
                  {markets[sport]
                    .slice(isResponsive ? 3 : 5, markets[sport].length)
                    .map((market, index) => (
                      <NavDropdown.Item key={index}>
                        <NavTab
                          onClickTab={() => {
                            setActiveMarket(market);
                          }}
                          title={market.title}
                        />
                      </NavDropdown.Item>
                    ))}
                </NavDropdown>
              </Nav>
            </div>
          )}
        </Stack>

        <Stack className="mt-4" direction="horizontal" gap={2}>
          {/* <ButtonBg btnName="Full Time" /> */}
          {activeMarket.subMenu.map((subMarketName, index) => (
            <button
              key={index}
              onClick={() => {
                setSubMarket(activeMarket.subKeys[index]);
              }}
              className={`${styles.sectionOfTime} ${
                subMarket == activeMarket.subKeys[index] &&
                styles.sectionOfTimeBg
              } `}
            >
              {subMarketName}
            </button>
          ))}
        </Stack>
        <div className={`mt-4 ${styles.tableOutLine}`}>
          {_isloading && <Loading height={50} width={50} />}
          {renderBookies(activeMarket.key, bookies)}
        </div>
      </div>
      <div className={`mt-4 mb-3`}>
        <div className={`${myCouponStyle.leaguesHeading} p-3 fw-normal`}>
          {!_isloading &&
            hasMatchData(_matchDetails) &&
            `${doFormatText(
              params.match.replace(
                _matchDetails?.match?.match?.encodeEventId,
                ""
              )
            )} ${doFormatText(
              params.league
            )} match preview and predictions: This exciting matchup in the ${
              params.sport
            } ${hasSoccer ? "/ football" : ""}  ${doFormatText(
              params.league.toLowerCase().includes("league")
                ? params.league
                : `${params.league} league`
            )}  / tournament, held in ${doFormatText(
              params.country
            )}, is set to deliver thrilling ${doFormatText(params.sport)}${
              hasSoccer ? "/ football" : ""
            } action. OddsRun provides a detailed comparison of the highest odds and best betting lines for this match, covering markets like match winner, handicap betting, and spread betting. Whether you're an experienced bettor or new to online betting, our platform makes it easy to explore and compare sports odds from leading bookmakers, ensuring you secure the best value for your bets.
          `}
          <br />
          <br />
          {!_isloading &&
            hasMatchData(_matchDetails) &&
            `We also offer real-time tracking of odds movement for the ${doFormatText(
              params.match.replace(
                _matchDetails?.match?.match?.encodeEventId,
                ""
              )
            )} match, helping you place your bets at the ideal time to lock in the highest odds. Additional markets, such as under / over, handicap betting, and match winner occurrence, are also available, giving you multiple ways to approach your sports betting strategy.
          `}

          <br />
          <br />
          {!_isloading &&
            hasMatchData(_matchDetails) &&
            `You can explore the complete schedule of matches for the ${doFormatText(
              params.league.toLowerCase().includes("league")
                ? params.league
                : `${params.league} league`
            )} / tournament in ${doFormatText(
              params.country
            )} to plan your betting on upcoming fixtures. Many bookmakers provide bonuses and promotions, including free bets and deposit bonuses, to further enhance your betting experience. Whether you're placing pre-match or live bets, OddsRun ensures you have access to the best betting lines and latest odds for the ${doFormatText(
              params.match.replace(
                _matchDetails?.match?.match?.encodeEventId,
                ""
              )
            )} ${params.sport} ${
              hasSoccer ? "/ football" : ""
            } match, keeping you informed and ahead in your sports betting.


`}
        </div>
      </div>
    </>
  );
};

export default BookMakers;
