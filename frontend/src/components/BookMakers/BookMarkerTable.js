import React from "react";
import { Icon } from "@iconify/react";
import { Table } from "react-bootstrap";
import styles from "../../Pages/MatchWithOdds/MatchWithOdds.module.css";
import { OddsFormat, isSavedCoupon } from "../../data/formater";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCoupon } from "../../store/data.action";
import { useParams } from "react-router-dom";

const getCol = (key, count) => {
  return count === 3 && key === 1 ? "X" : key + 1 >= 3 ? key : key + 1;
};

const BookMarkerTable = (props) => {
  const params = useParams();
  const { cols = 3, statastic, matchFullDetails, activeMarket } = props;
  const dispatch = useDispatch();

  const handleSaveOddsToLocal = (col) => {
    var existingCoupon = {};
    const matchId = params.id;
    try {
      if (isSavedCoupon(matchId, col, activeMarket.key)) {
        const readFromLocal = localStorage.getItem("MY_COUPON");
        if (readFromLocal) {
          existingCoupon = JSON.parse(readFromLocal);
        }

        delete existingCoupon[`${matchId}__KD_MASTER_${activeMarket.key}`];
        localStorage.setItem(`MY_COUPON`, JSON.stringify(existingCoupon));
        dispatch(setCoupon());
        toast("Coupon Removed");
      } else {
        const readFromLocal = localStorage.getItem("MY_COUPON");
        if (readFromLocal) {
          existingCoupon = JSON.parse(readFromLocal);
        }

        var odds =
          cols == 3
            ? [
                {
                  draw: {
                    avg: statastic.average[0],
                    max: statastic.highest[0],
                  },
                  local: {
                    avg: statastic.average[1],
                    max: statastic.highest[1],
                  },
                  visitor: {
                    avg: statastic.average[2],
                    max: statastic.highest[2],
                  },
                },
              ]
            : [
                {
                  local: {
                    avg: statastic.average[0],
                    max: statastic.highest[0],
                  },
                  visitor: {
                    avg: statastic.average[1],
                    max: statastic.highest[1],
                  },
                },
              ];

        existingCoupon[`${matchId}__KD_MASTER_${activeMarket.key}`] = {
          col: col,
          match: matchFullDetails.match,
          odds: odds,
          originValue: odds[0].avg,
          market: activeMarket.key,
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
    <Table
      className={`${styles.tableBookmakers} ${
        props.showBorder && styles.showBorder
      } p-1`}
    >
      <thead>
        <tr className="">
          <td className={`${styles.tableHeading} ${styles.lightBg}`}>
            Bookmakers{" "}
            <Icon
              icon="octicon:arrow-up-24"
              color="#656ef5"
              fontSize={"15px"}
            />
          </td>
          {Array.from(Array(cols).keys()).map((key, index) => {
            return (
              <td
                className={`${styles.profitLossAmount} ${styles.lightBg}`}
                key={index}
              >
                <span className="pe-1"> {getCol(key, cols)} </span>
                <Icon
                  icon="octicon:arrow-up-24"
                  color="#656ef5"
                  fontSize={"15px"}
                />
              </td>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {props.children}
        <tr className={styles.lightBg}>
          <td className={styles.lightBg}>Average</td>
          {Array.from(Array(cols).keys()).map((key, index) => {
            return (
              <td className={`${styles.lightBg} text-center`} key={index}>
                {OddsFormat(statastic.average[index].toFixed(2))}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className={styles.lightBg}>Highest</td>
          {Array.from(Array(cols).keys()).map((key, index) => {
            return (
              <td className={`${styles.lightBg} text-center`} key={index}>
                {OddsFormat(statastic.highest[index].toFixed(2))}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className={styles.lightBg}>My Coupon</td>
          {Array.from(Array(cols).keys()).map((key, index) => {
            return (
              <td
                className={`${styles.lightBg} text-center ${styles.addCouponSave}`}
                key={index}
              >
                {isSavedCoupon(params.id, index, activeMarket.key) ? (
                  <Icon
                    onClick={() => {
                      handleSaveOddsToLocal(index);
                    }}
                    fontSize={25}
                    color="red"
                    icon="octicon:diff-removed-24"
                  />
                ) : (
                  <Icon
                    onClick={() => {
                      handleSaveOddsToLocal(index);
                    }}
                    fontSize={25}
                    icon="icon-park-outline:add"
                  />
                )}
              </td>
            );
          })}
        </tr>
      </tbody>
    </Table>
  );
};

export default BookMarkerTable;
