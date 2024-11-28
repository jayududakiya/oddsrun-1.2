import React, { Fragment, useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react";
import styles from "./MyCoupon.module.css";
import homeStyle from "../MyCoupon/MyCoupon.module.css";
import { Stack } from "react-bootstrap";
import MycouponMsgBtn from "./MycouponMsgBtn";
import MatchResult from "./MatchResult";
import GAME1 from "../../assets/image 11.jpg";
import ButtonBg from "../ButtonBg.js/ButtonBg";
import BettingTool from "./BettingTool";
import moment from "moment";
import { useSelector } from "react-redux";
import PostRequest from "../../services/PostRequest";
import BOOKIES_DATA from "../../data/bookies";
import SaveCoupons from "./SaveCoupons";

// function sortOdds(odds, index) {
//   return Object.keys(odds).sort((a, b) => {
//     const valueA = odds[a][index];
//     const valueB = odds[b][index];
//     // If values are equal, maintain the original order
//     if (valueA === valueB) {
//       return Number(a) - Number(b);
//     }
//     // Sort based on the value at the specified index
//     return valueB - valueA; // Change to valueA - valueB for ascending order
//   });
// }
// const getCol = (key, count) => {
//   return count == 3 && key == 1 ? "X" : key + 1 >= 3 ? key : key + 1;
// };
// const _getMatchResult = (match, colIndex, marketLength) => {
//   if (!match) return "";
//   console.log("match,colIndex", match, colIndex, marketLength);
//   if (!match.isFinished) return "";
//   if (match.isFinished) {
//     if (marketLength == 3) {
//       switch (colIndex) {
//         case 0:
//           if (Number(match.homeResult) > Number(match.awayResult)) {
//             return "WON";
//           } else {
//             return "LOSS";
//           }
//         case 1:
//           if (Number(match.homeResult) == Number(match.awayResult)) {
//             return "WON";
//           } else {
//             return "LOSS";
//           }
//         case 2:
//           if (Number(match.homeResult) < Number(match.awayResult)) {
//             return "WON";
//           } else {
//             return "LOSS";
//           }
//         default:
//           return "";
//       }
//     } else {
//       switch (colIndex) {
//         case 0:
//           if (Number(match.homeResult) > Number(match.awayResult)) {
//             return "WON";
//           } else {
//             return "LOSS";
//           }
//         case 1:
//           if (Number(match.homeResult) < Number(match.awayResult)) {
//             return "WON";
//           } else {
//             return "LOSS";
//           }
//         default:
//           return "";
//       }
//     }
//   }
//   return "";
// };
const CouponDetails = () => {
  // const _coupons = useSelector((state) => state.dataReducer.coupons);
  // const [coupons, setCoupons] = useState({});
  // const [totalCoupon, setTotalCoupon] = useState(0);
  // const [bookiesOdds, setBookiesOdds] = useState([]);
  // const [bookiesValues, setBookiesValues] = useState({});
  // const [matchUpdatedResult, settMatchUpdatedResult] = useState({});
  // const loadMatchOdds = async () => {
  //   const matchKeys = Object.keys(coupons);
  //   const mainOdds = [];
  //   const updatedResult = {};
  //   for (let index = 0; index < matchKeys.length; index++) {
  //     const element = coupons[matchKeys[index]];
  //     var url = element.match.url.replace("inplay-odds/", "");
  //     try {
  //       const market = element.match.cols.split("|");
  //       const data = {
  //         match: url,
  //         market: market.length == 3 ? "1X2" : "haot",
  //         // date: moment.unix(date).format("YYYYMMDD"),
  //       };
  //       const response = await PostRequest("/match/details", data);
  //       var oddsData = [];
  //       if (
  //         response &&
  //         response.matchOdds &&
  //         response.matchOdds.data.oddsdata &&
  //         response.matchOdds.data.oddsdata.back
  //       ) {
  //         const fullTimeKey = Object.keys(
  //           response.matchOdds.data.oddsdata.back
  //         )[0];
  //         const odds = response.matchOdds.data.oddsdata.back[fullTimeKey].odds;
  //         mainOdds.push({
  //           col: element.col,
  //           odds: odds,
  //         });
  //         // var sorted = sortOdds(odds,element.col);
  //         // sorted.map(bookie => {
  //         //   oddsData.push({
  //         //     bookie : BOOKIES_DATA[bookie],
  //         //     odds : odds[bookie],
  //         //     activeOdd : odds[bookie][element.col],
  //         //   })
  //         // })
  //         // console.log('oddsData',oddsData)
  //       }
  //       if (response && response.matchData) {
  //         updatedResult[`${element.match.id}__KD_MASTER`] = response.matchData;
  //       }
  //       // setBookiesOdds(oddsData)
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   }
  //   const finalBookiesData = {};
  //   if (mainOdds.length > 0) {
  //     mainOdds.map((item, index) => {
  //       const bookiesIdes = Object.keys(item.odds);
  //       bookiesIdes.map((bookieID) => {
  //         const v = mainOdds[index].odds[bookieID];
  //         if (finalBookiesData[bookieID]) {
  //           finalBookiesData[bookieID] =
  //             finalBookiesData[bookieID] * v[item.col];
  //         } else {
  //           finalBookiesData[bookieID] = v[item.col];
  //         }
  //       });
  //     });
  //   }
  //   const sortedKeys = Object.keys(finalBookiesData).sort(
  //     (a, b) => finalBookiesData[b] - finalBookiesData[a]
  //   );
  //   setBookiesOdds(sortedKeys);
  //   setBookiesValues(finalBookiesData);
  //   settMatchUpdatedResult(updatedResult);
  // };
  // useEffect(() => {
  //   loadMatchOdds();
  // }, [coupons]);
  // useEffect(() => {
  //   const readFromLocal = localStorage.getItem("MY_COUPON");
  //   if (readFromLocal) {
  //     try {
  //       const parseData = JSON.parse(readFromLocal);
  //       setCoupons(parseData);
  //       setTotalCoupon(Object.keys(parseData).length);
  //     } catch (error) {}
  //   }
  // }, [_coupons]);
  return (
    <div className={styles.myCouponDisplay}>
      <SaveCoupons />
      <BettingTool />
    </div>
  );
};
export default CouponDetails;
