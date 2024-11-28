import React from "react";
import { Stack } from "react-bootstrap";
import { Icon } from "@iconify/react";

// Internal Components or Modules
import MycouponTool from "../MyCoupon/MycouponTool";
import BettingTool from "../MyCoupon/BettingTool";
import ButtonBg from "../ButtonBg.js/ButtonBg";

// Styles
import styles from "../../Pages/MatchWithOdds/MatchWithOdds.module.css";
import MycouponMsgBtn from "../MyCoupon/MycouponMsgBtn";

const PremierLeague = () => {
  return (
    <div className={styles.navbarDisplay}>
      <MycouponTool />
      <BettingTool />

      <div className={`${styles.premierLeagueBg} mt-3`}>
        <Stack direction="horizontal" gap={2}>
          <Icon icon="openmoji:soccer-ball" fontSize={"20px"} />
          <label>Premier League</label>
        </Stack>
        <hr></hr>

        <div className="mt-2 mb-4">
          <MycouponMsgBtn title="16 Dec 2023" />
        </div>

        <Stack direction="horizontal" gap={4}>
          <div className=" d-flex align-items-center">
            <Icon icon="ic:outline-watch-later" fontSize={"19px"} />
            <span className={`${styles.displayTime} ps-2`}>01:00</span>
          </div>
          <span className={`${styles.setLine} vr`}></span>
          <span className={styles.teamName}>Nottingham - Tottenham</span>
        </Stack>

        <div className="mt-3">
          <ButtonBg btnName="All Matches" />
        </div>
      </div>
    </div>
  );
};

export default PremierLeague;
