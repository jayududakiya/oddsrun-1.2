import React from "react";
import homeStyle from "../../Pages/Home/Home.module.css";
import droppingStyle from "../../Pages/DroppingOdds/DroppingOdds.module.css";
import { Col, Row, Stack } from "react-bootstrap";
import MatchPoint from "../MatchPoint/MatchPoint";
import { Icon } from "@iconify/react";
import Sport2 from "../../assets/image 7.png";
import MycouponMsgBtn from "../MyCoupon/MycouponMsgBtn";
import { NavLink } from "react-router-dom";
import { getAssetImage, getFlagIconKey } from "../../data/flag";
import { useDispatch } from "react-redux";
import { setCoupon } from "../../store/data.action";
import { toast } from "react-toastify";
import { OddsFormat, getDateAndTime, isSavedCoupon } from "../../data/formater";
import ReactTooltip from "react-tooltip";
import { getSportsIcon } from "../../data/SportsIcon";
import ReactDOMServer from "react-dom/server";
import moment from "moment";

const { getName } = require("country-list");

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

const NextMatchesDetails = (props) => {
  const { match, isSaveable = false, showWinder = false } = props;
  const dispatch = useDispatch();
  const sport = match.match.breadcrumbs.sport.name;
  // console.log("sport", sport);

  const awayCountryFlag = getName(match.match["away-country-two-chart-name"]);
  const homeCountryFlag = getName(match.match["home-country-two-chart-name"]);

  if (!match) {
    return null;
  }

  const cols = match?.match.cols.split("|");
  const oddsvalues =
    match.odds?.length != 0 ? Object.values(match?.odds[0]) : [];
  var greenIndex = -1;

  if (["win", "lost", "draw"].indexOf(match.match["home-winner"]) != -1) {
    greenIndex = getGreenIndex(match?.match, cols.length);
  }

  const handleSaveOddsToLocal = (col) => {
    if (!isSaveable) return false;
    var existingCoupon = {};
    try {
      if (isSavedCoupon(match.match.id, col, '1X2')) {
        // Delete from list

        const readFromLocal = localStorage.getItem("MY_COUPON");
        if (readFromLocal) {
          existingCoupon = JSON.parse(readFromLocal);
        }
        const market = '1X2';
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
        const market = '1X2';
        existingCoupon[`${match.match.id}__KD_MASTER_${market}`] = {
          col: col,
          match: match.match,
          odds: match.odds,
          originValue: odds[col].avg,
          market: market
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
    <div
      className={`${droppingStyle.matchSchedule} ${homeStyle.nextMatchDetails}`}
    >
      <Row>
        <Col md={cols.length == 3 ? 8 : 9} className={`${homeStyle.alignItem} `} >
          <Stack direction="horizontal" gap={3} className={`${homeStyle.nextMatchDisplay} ${homeStyle.colMdWidth}`} >
            <NavLink to={`/match${match.match.url}${match.match["date-start-timestamp"]}`} >
              <Stack direction="horizontal" gap={2}>
                <Stack className={homeStyle.flexWidthSm} direction="horizontal" gap={2} >
                  <Stack className={homeStyle.nextMatchDisplay} direction="horizontal" gap={2} >
                    <Stack direction="horizontal" gap={2} className={`${homeStyle.flexReverse} ${droppingStyle.dropdownFlex}`} >
                      <div className={`${droppingStyle.teamName} ${droppingStyle.textmore}`} >
                        {props.firstCountry}
                      </div>
                      {sport == "Tennis" ||
                        sport == "Boxing" ||
                        sport == "Darts" ||
                        sport == "Snooker" ||
                        sport == "Badminton" ||
                        sport == "Mma" ? (
                        <Icon fontSize={"25px"} icon={getFlagIconKey(homeCountryFlag)} />
                      ) : (
                        <img src={getAssetImage(match.match["home-participant-images"])} className="playerImage" alt="" />
                      )}
                    </Stack>
                    <Stack direction="horizontal" gap={2} className={`${homeStyle.secondCountry} ${droppingStyle.marginTop}`} >
                      {/* <img src={Sport2} alt="" /> */}
                      <img src={getAssetImage(match.match["away-participant-images"])} className="playerImage" alt="" />
                      <div className={`${droppingStyle.textmore} ${droppingStyle.teamName}  ${droppingStyle.spaceRemove} ms-2`} >
                        {props.secondCountry}
                      </div>
                    </Stack>
                  </Stack>
                  {props.timeFrom !== "" && props.timeTo != "" && (
                    <>
                      <Stack direction="horizontal" className={`ms-3 me-3 ${homeStyle.nextMatchDisplay} ${droppingStyle.odds_p}`}
                        data-html={true}
                        data-tip={ReactDOMServer.renderToString(
                          match.match.partialresult
                        )}
                      >
                        <div>{props.timeFrom}</div>
                        <span style={{ color: "black" }} className={`ms-1 me-1 ${homeStyle.displayNone}`} >
                          :
                        </span>
                        <div className={droppingStyle.marginTop}>
                          {props.timeTo}
                        </div>
                      </Stack>
                      <ReactTooltip place="top" />
                    </>
                  )}
                </Stack>
                <div className={homeStyle.displayNone}>
                  {sport == "Tennis" ||
                    sport == "Boxing" ||
                    sport == "Darts" ||
                    sport == "Snooker" ||
                    sport == "Badminton" ||
                    sport == "Mma" ? (
                    <Icon fontSize={"25px"} icon={getFlagIconKey(awayCountryFlag)} />
                  ) : (
                    <img src={getAssetImage(match.match["away-participant-images"])} className="playerImage" alt="" />
                  )}
                  <span className={`${droppingStyle.teamName} ${droppingStyle.textmore} ms-2`} >
                    {props.secondCountry}
                  </span>
                </div>
                <div className="d-flex ms-auto">
                  <div className="">
                    <div className={homeStyle.secondCountry}>
                      <MycouponMsgBtn
                        title={
                          window.localStorage.getItem("Timezone-object")
                            ? getDateAndTime(
                              match.match["date-start-timestamp"],
                              "DD MMMM, HH:mm"
                            )
                            : moment
                              .unix(match.match["date-start-timestamp"])
                              .format("DD MMMM, HH:mm")
                        }
                        bg={true}
                      />
                    </div>
                  </div>
                </div>
              </Stack>
            </NavLink>
          </Stack>
        </Col>
        <Col md={cols.length == 3 ? 4 : 3}>
          <Stack direction="horizontal" gap={1} className={`justify-content-end ${droppingStyle.marginTop} ${droppingStyle.spaceAround}`} >
            {cols?.map((col, index) => (
              <MatchPoint
                className={isSaveable ? "pointer" : ""}
                key={index}
                bgColor={isSavedCoupon(match.match.id, index, '1X2') ? "#ffe7a7" : greenIndex == index && showWinder && "#D4EFD1"}
                pointOne={col}
                pointTwo={OddsFormat(oddsvalues[index]?.avg)}
                onClick={() => oddsvalues[index]?.avg ? handleSaveOddsToLocal(index) : () => { }}
              ></MatchPoint>
            ))}
            {/* {props.nextMatch ? (
              <div
                className={`${droppingStyle.odds}`}
                style={{ backgroundColor: props.bgColor }}
              >
                <div>
                  <p className={droppingStyle.odds_p}>{props.pointOne}</p>
                  {props.children}
                  <p className={droppingStyle.plusPointNextMatch}>
                    {props.pointTwo}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <MatchPoint
                  pointOne={props.pointOne}
                  pointTwo={props.pointTwo}
                />
                <MatchPoint
                  pointOne={props.pointOne}
                  pointTwo={props.pointTwo}
                />
              </>
            )} */}
          </Stack>
        </Col>
      </Row>
    </div>
  );
};
export default NextMatchesDetails;
