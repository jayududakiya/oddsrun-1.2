import React, { useEffect, useState } from "react";
import PostRequest from "../../services/PostRequest";
import styles from "../../components/MyCoupon/MyCoupon.module.css";
import MycouponMsgBtn from "./MycouponMsgBtn";
import MatchResult from "./MatchResult";
import { Stack } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSelector } from "react-redux";
import homeStyle from "../MyCoupon/MyCoupon.module.css";
import moment from "moment";
import BOOKIES_DATA from "../../data/bookies";
import { OddsFormat, doFormatText, getDateAndTime } from "../../data/formater";
import Loading from "../../Loader/Loading";
import { markets } from "../../data/markets";
import { NavLink } from "react-router-dom";

function sortOdds(odds, index) {
  return Object.keys(odds).sort((a, b) => {
    const valueA = odds[a][index];
    const valueB = odds[b][index];
    // If values are equal, maintain the original order
    if (valueA === valueB) {
      return Number(a) - Number(b);
    }
    // Sort based on the value at the specified index
    return valueB - valueA; // Change to valueA - valueB for ascending order
  });
}

const getCol = (key, count) => {
  return count == 3 && key == 1 ? "X" : key + 1 >= 3 ? key : key + 1;
};
const _getMatchResult = (match, colIndex, marketLength) => {
  if (match?.eventStageName == "Canceled") {
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

const SaveCoupons = () => {
  const _coupons = useSelector((state) => state.dataReducer.coupons);
  const [coupons, setCoupons] = useState({});
  const [totalCoupon, setTotalCoupon] = useState(0);
  const [bookiesOdds, setBookiesOdds] = useState([]);
  const [bookiesValues, setBookiesValues] = useState({});
  const [matchUpdatedResult, settMatchUpdatedResult] = useState({});
  const [loader, setLoader] = useState(false);
  const [bookies, setBookies] = useState([]);

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

  const loadMatchOdds = async () => {
    setLoader(true);
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
          // var sorted = sortOdds(odds,element.col);
          // sorted.map(bookie => {
          //   oddsData.push({
          //     bookie : BOOKIES_DATA[bookie],
          //     odds : odds[bookie],
          //     activeOdd : odds[bookie][element.col],
          //   })
          // })
          // console.log('oddsData',oddsData)
        }
        if (response && response.matchData) {
          updatedResult[`${element.match.id}__KD_MASTER_${market}`] =
            response.matchData;
        }
        // setBookiesOdds(oddsData)
      } catch (error) {
        console.log("error", error);
      }
    }
    const finalBookiesData = {};
    if (mainOdds.length > 0) {
      mainOdds.map((item, index) => {
        const bookiesIdes = Object.keys(item.odds);
        bookiesIdes.map((bookieID) => {
          const v = mainOdds[index].odds[bookieID];
          if (finalBookiesData[bookieID]) {
            finalBookiesData[bookieID] =
              finalBookiesData[bookieID] * v[item.col];
          } else {
            finalBookiesData[bookieID] = v[item.col];
          }
        });
      });
    }
    const sortedKeys = Object.keys(finalBookiesData).sort(
      (a, b) => finalBookiesData[b] - finalBookiesData[a]
    );
    setBookiesOdds(sortedKeys);
    setBookiesValues(finalBookiesData);
    settMatchUpdatedResult(updatedResult);
    setLoader(false);
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
        setTotalCoupon(Object.keys(parseData).length);
      } catch (error) {}
    }
  }, [_coupons]);

  // JSX

  return (
    <div>
      <div className={`${styles.myCouponBg} p-4`}>
        <Stack direction="horizontal" gap={2}>
          <Icon
            icon="pepicons-pencil:letter-open"
            className={homeStyle.myCouponIcon}
          />
          <span className={homeStyle.myCouponTitle}>My Coupon</span>
          <div className={homeStyle.MyCouponCount}>{totalCoupon}</div>
        </Stack>
        {Object.keys(coupons).map((key) => {
          const match = coupons[key].match;
          let match2 = {
            match: match,
          };

          const odds = Object.values(coupons[key].odds[0]);
          const market = Object.keys(coupons[key].odds[0]);
          const colIndex = coupons[key].col;
          let result = "";
          let timeStats = "";
          if (matchUpdatedResult[key]?.text?.includes("(")) {
            const resultArray = matchUpdatedResult[key]?.text?.split("(");
            result = resultArray[0].trim();
            timeStats = "(" + resultArray[1] || "";
          } else {
            result = matchUpdatedResult[key]?.text;
          }
          return (
            // <NavLink
            //   to={`/match${match.url}${match["date-start-timestamp"]} /${match["id"]}`}
            //   state={match2}
            // >

            <MatchResult
              to={`/match${match.url}${match["date-start-timestamp"]} /${match["id"]}`}
              state={match2}
              key={key}
              id={key}
              title={match.name}
              matchResult={_getMatchResult(
                matchUpdatedResult[key],
                colIndex,
                market.length
              )}
              market={
                coupons[key].market
                  ? coupons[key].market
                  : market.length == 3
                  ? "1X2"
                  : "H/A"
              }
              // market={market.length == 3 ? "1X2" : "H/A"}
              MycouponMsgBtn={getDateAndTime(match["date-start-timestamp"])}
              wonMatches={odds[colIndex].avg}
              result={result}
              timeStats={timeStats}
              tip={getCol(colIndex, market.length)}
            />
            // </NavLink>
          );
        })}

        {totalCoupon != 0 && (
          <div className={`mt-4 ${styles.bestOdds}`}>
            <div
              className={`${styles.bestOddsTitle} d-flex justify-content-between`}
            >
              Best odds / {bookiesOdds.length} bookmakers
              {loader && (
                <span className="mt-0">
                  <Loading height="30px" />
                </span>
              )}
            </div>
            <div className="mt-2">
              {bookiesOdds.slice(0, 3).map((item, index) => {
                const bookie = BOOKIES_DATA[item];
                return (
                  <div key={index} className="mt-2">
                    <MycouponMsgBtn
                      width={true}
                      title={
                        <div className={styles.logoOfOdds}>
                          {/* <img className={styles.bestOddsItem} src={GAME1} alt="" /> */}
                          <a
                            href={getURL(bookie?.WebUrl)}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              display: 'flex',
                              gap: '5px',
                            }}
                          >
                            <h6> {bookie?.WebName} </h6>
                            <Icon
                              icon="bi:box-arrow-up-right"
                              className={styles.bestOddsItemIcon}
                            />
                          </a>

                          <p className={`ms-auto`}>
                            {OddsFormat(bookiesValues[item].toFixed(2))}
                          </p>
                        </div>
                      }
                    />
                  </div>
                );
              })}
            </div>
            <NavLink to={"/coupon"}>
              <div className={`${styles.bestOddsTitle} mt-3`}>
                <u>Campare all bookmakers</u>
              </div>
            </NavLink>
          </div>
        )}
        {/* <p className={`mt-3 ${styles.compare}`}>Compare all bookmakers</p>
  <Stack direction="horizontal" gap={2} className="mt-3">
    <ButtonBg btnName="Save" />
    <MycouponMsgBtn
      title={<div className="m-1">Save as predictions</div>}
    />
  </Stack> */}
        {/* <Stack direction="horizontal" gap={2} className="mt-4">
          <input
            type="checkbox"
            className={styles.myCheckbox}
            style={{ borderColor: "#FF0000" }}
          />
          <div>
            <label className={styles.checkEmail}>Results by email</label>
          </div>
        </Stack> */}
        {/* <Stack direction="horizontal" gap={2} className="mt-4">
    <Icon
      icon="system-uicons:cross-circle"
      style={{ fontSize: "24px", color: "#FF0000" }}
    />
    <p className={styles.bestOddsCancle}>
      Ntondele Zinga T. - Girelle C.
    </p>
  </Stack> */}
        {/* <div className="mt-4">
    <MycouponMsgBtn title="My saved coupons (0)" />
  </div> */}
      </div>
    </div>
  );
};

export default SaveCoupons;
