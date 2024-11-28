import React, { useMemo } from "react";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import styles from "../../Pages/DroppingOdds/DroppingOdds.module.css";
import { stringToSlug } from "../../data/formater";

const SportsNav = (props) => {
  const leagueURL = useMemo(
    () => props.tournamentUrl || stringToSlug(props.language),
    [props.tournamentUrl, props.language]
  );

  return (
    <div className={styles.sportsAndCountry}>
      <div>
        <div
          className={`${styles.subSportsAndCountry}`}
          style={{ width: "max-content" }}
        >
          <NavLink to={`/${stringToSlug(props.title)}`}>
            <Icon
              icon={props.icon}
              className={`me-2 ${styles.iconFont}`}
              fontSize={"20px"}
            />
            <span className={`${styles.sportAndCountyName}`}>
              {props.title === "soccer" ? "Football" : props.title}
            </span>
          </NavLink>
          <span className="ps-3">-</span>
        </div>
      </div>

      <div className={styles.sportsnavicon}>
        <div className={styles.subSportsAndCountry}>
          <Icon
            icon={props.countryIcon}
            className={`me-2 ${styles.sportsnavicon} ${styles.iconFont}`}
            fontSize={"24px"}
          />
          <div className={styles.sportAndCountyName}>
            <NavLink
              to={`/${stringToSlug(props.title)}/${stringToSlug(
                props.countryName
              )}`}
            >
              {props.countryName}
            </NavLink>{" "}
            /
            <NavLink
              to={`/matches/${stringToSlug(props.title)}/${stringToSlug(
                props.countryName
              )}/${leagueURL}`}
            >
              {props.language}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsNav;
