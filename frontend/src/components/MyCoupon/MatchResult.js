import React, { useState } from "react";
import styles from "./MyCoupon.module.css";
import { Stack } from "react-bootstrap";
import { Icon } from "@iconify-icon/react";
import MycouponMsgBtn from "./MycouponMsgBtn";
import { useDispatch } from "react-redux";
import { setCoupon } from "../../store/data.action";
import { OddsFormat } from "../../data/formater";
import { NavLink } from "react-router-dom";

const MatchResult = (props) => {
  const dispatch = useDispatch();

  const handleRemoveMatch = () => {
    const readFromLocal = localStorage.getItem("MY_COUPON");
    if (readFromLocal) {
      try {
        const parseData = JSON.parse(readFromLocal);
        delete parseData[props.id];
        localStorage.setItem("MY_COUPON", JSON.stringify(parseData));
        dispatch(setCoupon());
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const _getStyle = () => {
    if (props.matchResult == "WON") {
      return styles.wonMatch;
    }

    if (props.matchResult == "LOSS") {
      return styles.otMatch;
    }

    return "";
  };

  return (
    <>
      <hr />
      <Stack direction="horizontal" gap={2}>
        <div className={styles.correct}>
          <Icon icon="charm:tick" />
        </div>
        <NavLink
          to={props.to}
          state={props.state}
        >
          <div className={`${styles.playerName && styles.couponTitle}`}>{props.title}</div>
        </NavLink>
        <Icon
          onClick={handleRemoveMatch}
          icon="system-uicons:cross-circle"
          style={{ fontSize: "24px", color: "black", cursor: "pointer" }}
          className="ms-auto"
        />
      </Stack>
      <Stack direction="horizontal" className="mt-4">
        <p className={styles.wonTitle}>
          Tip: {props.tip} ({props.market}) - {props.matchResult}
        </p>
        <div className={`ms-auto ${styles.matchResult} ${_getStyle()}`}>
          {OddsFormat(props.wonMatches)}
        </div>
      </Stack>
      <Stack direction="horizontal" className="mt-3">
        <MycouponMsgBtn title={props.MycouponMsgBtn} />
        <div className={`${styles.finalResult} ${styles.couponResult}`}>
          <div dangerouslySetInnerHTML={{ __html: props.result?.replace(/&nbsp;/g, ' ') }}></div>
          <div className="d-flex justify-content-end" dangerouslySetInnerHTML={{ __html: props.timeStats }}></div>
        </div>
      </Stack>
    </>
  );
};

export default MatchResult;
