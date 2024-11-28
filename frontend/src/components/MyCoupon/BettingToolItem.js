import React from "react";
import styles from "./MyCoupon.module.css";
import { Stack } from "react-bootstrap";
import { Icon } from "@iconify/react";

const BettingToolItem = (props) => {
  return (
    <>
      <div className={styles.gap10}>
        <Icon icon={props.icon} className={styles.bettingItemIcon} />

        <div className={styles.bettingItem}>{props.title}</div>
      </div>
    </>
  );
};

export default BettingToolItem;
