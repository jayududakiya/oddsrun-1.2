import React from "react";
import styles from "./MyCoupon.module.css";
import BettingTool from "./BettingTool";
import SaveCoupons from "./SaveCoupons";

const CouponDetails = () => {
  return (
    <div className={styles.myCouponDisplay}>
      <SaveCoupons />
      <BettingTool />
    </div>
  );
};
export default CouponDetails;
