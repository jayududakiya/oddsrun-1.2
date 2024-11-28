import React, { Fragment } from "react";
import { Icon } from "@iconify/react";
import styles from "../../Pages/DroppingOdds/DroppingOdds.module.css";
import { doFormatText } from "../../data/formater";
import { NavLink } from "react-router-dom";

const BreadcrumbComponent = (props) => {
  const { navs = [] } = props;

  return (
    <div className={styles.pages}>
      <div className={styles.toggleName}>
        <NavLink className={"m-auto"} to={"/home"}>
          <span>Home</span>
        </NavLink>
      </div>
      {navs.map((nav, index) => (
        <Fragment key={index}>
          <Icon
            icon="mdi:keyboard-arrow-right"
            color="black"
            fontSize={"25px"}
            className="bread-icon"
          />
          <div
            key={index}
            className={
              index == navs.length - 1 ? styles.toggleName1 : styles.toggleName
            }
          >
            <NavLink
              className={"m-auto"}
              to={
                index == navs.length - 1
                  ? ""
                  : nav.url == "football"
                  ? "soccer"
                  : nav.url
              }
            >
              <span className={`${styles.textCapitalize}`}>
                {doFormatText(nav.title)}
              </span>
            </NavLink>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default BreadcrumbComponent;
