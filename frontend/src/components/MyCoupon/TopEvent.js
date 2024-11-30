import React, { useEffect, useState } from "react";
import BettingToolItem from "./BettingToolItem";
import styles from "./MyCoupon.module.css";
import { Col, Row, Stack } from "react-bootstrap";
import ButtonBg from "../ButtonBg.js/ButtonBg";
import EventNav from "./EventNav";
import { useDispatch, useSelector } from "react-redux";
import { loadTopEvents } from "../../store/data.action";
import { getSportsIcon } from "../../data/SportsIcon";
import { NavLink } from "react-router-dom";
import { stringToSlug } from "../../data/formater";

const TopEvent = (props) => {
  const _topEvents = useSelector((state) => state.dataReducer.topEvents);

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
          {/* {events.map((event, eventIndex) => {
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
           */}

          {events.map((event, eventIndex) => {
            return (
              <Col md={6} key={eventIndex}>
                <div
                  key={eventIndex}
                  className={`${styles.eventContainer} ${
                    isMobile
                      ? eventIndex % 2 === 0
                        ? styles.bgTopEvents
                        : styles.SetPlace
                      : [0, 1, 4, 5, 8, 9].includes(eventIndex)
                      ? styles.bgTopEvents
                      : styles.SetPlace
                  }`}
                  style={{
                    minHeight: "50px",
                  }}
                >
                  <NavLink to={`/matches${event.url}`}>
                    <BettingToolItem
                      icon={getSportsIcon(event.sport)}
                      title={event.name}
                      style={{
                        minHeight: "50px",
                        display: "flex",
                        alignItems: "center",
                      }}
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
