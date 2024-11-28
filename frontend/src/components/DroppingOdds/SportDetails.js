import React from "react";
import { Col, Row, Stack } from "react-bootstrap";
import { Icon } from "@iconify/react";

// Styles
import styles from "../../Pages/DroppingOdds/DroppingOdds.module.css";
import nextMatchStyle from "../../Pages/NextMatches/NextMatches.module.css";
import droppingStyles from "../../Pages/DroppingOdds/DroppingOdds.module.css";
import "../../App.css";

// Internal Components
import MatchPoint from "../MatchPoint/MatchPoint";
import MycouponMsgBtn from "../MyCoupon/MycouponMsgBtn";
import { NavLink } from "react-router-dom";
import { _getMarket, getAssetImage, getFlagIconKey } from "../../data/flag";
import { OddsFormat, getBookmarker, isSavedCoupon } from "../../data/formater";
import { useDispatch } from "react-redux";
import { setCoupon } from "../../store/data.action";
import { toast } from "react-toastify";
const { getName } = require("country-list");

const maxValueKeyIs = (data) => {
  let maxKey = null;
  let maxValue = Number.NEGATIVE_INFINITY;

  if (data.localDrops !== null && data.localDrops > maxValue) {
    maxKey = "local";
    maxValue = data.localDrops;
  }

  if (data.visitorDrops !== null && data.visitorDrops > maxValue) {
    maxKey = "visitor";
    maxValue = data.visitorDrops;
  }

  if (data.drawDrops !== null && data.drawDrops > maxValue) {
    maxKey = "draw";
    maxValue = data.drawDrops;
  }

  maxValue = Math.round(maxValue);
  return { maxKey, maxValue };
};

