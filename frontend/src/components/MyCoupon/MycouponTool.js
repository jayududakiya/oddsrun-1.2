import React from "react";
import { Icon } from "@iconify-icon/react";
import styles from "./MyCoupon.module.css";
import MycouponMsgBtn from "./MycouponMsgBtn";
import { Stack } from "react-bootstrap";

const MycouponTool = () => {
  return (
    <>
      {/* <div className={`${styles.myCouponBg}`}>
        <Stack direction="horizontal" gap={2}>
          <Icon
            icon="pepicons-pencil:letter-open"
            className={styles.myCouponIcon}
          />

          <span className={styles.myCouponTitle}>My Coupon</span>

          <div className={styles.MyCouponCount}>2</div>
        </Stack>
        <hr />
        <p className={styles.myCouponDescription}>
          No bets selected yet. To add a bet click the odds while browsing
          through OddsPortal!
        </p>
        <MycouponMsgBtn title="My saved coupons (0)" />
      </div> */}
    </>
  );
};

export default MycouponTool;
