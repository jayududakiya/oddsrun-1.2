import React, { useEffect, useState } from "react";
import BettingToolItem from "./BettingToolItem";
import styles from "./MyCoupon.module.css";
import { Col, Nav, NavDropdown, Row, Stack, Table } from "react-bootstrap";
import ButtonBg from "../ButtonBg.js/ButtonBg";
import { Icon } from "@iconify/react";
import NavTab from "./NavTab";
import EventNav from "./EventNav";
import { useDispatch, useSelector } from "react-redux";
import {
  loadNextMatches,
  loadSportLeagues,
  loadTopEvents,
} from "../../store/data.action";
import { getSportsIcon } from "../../data/SportsIcon";
import { NavLink } from "react-router-dom";
import { stringToSlug } from "../../data/formater";

const TopEvent = (props) => {
  const _topEvents = useSelector((state) => state.dataReducer.topEvents);

  // const _topEvents = [
  //   {
  //     sport: 'Football',
  //     name: 'Champions League',
  //     url: '/football/europe/champions-league'
  //   },
  //   {
  //     sport: 'Football',
  //     name: 'Europa League',
  //     url: '/football/europe/europa-league'
  //   },
  //   {
  //     sport: 'Football',
  //     name: 'Serie A',
  //     url: '/football/italy/serie-a'
  //   },
  //   {
  //     sport: 'Football',
  //     name: 'Premier League',
  //     url: '/football/armenia/premier-league'
  //   },
  //   {
  //     sport: 'Football',
  //     name: 'Bundesliga',
  //     url: '/football/austria/bundesliga'
  //   },
  //   {
  //     sport: 'Football',
  //     name: 'La Liga',
  //     url: '/football/austria/la-liga           '
  //   },
  //   {
  //     sport: 'Basketball',
  //     name: 'NBA',
  //     url: '/basketball/Usa/nba'
  //   },
  //   {
  //     sport: 'Basketball',
  //     name: 'Euroleague',
  //     url: '/basketball/europe/euroleague'
  //   },
  //   {
  //     sport: 'American Football',
  //     name: 'NFL',
  //     url: '/american-football/europe/nfl            '
  //   },
  //   {
  //     sport: 'Hockey',
  //     name: 'NHL',
  //     url: '/hockey/usa/nhl'
  //   },
  //   {
  //     sport: 'Tennis',
  //     name: 'ATP/WTA Australian Open',
  //     url: '/tennis/usa/atp-wta-australian-open       '
  //   },
  //   {
  //     sport: 'Tennis',
  //     name: 'ATP/WTA Roland Garros',
  //     url: '/tennis/usa/atp-wta-roland-garros       '
  //   },
  //   {
  //     sport: 'Tennis',
  //     name: 'ATP/WTA Wimbledon',
  //     url: '/tennis/usa/atp-wta-wimbledon       '
  //   },
  //   {
  //     sport: 'Tennis',
  //     name: 'ATP/WTA US Open',
  //     url: '/tennis/usa/atp-wta-open       '
  //   },
  // ]

  const [events, setEvents] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);

  const dispatch = useDispatch();

  const handleOnSportChange = (sport) => {
    dispatch(loadTopEvents({ sport: stringToSlug(sport) }));
  };

  const topEvents = (data = {}) => {
    try {
      dispatch(loadTopEvents(data));
    } catch (error) {}
  };

  useEffect(() => {
    topEvents();
  }, []);

  useEffect(() => {
    // console.log('events',events)
    setEvents(_topEvents);
  }, [_topEvents]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className={`${styles.myCouponBg} ${styles.sportsList} mt-3`}>
        <Stack direction="horizontal" gap={4} className={styles.evetTabDisplay}>
          <p className={`${styles.myCouponTitle} mt-2 ${styles.topEvent}`}>
            Top Events
          </p>
          {props.navBar && (
            <>
              <EventNav onClickTab={handleOnSportChange} />
            </>
          )}
        </Stack>
      </div>

      <div className={styles.sportsName}>
        <Row>
          {events.map((event, eventIndex) => {
            return (
              <Col md={6} key={eventIndex}>
                <div
                  key={eventIndex}
                  // className={eventIndex == 0 ? styles : "SetPlace"}
                  className={
                    isMobile
                      ? eventIndex % 2 === 0
                        ? styles.bgTopEvents
                        : styles.SetPlace
                      : [0, 1, 4, 5, 8, 9].indexOf(eventIndex) !== -1
                      ? styles.bgTopEvents
                      : styles.SetPlace
                  }
                >
                  <NavLink to={`/matches${event.url}`}>
                    <BettingToolItem
                      icon={getSportsIcon(event.sport)}
                      title={event.name}
                    />
                  </NavLink>
                </div>
              </Col>
            );
          })}

          {/* <Col md={6} className={styles.topEventBdr}>
            <div className={styles.bgTopEvents}>
              <BettingToolItem icon="openmoji:soccer-ball" title="Bundesliga" />
            </div>
            <div className={styles.SetPlace}>
              <BettingToolItem icon="openmoji:soccer-ball" title="Series A" />
            </div>
            <div className={styles.bgTopEvents}>
              <BettingToolItem
                icon="streamline-emojis:basketball"
                title="NBA"
              />
            </div>
            <div className={styles.SetPlace}>
              <BettingToolItem icon="noto:american-football" title="NFL" />
            </div>
          </Col> */}
        </Row>

        {props.navBar ? (
          ""
        ) : (
          <div className="mt-3 ms-3 pb-3">
            <ButtonBg btnName="All Events" />
          </div>
        )}
      </div>
    </>
  );
};

export default TopEvent;