const SportDetails = (props) => {
  const {
    match,
    minus,
    isDroppingOdds = false,
    pastOdds = {},
    market = false,
    currentOdds = false,
    showMax = false,
    isSaveable = false,
    maxBookmarkers = false,
  } = props;
  const dispatch = useDispatch();

  if (!match) {
    return null;
  }

  const droppingCols = maxValueKeyIs(minus);

  if (droppingCols.maxKey == null && isDroppingOdds) return null;

  var oddsvalues = match.odds.length != 0 ? Object.values(match.odds[0]) : [];
  var pastOddsvalues = match.odds.length != 0 ? Object.values(pastOdds) : [];
  var dropField = match.odds.length != 0 ? Object.keys(match.odds[0]) : [];

  if (currentOdds) {
    oddsvalues = Object.values(currentOdds);
    dropField = Object.keys(currentOdds);
  }

  match.match.cols = _getMarket(oddsvalues);
  const cols = match.match.cols.split("|");
  const sport = match.match.breadcrumbs.sport.name;
  const getOddsValueBadedOnKey = (data, isMax = false) => {
    return isMax ? data?.max : data?.avg;
  };

  const awayCountryFlag = getName(match.match["away-country-two-chart-name"]);
  const homeCountryFlag = getName(match.match["home-country-two-chart-name"]);

  const handleSaveOddsToLocal = (col) => {
    if (isSaveable == false) return null;
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
        const market = "1X2";
        const odds = Object.values(match.odds[0]);
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

  return (
    <div className={styles.matchSchedule}>
      <Row>
        <Col md={props.sureBets ? 7 : 8}>
          <div
            className={`${props.display && styles.countryAndTime} ${
              styles.teamNameAndTime
            }`}
          >
            <NavLink
              to={`/match${match.match.url.replace("inplay-odds/", "")}${
                match.match["date-start-timestamp"]
              }/${match.match["id"]}`}
            >
              <Stack
                direction="horizontal"
                gap={2}
                className={styles.showMobile}
              >
                <div className={styles.dropdownFlex}>
                  {/* `${BROKER_SPORT_ASSEST}${match.match['home-participant-images']}` */}
                  {sport == "Tennis" ||
                  sport == "Boxing" ||
                  sport == "Darts" ||
                  sport == "Snooker" ||
                  sport == "Badminton" ||
                  sport == "Mma" ? (
                    <Icon
                      fontSize={"25px"}
                      icon={getFlagIconKey(homeCountryFlag)}
                    />
                  ) : (
                    <img
                      src={getAssetImage(
                        match.match["home-participant-images"]
                      )}
                      className="playerImage"
                      alt=""
                    />
                  )}
                  <span
                    className={`${styles.teamName} ${styles.textmore} ps-2`}
                  >
                    {props.countryOne}
                  </span>
                  <span className={`${styles.deshDisplay} ps-3`}>-</span>
                </div>

                <div className={`${styles.marginTop12} ${styles.dropdownFlex}`}>
                  {sport == "Tennis" ||
                  sport == "Boxing" ||
                  sport == "Darts" ||
                  sport == "Snooker" ||
                  sport == "Badminton" ||
                  sport == "Mma" ? (
                    <Icon
                      fontSize={"25px"}
                      icon={getFlagIconKey(awayCountryFlag)}
                    />
                  ) : (
                    <img
                      src={getAssetImage(
                        match.match["away-participant-images"]
                      )}
                      className="playerImage"
                      alt=""
                    />
                  )}
                  <span
                    className={`${styles.teamName} ${styles.textmore} ps-2`}
                  >
                    {props.countryTwo}
                  </span>
                </div>
              </Stack>
            </NavLink>

            <div className="d-flex align-items-center">
              <div
                className={`mt-4 ${styles.marginTop} ${
                  props.display && styles.marginTop0
                }`}
              >
                <MycouponMsgBtn title={props.timing} bg={true} />
              </div>
              {isDroppingOdds && market && (
                <div className={`${styles.marginTop} mt-4 ms-1`}>
                  <MycouponMsgBtn title={market} bg={true} />
                </div>
              )}
            </div>
          </div>
        </Col>
        <Col md={props.sureBets ? 5 : 4}>
          <Stack
            className={`${nextMatchStyle.scMargin} justify-content-end ${droppingStyles.spaceAround}`}
            direction="horizontal"
          >
            {cols?.map((col, index) =>
              droppingCols.maxKey == dropField[index] ? (
                <div key={index} className={`${styles.oddsOne} ms-2`}>
                  <Stack direction="vertical">
                    <p>{col}</p>
                    <span className={styles.pointCount}>
                      {OddsFormat(
                        getOddsValueBadedOnKey(pastOddsvalues[index], showMax)
                      )}
                    </span>
                    <Icon
                      className={styles.setCountToggle}
                      icon="iconamoon:arrow-down-2-fill"
                    />

                    <span className={styles.pointCount1}>
                      {OddsFormat(
                        getOddsValueBadedOnKey(oddsvalues[index], showMax)
                      )}
                    </span>
                  </Stack>
                  <div className={styles.pointInPercentage}>
                    {droppingCols.maxValue}%
                  </div>
                </div>
              ) : (
                <MatchPoint
                  key={index}
                  className={isSaveable == true && "pointer"}
                  bgColor={
                    isSavedCoupon(match.match.id, index, "1X2") && "#ffe7a7"
                  }
                  pointOne={col}
                  onClick={() =>
                    oddsvalues[index]?.avg
                      ? handleSaveOddsToLocal(index)
                      : () => {}
                  }
                  pointTwo={OddsFormat(
                    getOddsValueBadedOnKey(oddsvalues[index], showMax)
                  )}
                >
                  {maxBookmarkers && (
                    <img
                      className={styles.oddsImg}
                      src={getBookmarker(col, maxBookmarkers)}
                      alt=""
                    />
                  )}
                </MatchPoint>
              )
            )}

            {props.sureBets && (
              <div className={`${styles.oddsOne} ${styles.plusTool}  p-2`}>
                <Stack direction="vertical">
                  <b className="">Profit</b>
                  <span className={`${styles.pointCount}`}>
                    {props.sureBets.toFixed(2)}%
                  </span>
                  <Icon
                    className={`${styles.setCountToggle} ${styles.setCountToggleGreen}`}
                    icon="mdi:calculator"
                    fontSize={"26px"}
                  />
                </Stack>
              </div>
            )}
          </Stack>
        </Col>
      </Row>
    </div>
  );
};

export default SportDetails;
