import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BettingTool from "./BettingTool";
import TopEvent from "./TopEvent";
import style from "./MyCoupon.module.css";

const MyCoupon = () => {
  return (
    <div className={style.myCouponDisplay}>
      <BettingTool />
      <TopEvent />
    </div>
  );
};

export default MyCoupon;
