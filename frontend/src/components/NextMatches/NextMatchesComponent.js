import React, { Fragment, useEffect, useState } from "react";
import styles from "../../Pages/NextMatches/NextMatches.module.css";
import NavTab from "../MyCoupon/NavTab";
import PagesNav from "../DroppingOdds/PagesNav";
import AboutDroppingOdds from "../DroppingOdds/AboutDroppingOdds";
import { Stack } from "react-bootstrap";
import MycouponMsgBtn from "../MyCoupon/MycouponMsgBtn";
import ButtonBg from "../ButtonBg.js/ButtonBg";
import EventNav from "../MyCoupon/EventNav";
import SportsNav from "../DroppingOdds/SportsNav";
import { useDispatch, useSelector } from "react-redux";
import { getSportsIcon } from "../../data/SportsIcon";
import { getFlagIconKey } from "../../data/flag";
import { loadMoreNextMatches, loadNextMatches } from "../../store/data.action";
import Loading from "../../Loader/Loading";
import moment from "moment";
import { getDateAndTime, stringToSlug } from "../../data/formater";
import LeagueMatchItem from "../LeaguesData/LeagueMatchItem";

const NextMatchesComponent = (props) => {
  const _nextMatches = useSelector((state) => state.dataReducer.nextMatches);
  const _isNextMatchLoading = useSelector(
    (state) => state.dataReducer.isNextMatchLoading
  );

  const timezone = null;
  const [activeDate, setActiveDate] = useState(
    getDateAndTime(moment().unix(), "YYYYMMDD")
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [activeSport, setActiveSport] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Football");

  const yesterday = getDateAndTime(moment().add(-1, "days").unix(), "YYYYMMDD");
  const today = getDateAndTime(moment().unix(), "YYYYMMDD");
  const tomorrow = getDateAndTime(moment().add(1, "days").unix(), "YYYYMMDD");
  const dayAfterTomorrow = getDateAndTime(
    moment().add(2, "days").unix(),
    "YYYYMMDD"
  );
  const dayAfterDayTomorrow = getDateAndTime(
    moment().add(3, "days").unix(),
    "YYYYMMDD"
  );

  const [isEvent, setIsEvent] = useState(false);

  const dispatch = useDispatch();

  const nextMatchesDisplay = () => {
    try {
      const data = {
        sport: activeSport ? activeSport : props.params,
        date: moment(activeDate, "YYYY-MM-DD").format("YYYYMMDD"),
        isEvent: isEvent,
        isKickOf: !isEvent,
        timezone: timezone,
      };

      dispatch(loadNextMatches(data));
    } catch (error) {
      console.error(error);
    }
  };

  const loadmoreMatches = () => {
    try {
      const data = {
        sport: activeSport ? activeSport : props.params,
        date: moment(activeDate, "YYYY-MM-DD").format("YYYYMMDD"),
        isEvent: isEvent,
        isKickOf: !isEvent,
        timezone: timezone,
        skip: _nextMatches.length,
      };

      dispatch(loadMoreNextMatches(data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateChange = (event) => {
    setActiveDate(
      getDateAndTime(
        moment(event.target.value, "YYYY-MM-DD").unix(),
        "YYYYMMDD"
      )
    );
    setSelectedDate(event.target.value);
  };

  const checkActive = (tabTitle) => {
    return tabTitle === activeTab;
  };

  const handleOnSportChange = (sport) => {
    setActiveSport(stringToSlug(sport));
    setActiveTab(sport);
  };

  useEffect(() => {
    nextMatchesDisplay();
  }, [activeDate, activeSport, isEvent, props.params]);

  useEffect(() => {
    setIsLoading(_isNextMatchLoading);
  }, [_isNextMatchLoading]);

  //console.log('_nextMatches',_nextMatches);

  return (
    <div className={styles.nextMatches}>
      <PagesNav
        nextTab="Next Matches"
        sportsName={
          activeSport
            ? activeSport
            : props.params === "football"
              ? "soccer"
              : props.params
        }
      />

      <AboutDroppingOdds
        title="Next Matches :"
        sureBets={getDateAndTime(moment().unix(), "YYYY-MM-DD")}
        description="The Next Matches odds page provides an up-to-date list of upcoming sports events, complete with betting odds from various bookmakers. Bettors can quickly compare odds for different markets, ensuring they find the best sports odds for each match. This page allows users to easily navigate between different sports, events, and betting types, helping them make informed decisions on where to place their bets."
      />

      <Stack
        direction="horizontal"
        className={`mt-4 ${styles.myMatches}`}
        gap={1}
      >
        <div className={`mt-2 ${styles.nextMatchesDisplay}`}>
          {/* <div className={`mt-2`}> */}
          <MycouponMsgBtn
            isActive={selectedDate === activeDate}
            title={
              <div className={`m-1 ${styles.msgBtn}`}>
                <input
                  type="date"
                  onChange={(event) => handleDateChange(event)}
                  style={{
                    border: "none",
                    background: "transparent",
                    outline: "none",
                    color: selectedDate === activeDate ? "#fff" : "#656ef5",
                  }}
                />
              </div>
            }
          />
        </div>
        <Stack direction="horizontal" className="mt-2" gap={1}>
          <MycouponMsgBtn
            isActive={yesterday === activeDate}
            title={
              <div className="m-1" onClick={() => setActiveDate(yesterday)}>
                Yesterday
              </div>
            }
          />
          <MycouponMsgBtn
            isActive={today === activeDate}
            title={
              <div className="m-1" onClick={() => setActiveDate(today)}>
                Today
              </div>
            }
          />
          <MycouponMsgBtn
            isActive={activeDate === tomorrow}
            title={
              <div className="m-1" onClick={() => setActiveDate(tomorrow)}>
                Tomorrow
              </div>
            }
          />
          <div className={styles.nextMatchesDisplay}>
            <MycouponMsgBtn
              isActive={activeDate === dayAfterTomorrow}
              title={
                <div
                  className="m-1"
                  onClick={() => setActiveDate(dayAfterTomorrow)}
                >
                  {moment(dayAfterTomorrow, "YYYYMMDD").format("DD MMM")}
                </div>
              }
            />
          </div>
          <div className={styles.nextMatchesDisplay}>
            <MycouponMsgBtn
              isActive={activeDate === dayAfterDayTomorrow}
              title={
                <div
                  className="m-1"
                  onClick={() => setActiveDate(dayAfterDayTomorrow)}
                >
                  {moment(dayAfterDayTomorrow, "YYYYMMDD").format("DD MMM")}
                </div>
              }
            />
          </div>
        </Stack>
      </Stack>

      <Stack
        direction="horizontal"
        gap={4}
        className={`mt-4 ${styles.myMatches}`}
      >
        <div>
          <b>My Matches</b>
        </div>
        <div className={styles.scMargin}>
          <EventNav onClickTab={handleOnSportChange} isActive={checkActive} />
        </div>
      </Stack>
      <Stack direction="horizontal" gap={1} className="mt-4">
        <MycouponMsgBtn
          onClick={() => setIsEvent(false)}
          isActive={!isEvent}
          title={<div className={`m-1 ${styles.msgBtn}`}>Kick off time</div>}
        />
        <MycouponMsgBtn
          onClick={() => setIsEvent(true)}
          isActive={isEvent}
          title={<div className={`m-1 ${styles.msgBtn}`}>Events</div>}
        />
      </Stack>

      {isLoading && <Loading height={50} width={50} />}

      {!isLoading && _nextMatches && !_nextMatches?.matches && (
        <Fragment>
          {_nextMatches.map((league, index) => {
            var matches = league.matches;
            var filteredMatches = matches.filter(
              (match) =>
                getDateAndTime(
                  match.match["date-start-timestamp"],
                  "YYYYMMDD"
                ) == activeDate &&
                match.odds &&
                match.odds.length !== 0 &&
                match.odds[0]?.local?.avg
            );
            var unique = Array.from(
              new Set(filteredMatches.map((match) => match.match.id))
            ).map((id) =>
              filteredMatches.find((match) => match.match.id === id)
            );
            if (unique.length === 0) return null;
            const matchDetails = unique[0];

            return (
              <Fragment key={index}>
                <Stack
                  direction="horizontal"
                  className={`mt-4 ${styles.myMatches}`}
                >
                  <SportsNav
                    icon={getSportsIcon(
                      matchDetails.match.breadcrumbs.sport.name
                    )}
                    title={matchDetails.match.breadcrumbs.sport.name}
                    countryIcon={getFlagIconKey(
                      matchDetails.match["country-name"]
                    )}
                    countryName={matchDetails.match["country-name"]}
                    language={matchDetails.match["tournament-name"]}
                    tournamentUrl={league.tournamentUrl}
                  />
                </Stack>

                <div className={styles.dataItemBorder}>
                  {unique.map((match, matchIndex) => (
                    <LeagueMatchItem
                      dateMatches={matches}
                      key={matchIndex}
                      matchIndex={matchIndex}
                      match={match}
                      isSaveable={true}
                      showWinder={true}
                      timeFrom={match.match["homeResult"]}
                      timeTo={match.match["awayResult"]}
                    />
                  ))}
                </div>
              </Fragment>
            );
          })}

          {/* <div onClick={loadmoreMatches} className="text-center mt-3">
            <ButtonBg btnName="Load more" />
          </div> */}
        </Fragment>
      )}
    </div>
  );
};

export default NextMatchesComponent;
