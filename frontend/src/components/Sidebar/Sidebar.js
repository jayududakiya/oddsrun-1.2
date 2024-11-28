import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Sidebar.module.css";
import { Icon } from "@iconify/react";
import { Accordion, Nav, NavDropdown } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

import { SPORTS_LIST } from "../../data/sports";
import {
  doFormatText,
  getDateAndTime,
  stringToSlug,
} from "../../data/formater";
import { getFlagIconKey } from "../../data/flag";
import Loading from "../../Loader/Loading";
import { loadSportLeagues } from "../../store/data.action";
import moment from "moment";
import timezones from "timezones-list";
import ManullyTags from "../../Utils.js/ManullyTags";

const Sidebar = (props) => {
  const { location: uselocation } = useLocation();

  const _sportsLeagues = useSelector(
    (state) => state.dataReducer.sportsLeagues
  );

  const _isSportsLeaguesLoading = useSelector(
    (state) => state.dataReducer.isSportsLeaguesLoading
  );

  const dispatch = useDispatch();
  const timezoneRef = useRef();

  const [sportLeagues, setSportLeagues] = useState([]);
  const [activeSport, setActiveSport] = useState("");
  const [isLoading, setIsLoading] = useState(_isSportsLeaguesLoading);

  const handleSetActiveSport = async (sportName) => {
    setActiveSport(stringToSlug(sportName));

    if (_sportsLeagues[stringToSlug(sportName)]) {
      return false;
    }

    const data = {
      sport: stringToSlug(sportName),
      groupBy: "country",
    };

    dispatch(loadSportLeagues(data));
  };

  const oddsFormat = window.localStorage.getItem("Odds-Format");

  var timezone = {};

  try {
    timezone = JSON.parse(window.localStorage.getItem("Timezone-object"));
  } catch (error) {}

  const formattedDate = timezone
    ? getDateAndTime(moment().unix())
    : moment().format("DD MMM HH:mm");

  const handleSelect = (eventKey) => {
    window.localStorage.setItem("Odds-Format", eventKey);
    window.location.reload();
  };

  const handleSelectedTime = (eventKey) => {
    window.localStorage.setItem("Timezone-object", eventKey);
    window.location.reload();
  };

  useEffect(() => {
    if (!_sportsLeagues[activeSport]) return;
    setSportLeagues(_sportsLeagues);
  }, [_sportsLeagues, activeSport]);

  useEffect(() => {
    setIsLoading(_isSportsLeaguesLoading);
  }, [_isSportsLeaguesLoading]);

  const selectedTimeZone = window.localStorage.getItem("Timezone-object");

  useEffect(() => {
    <ManullyTags />;
  }, [uselocation]);

  return (
    <div className={`${styles.sideBg} ${props.responsive && styles.sideBgRH}`}>
      <ManullyTags />

      <div>
        <div className={styles.logo}>
          <NavLink to={"/home"}>
            <h4>OddsRun</h4>
          </NavLink>
          <div className={styles.decorationLine}></div>
        </div>
        <div className="p-2 mt-2 mb-4">
          <div className={`${styles.authenticateBtn}`}>
            <NavLink to={"/login"}>
              <button className={styles.loginBtn}>Login</button>
            </NavLink>
            <NavLink to={"/register"}>
              <button className={styles.registerBtn}>Register</button>
            </NavLink>
          </div>
        </div>

        <div className={`${styles.displayPages}`}>
          <nav className="ps-3">
            <ul className={styles.pages}>
              <NavLink to={"/"}>
                <li className="">
                  <div className="d-flex align-items-center gap-2">
                    <Icon
                      icon="material-symbols-light:home-outline"
                      fontSize={25}
                    />
                    <div className={styles.sideMenuItem}>Home</div>
                  </div>
                </li>
              </NavLink>
              <NavLink to="/soccer/next-matches">
                <li className="mt-4">
                  <div className="d-flex align-items-center gap-2">
                    <Icon icon="lets-icons:date-range-light" fontSize={22} />
                    <div className={styles.sideMenuItem}>Next Matches</div>
                  </div>
                </li>
              </NavLink>
              <NavLink to={"/droppingOdds"}>
                <li className="mt-4">
                  <div className="d-flex align-items-center gap-2">
                    <Icon
                      icon="heroicons:arrow-trending-up-20-solid"
                      fontSize={24}
                    />
                    <div className={styles.sideMenuItem}>Dropping Odds</div>
                  </div>
                </li>
              </NavLink>
              <NavLink to={"/sure-bets"}>
                <li className="mt-4">
                  <div className="d-flex align-items-center gap-2">
                    <Icon icon="tdesign:secured" fontSize={22} />
                    <div className={styles.sideMenuItem}>Sure Bets</div>
                  </div>
                </li>
              </NavLink>
              <NavLink to={"/bookmakers"}>
                <li className="mt-4">
                  <div className="d-flex align-items-center gap-2">
                    <Icon
                      icon="material-symbols-light:bookmark-outline"
                      fontSize={25}
                    />
                    <div className={styles.sideMenuItem}>Bookmakers</div>
                  </div>
                </li>
              </NavLink>
              <NavLink to={"/article"}>
                <li className="mt-4">
                  <div className="d-flex align-items-center gap-2">
                    <Icon icon="mdi-light:note-text" fontSize={22} />
                    <div className={styles.sideMenuItem}>Article</div>
                  </div>
                </li>
              </NavLink>
            </ul>
          </nav>
        </div>

        <div className={styles.displayOutline}>
          <span className={selectedTimeZone ? "d-block" : "d-flex"}>
            <div>
              <Nav>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={
                    <span style={{ color: "white" }}>
                      Odds format : {oddsFormat ? oddsFormat : "EU Odds"}
                    </span>
                  }
                  onSelect={handleSelect}
                >
                  <NavDropdown.Item eventKey="EU Odds">
                    EU Odds{" "}
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="Fractional Odds">
                    Fractional Odds
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="Money line odds">
                    Money line odds
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </div>
          </span>

          <div
            className={`${styles.oddsFormate} ${styles.timeZone}`}
            style={{ position: "relative" }}
          >
            <div className={`${timezone ? "" : "d-flex"}`}>
              <div className={styles.timeZoneSelected}>
                <Nav>
                  <NavDropdown
                    ref={timezoneRef}
                    id="nav-dropdown-dark-example"
                    title={
                      <span style={{ color: "#fff", padding: "0px" }}>
                        Timezone : {formattedDate}
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
          </div>
        </div>

        {/* </div> */}

        <div className={`mt-4 ${styles.marginBottom}`}>
          {SPORTS_LIST.map((sport, index) => (
            <Accordion
              key={index}
              className={styles.accordion}
              style={{ borderRadius: "0" }}
            >
              <Accordion.Item eventKey={index} className={styles.accordionItem}>
                <Accordion.Header
                  className={styles.accordionHeader}
                  onClick={() => handleSetActiveSport(sport.sportName)}
                >
                  <Icon icon={sport.icon} fontSize={"20px"} />
                  <label className="ps-3">{sport.label}</label>
                </Accordion.Header>
                <Accordion.Body className={styles.sportsAndCountryBg}>
                  <NavLink
                    to={`/${stringToSlug(sport.sportName)}/next-matches`}
                  >
                    <div
                      onClick={props.closeSidebar}
                      className={styles.DisplayDayOfMatch}
                    >
                      Today’s Matches
                    </div>
                  </NavLink>

                  {isLoading && <Loading height="40" width="40" />}

                  {sportLeagues[stringToSlug(sport.sportName)] && (
                    <div className="pt-1">
                      <div className={styles.newSubMenu}></div>
                      {Object.keys(
                        sportLeagues[stringToSlug(sport.sportName)]
                      ).map((countryKey, index) => {
                        const leagues =
                          sportLeagues[stringToSlug(sport.sportName)][
                            countryKey
                          ];
                        return (
                          <div key={index}>
                            <Accordion className={styles.customSubAccordion}>
                              <Accordion.Item
                                className={styles.subAccordion}
                                eventKey="0"
                              >
                                <Accordion.Header>
                                  <div>
                                    <Icon
                                      className="me-1"
                                      icon={getFlagIconKey(countryKey)}
                                      fontSize={"20px"}
                                      color="#656ef5"
                                    />
                                    <label
                                      className={styles.subAccordionHeading}
                                    >
                                      {doFormatText(countryKey)}
                                    </label>
                                  </div>
                                </Accordion.Header>
                                <Accordion.Body style={{ padding: "12px" }}>
                                  {leagues
                                    .filter(
                                      (league, index, self) =>
                                        index ===
                                        self.findIndex(
                                          (l) => l.name === league.name
                                        )
                                    )
                                    .map((league, index) => (
                                      <NavLink
                                        key={index}
                                        to={`/matches/${league.sport}/${league.country}/${league.name}`}
                                      >
                                        <div
                                          className={styles.listOfSubSchedule}
                                          onClick={props.closeSidebar}
                                        >
                                          {doFormatText(league.name)}
                                          {league.matches}
                                        </div>
                                      </NavLink>
                                    ))}
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>

                            <div className={styles.newSubMenu}></div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
