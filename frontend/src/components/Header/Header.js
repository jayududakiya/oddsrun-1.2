import React, { Fragment, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Header.module.css";
import { Icon } from "@iconify/react";
import { Col, Nav, NavDropdown, Row, Stack } from "react-bootstrap";
import ButtonBg from "../ButtonBg.js/ButtonBg";
import USERIMG from "../../assets/Ellipse 1.svg";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import timezones from "timezones-list";
import moment from "moment-timezone";
import SearchBtn from "../SearchForm/SearchBtn";
import { getDateAndTime } from "../../data/formater";
import { TIMEZONE_ALIASES } from "../../data/TimezoneAliases";

const Header = () => {
  const _nextMatches = useSelector((state) => state.dataReducer.nextMatches);
  const _hotMatches = useSelector((state) => state.dataReducer.hotMatches);
  const _leagueMatches = useSelector(
    (state) => state.dataReducer.leagueMatches
  );
  const _droppingOdds = useSelector(
    (state) => state.dataReducer.activeDroppingOddsFilter
  );
  const _sureBets = useSelector((state) => state.dataReducer.sureBets);

  const [searchResult, setSearchResult] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState("");

  const handleSelectedTime = (eventKey) => {
    var selectedTimezone = JSON.parse(eventKey);
    window.localStorage.setItem("Timezone-object", eventKey);
    window.location.reload();
  };

  const handleSelect = (eventKey) => {
    window.localStorage.setItem("Odds-Format", eventKey);
    window.location.reload();
  };
  const oddsFormat = window.localStorage.getItem("Odds-Format");
  var timezone = {};

  try {
    timezone = JSON.parse(window.localStorage.getItem("Timezone-object"));
  } catch (error) { }

  const formattedDate = timezone
    ? getDateAndTime(moment().unix())
    : moment().format("DD MMM HH:mm");

  // const formattedDate = timezone
  //   ? moment(new Date()).utc().utcOffset(timezone.utc).format("DD MMM HH:mm")
  //   : moment().format("DD MMM HH:mm");
  // console.log("time", timezone);

  // const searchTeam = async (event) => {
  //   if (event.target.value == "") {
  //     setIsSearchActive(false);
  //     setSearchResult([]);
  //     return false;
  //   }

  //   const regex = new RegExp("^" + event.target.value, "i");

  //   const _hotMatchesData = _hotMatches.map((h) => h.matches);
  //   const _droppingOddsData = _droppingOdds.map((h) => h.matchDetails);
  //   const _sureBetsData = _sureBets.map((h) => h.matches);
  //   var _leagueMatchesData = [];
  //   Object.values(_leagueMatches).map((list) => {
  //     list.map((d) => {
  //       _leagueMatchesData.push(d);
  //     });
  //   });

  //   var allData = [
  //     ..._leagueMatchesData,
  //     ..._hotMatchesData,
  //     ..._droppingOddsData,
  //     ..._sureBetsData,
  //     ...(_nextMatches.length !== 0 ? _nextMatches.matches : []),
  //   ];

  //   // const unique = [
  //   //   ...new Map(
  //   //     allData.map((item) => [item.match["home-name"], item])
  //   //   ).values(),
  //   // ];
  //   // console.log("unique", unique);
  //   var filterResult = allData.map((item) => {
  //     if (
  //       regex.test(item.match["home-name"]) ||
  //       regex.test(item.match["away-name"])
  //     ) {
  //       return {
  //         isHomeTeam: regex.test(item.match["home-name"]),
  //         data: item,
  //       };
  //     } else {
  //       return null;
  //     }
  //   });

  //   filterResult = filterResult.filter((f) => f !== null);

  //   setSearchResult(filterResult);
  //   setIsSearchActive(true);
  // };

  const userVerify = window.localStorage.getItem("token");
  // console.log("userVerify", userVerify);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");

    toast.success("You have been logged out successfully");

    window.location.reload();
  };
  const userName = window.localStorage.getItem("username");

  useEffect(() => {
    if (!timezone) {
      const timezoneAliases = TIMEZONE_ALIASES
      let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      timezone = timezoneAliases[timezone] || timezone;
      const matchedTimezone = timezones.find(tz => tz.label.includes(timezone));
      if (matchedTimezone) {
        window.localStorage.setItem("Timezone-object", JSON.stringify(matchedTimezone));
      }
    }
  }, []);

  return (
    <Fragment>
      <div className={`${styles.headerBg} ${styles.hideHeader}`}>
        <div className={styles.mainHeader}>
          <div className={styles.oddsFormate}>
            <span>
              <div>Odds format:</div>{" "}
              <span>
                <Nav>
                  <NavDropdown id="nav-dropdown-dark-example" title={<span style={{ color: "#656ef5" }}> {oddsFormat ? oddsFormat : "EU Odds"} </span>} onSelect={handleSelect} >
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

          <div className={`${styles.oddsFormate} ${styles.timeZone}`}>
            <div>
              Time Zones :<span> {formattedDate} ,</span>
            </div>

            <div>
              <Nav>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={<span style={{ color: "#656ef5", padding: "0px" }}> {timezone?.label} </span>}
                  onSelect={handleSelectedTime}
                >
                  <div className={`${styles.dropDownItem}`}>
                    {timezones.map((time, index) => (
                      <NavDropdown.Item eventKey={JSON.stringify(time)} key={index} >
                        {time.label}
                      </NavDropdown.Item>
                    ))}
                  </div>
                </NavDropdown>
              </Nav>
            </div>
          </div>

          {userVerify ? (
            <button className={styles.btnLogin} onClick={() => handleLogout()}>
              Logout
            </button>
          ) : (
            <Stack direction="horizontal" gap={3} className={styles.mt}>
              <NavLink to={"/login"}>
                <button className={styles.btnLogin}>Login</button>
              </NavLink>
              <NavLink to={"/register"}>
                <ButtonBg btnName="Register" />
              </NavLink>
            </Stack>
          )}
        </div>

        <div className={styles.header}>
          <Row>
            <Col md={7}>
              <div className={styles.menubar}>
                <nav>
                  <ul>
                    <NavLink to={"/"} className={({ isActive }) => `${isActive ? styles.active : ""}`} >
                      <li>Home</li>
                    </NavLink>
                    <NavLink to={"/soccer/next-matches"} className={({ isActive }) => `${isActive ? styles.active : ""}`} >
                      <li>Next Matches</li>
                    </NavLink>

                    <NavLink to={"/droppingOdds"} className={({ isActive }) => `${isActive ? styles.active : ""}`} >
                      <li>Dropping odds</li>
                    </NavLink>

                    <NavLink to={"/sure-bets"} className={({ isActive }) => `${isActive ? styles.active : ""}`} >
                      <li>Sure Bets</li>
                    </NavLink>
                    <NavLink to={"/bookmakers"} className={({ isActive }) => `${styles.removerBorder}  ${isActive ? styles.active : ""}`} >
                      <li>Bookmakers</li>
                    </NavLink>
                    <NavLink to={"/article"} className={({ isActive }) => `${styles.removerBorder}  ${isActive ? styles.active : ""}`} >
                      <li>Articles</li>
                    </NavLink>
                  </ul>
                </nav>
              </div>
            </Col>
            <Col md={5}>
              <Stack direction="horizontal">
                <div className="ms-auto">
                  <SearchBtn />
                </div>

                {userVerify && userName && (
                  <div className="ms-auto d-flex align-items-center">
                    <Icon icon="gala:bell" className="me-4" fontSize={"25px"} />
                    <div className={`${styles.userName}`}>
                      <img src={USERIMG} />
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
