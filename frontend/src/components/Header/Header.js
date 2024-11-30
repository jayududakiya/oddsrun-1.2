import React, { Fragment, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Header.module.css";
import { Icon } from "@iconify/react";
import { Col, Nav, NavDropdown, Row, Stack } from "react-bootstrap";
import ButtonBg from "../ButtonBg.js/ButtonBg";
import USERIMG from "../../assets/Ellipse 1.svg";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import timezones from "timezones-list";
import moment from "moment-timezone";
import SearchBtn from "../SearchForm/SearchBtn";
import { getDateAndTime } from "../../data/formater";
import { TIMEZONE_ALIASES } from "../../data/TimezoneAliases";

const Header = () => {
  const [timezone, setTimezone] = useState({});
  const [oddsFormat, setOddsFormat] = useState(
    window.localStorage.getItem("Odds-Format")
  );

  // Handle selection of odds format
  const handleSelect = (eventKey) => {
    window.localStorage.setItem("Odds-Format", eventKey);
    setOddsFormat(eventKey);
  };

  // Handle selection of timezone
  const handleSelectedTime = (eventKey) => {
    window.localStorage.setItem("Timezone-object", eventKey);
    window.location.reload();
  };

  // Default timezone format if none is selected
  const formattedDate = timezone
    ? getDateAndTime(moment().unix())
    : moment().format("DD MMM HH:mm");

  // User related functions
  const userVerify = window.localStorage.getItem("token");
  const userName = window.localStorage.getItem("username");

  // Logout handler
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
    toast.success("You have been logged out successfully");
    window.location.reload();
  };

  // Fetch timezone when the component mounts
  useEffect(() => {
    let storedTimezone = JSON.parse(
      window.localStorage.getItem("Timezone-object")
    );
    if (!storedTimezone) {
      const timezoneAliases = TIMEZONE_ALIASES;
      let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      timezone = timezoneAliases[timezone] || timezone;
      const matchedTimezone = timezones.find((tz) =>
        tz.label.includes(timezone)
      );
      if (matchedTimezone) {
        setTimezone(matchedTimezone);
        window.localStorage.setItem(
          "Timezone-object",
          JSON.stringify(matchedTimezone)
        );
      }
    } else {
      setTimezone(storedTimezone);
    }
  }, []);

  return (
    <Fragment>
      <div className={`${styles.headerBg} ${styles.hideHeader}`}>
        <div className={`${styles.mainHeader} flex-wrap`}>
          <div className={styles.oddsFormate}>
            <span>
              <div>Odds format:</div>{" "}
              <span>
                <Nav>
                  <NavDropdown
                    id="nav-dropdown-dark-example"
                    title={
                      <span style={{ color: "#656ef5" }}>
                        {oddsFormat || "EU Odds"}
                      </span>
                    }
                    onSelect={handleSelect}
                  >
                    <NavDropdown.Item eventKey="EU Odds">
                      EU Odds
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="Fractional Odds">
                      Fractional Odds
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="Money line odds">
                      Money line odds
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </span>
            </span>
          </div>

          {/* Timezone Section - Ensure it is shown without delay */}
          <div className={`${styles.oddsFormate} ${styles.timeZone}`}>
            <div>
              Time Zones :<span> {formattedDate} ,</span>
            </div>

            <div>
              <Nav>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={
                    <span style={{ color: "#656ef5", padding: "0px" }}>
                      {timezone?.label || "Select Timezone"}
                    </span>
                  }
                  onSelect={handleSelectedTime}
                >
                  <div className={`${styles.dropDownItem}`}>
                    {timezones.map((time, index) => (
                      <NavDropdown.Item
                        eventKey={JSON.stringify(time)}
                        key={index}
                      >
                        {time.label}
                      </NavDropdown.Item>
                    ))}
                  </div>
                </NavDropdown>
              </Nav>
            </div>
          </div>

          {userVerify ? (
            <button className={styles.btnLogin} onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Stack direction="horizontal" gap={3} className={styles.mt}>
              <NavLink to="/login">
                <button className={styles.btnLogin}>Login</button>
              </NavLink>
              <NavLink to="/register">
                <ButtonBg btnName="Register" />
              </NavLink>
            </Stack>
          )}
        </div>

        <div className={styles.header}>
          <Row>
            <Col xs={12} xl={7}>
              <div className={styles.menubar}>
                <nav>
                  <ul>
                    <li>
                      <NavLink
                        to={"/"}
                        className={({ isActive }) =>
                          `${isActive ? styles.active : ""}`
                        }
                      >
                        Home
                      </NavLink>
                    </li>{" "}
                    <li>
                      <NavLink
                        to={"/soccer/next-matches"}
                        className={({ isActive }) =>
                          `${isActive ? styles.active : ""}`
                        }
                      >
                        Next Matches
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/droppingOdds"}
                        className={({ isActive }) =>
                          `${isActive ? styles.active : ""}`
                        }
                      >
                        Dropping odds
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/sure-bets"}
                        className={({ isActive }) =>
                          `${isActive ? styles.active : ""}`
                        }
                      >
                        Sure Bets
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/bookmakers"}
                        className={({ isActive }) =>
                          `${styles.removerBorder}  ${
                            isActive ? styles.active : ""
                          }`
                        }
                      >
                        Bookmakers
                      </NavLink>
                    </li>
                    <li>
                      {" "}
                      <NavLink
                        to={"/article"}
                        className={({ isActive }) =>
                          `${styles.removerBorder}  ${
                            isActive ? styles.active : ""
                          }`
                        }
                      >
                        Articles
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
            </Col>
            <Col xs={12} xl={5}>
              <Stack direction="horizontal">
                <div className="ms-auto w-100">
                  <SearchBtn />
                </div>

                {userVerify && userName && (
                  <div className="ms-auto d-flex align-items-center">
                    <Icon icon="gala:bell" className="me-4" fontSize={"25px"} />
                    <div className={`${styles.userName}`}>
                      <img src={USERIMG} alt="USERIMG" loading="lazy" />
                      <span>
                        {userName?.charAt(0).toUpperCase() + userName?.slice(1)}
                      </span>
                      <Icon icon="mdi:keyboard-arrow-down" fontSize={"25px"} />
                    </div>
                  </div>
                )}
              </Stack>
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
