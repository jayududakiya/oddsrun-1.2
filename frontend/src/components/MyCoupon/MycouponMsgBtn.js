import React from "react";
import styles from "./MyCoupon.module.css";

const MycouponMsgBtn = (props) => {
  const { isActive = false, onClick = () => {} } = props;

  return (
    <div
      onClick={onClick}
      className={`${styles.savedCoupon} ${
        props.width ? "" : styles.savedCouponWidth
      } ${props.bg && styles.savedCouponBg} ps-3 pe-3 pt-2 pb-2 ${
        isActive && styles.activeButton
      }`}
    >
      {props.title}
    </div>
  );
};

export default MycouponMsgBtn;
