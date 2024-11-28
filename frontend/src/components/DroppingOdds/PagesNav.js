import React from "react";
import { Icon } from "@iconify/react";
import styles from "../../Pages/DroppingOdds/DroppingOdds.module.css";
import { doFormatText } from "../../data/formater";
import { NavLink } from "react-router-dom";

const PagesNav = (props) => {
  return (
    <div className={styles.pages}>
      <div className={styles.toggleName}>
        <NavLink className={styles.navLi} to={"/home"}>
          <span>Home</span>
        </NavLink>
        <Icon
          icon="mdi:keyboard-arrow-right"
          color="black"
          fontSize={"25px"}
          className="ms-3"
        />
      </div>
      <div className={styles.toggleName}>
        <NavLink
          className={styles.navLi}
          to={`/${
            props.sportsName !== "Odds Comparison"
              ? props.sportsName
              : "droppingOdds"
          }`}
        >
          <span>
            {doFormatText(
              props.sportsName == "soccer" ? "football" : props.sportsName
            )}
          </span>
        </NavLink>
        {props.sportsName && (
          <Icon
            icon="mdi:keyboard-arrow-right"
            color="black"
            fontSize={"25px"}
            className="ms-3"
          />
        )}
      </div>
      <span className={styles.toggleName1 && styles.navLi}>
        {doFormatText(props.nextTab)}
      </span>
    </div>
  );
};

export default PagesNav;
