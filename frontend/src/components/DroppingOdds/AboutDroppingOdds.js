import React from "react";
import styles from "../../Pages/DroppingOdds/DroppingOdds.module.css";

const AboutDroppingOdds = (props) => {
  return (
    <div className={styles.aboutDroppingOdds}>
      <label>
        {props.title}{" "}
        {props.sureBets && (
          <span>
            - <span>{props.sureBets}</span>{" "}
          </span>
        )}{" "}
      </label>

      <p className={!props.disciption && styles.aboutdiscription}>
        {props.description ??
          "The following odds experienced a big drop recently. Yellow box shows average previous odds along with average current odds (in bold). Use filter to select time period, betting type and the minimum percentage of bookmakers with dropping odds."}
      </p>
    </div>
  );
};

export default AboutDroppingOdds;
