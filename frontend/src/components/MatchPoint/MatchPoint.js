import React from "react";
import styles from "../../Pages/DroppingOdds/DroppingOdds.module.css";
import { OddsFormat } from "../../data/formater";

const MatchPoint = (props) => {
  const { pointTwo, onClick = () => { }, className = "" } = props;

  return (
    <div
      onClick={onClick}
      className={`${styles.odds} ${props.className} `}
      style={{ background: props.bgColor, height: props.heightSet }}
    >
      <div>
        <p className={styles.odds_p}>{props.pointOne}</p>
        {props.children}
        <p className={`${styles.floatingValue}`}>{pointTwo ? pointTwo : "-"}</p>
      </div>
    </div>
  );
};

export default MatchPoint;
