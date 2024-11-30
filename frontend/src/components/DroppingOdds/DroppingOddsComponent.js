import React, { useEffect, useState } from "react";
import { Dropdown, Stack } from "react-bootstrap";
// Internal Components or Modules
import SportsNav from "./SportsNav";
import SportDetails from "./SportDetails";
import PagesNav from "./PagesNav";
import AboutDroppingOdds from "./AboutDroppingOdds";
import EventNav from "../MyCoupon/EventNav";
// CSS or Stylesheets
import styles from "../../Pages/DroppingOdds/DroppingOdds.module.css";
import mycoupoStyle from "../MyCoupon/MyCoupon.module.css";
import "react-input-range/lib/css/index.css";
import { useDispatch, useSelector } from "react-redux";
import { loadDroppingOdds } from "../../store/data.action";
import { getSportsIcon } from "../../data/SportsIcon";
import { getFlagIconKey } from "../../data/flag";
import { toast } from "react-toastify";
import Loading from "../../Loader/Loading";
import { getDateAndTime, stringToSlug } from "../../data/formater";
import { Virtuoso } from "react-virtuoso";

const timeFilter = [
  {
    title: "Last 1 Hour",
    key: "1h",
  },
  {
    title: "Last 2 Hours",
    key: "2h",
  },
  {
    title: "Last 4 Hours",
    key: "4h",
  },
  {
    title: "Last 12 Hours",
    key: "12h",
  },
  {
    title: "Last 24 Hours",
    key: "24h",
  },
];

const marketsList = [
  {
    title: "All Types",
    key: null,
  },
  {
    title: "1X2",
    key: "1X2",
  },
  {
    title: "Home/Away",
    key: "haot",
  },
  // {
  //   title : 'Home/Away - OT',
  //   key : 'haot'
  // },
  {
    title: "Asian Handicap",
    key: "ah",
  },
  {
    title: "Over/Under",
    key: "ou",
  },
  {
    title: "Draw Not Bet",
    key: "dnb",
  },
  {
    title: "Half Time/Full Time",
    key: "Both Teams to Score",
  },
];

const getMarketNameFromKey = (key) => {
  return marketsList.find((m) => m.key == key)?.title || key;
};

const DroppingOddsComponent = (props) => {
  const _droppingOdds = useSelector(
    (state) => state.dataReducer.activeDroppingOddsFilter
  );

  const _isDroppingOddsLoading = useSelector(
    (state) => state.dataReducer.isDroppingOddsLoading
  );

  const [selectedTimeFilter, setSelectedTimeFilter] = useState(timeFilter[3]);
  const [oddsMarket, setOddsMarket] = useState(marketsList[0]);
  const [isLoader, setIsLoader] = useState(false);
  const [activeSport, setActiveSport] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  const dispatch = useDispatch();

  const handleOnTimeFilterChange = (item) => {
    setSelectedTimeFilter(item);
  };

  const droppingBookies = (item) => {
    setOddsMarket(item);
  };

  const droppingOdds = (data) => {
    try {
      dispatch(loadDroppingOdds(data));
    } catch (error) {
      toast.error(error);
    }
  };

  const handleOnSportChange = (sport) => {
    const slugSport = stringToSlug(sport === "All" ? "" : sport);
    setActiveSport(slugSport);
    setActiveTab(sport);
  };

  const checkActive = (tabTitle) => {
    return tabTitle === activeTab;
  };

  useEffect(() => {
    setIsLoader(_isDroppingOddsLoading);
  }, [_isDroppingOddsLoading]);

  useEffect(() => {
    const data = {
      sport:
        activeSport === ""
          ? null
          : activeSport === "football"
          ? "soccer"
          : activeSport,
      market: oddsMarket.key,
      timeFilter: selectedTimeFilter.key,
    };

    droppingOdds(data);
  }, [activeSport, oddsMarket, selectedTimeFilter]);

  return (
    <div className="pt-3">
      <div className={styles.droppingOddsBg}>
        <PagesNav nextTab="Dropping Odds" sportsName="Odds Comparison" />
        <AboutDroppingOdds
          title="Dropping Odds"
          description="Dropping odds refer to a significant decrease in the odds offered by bookmakers, signaling market shifts or changes in betting trends. Monitoring dropping odds is crucial for finding the best sports odds and placing bets when the odds are at their highest. Stay ahead in betting by tracking fluctuating odds and spotting opportunities to secure the highest odds, maximizing your potential returns."
        />
        <div className={styles.filterData}>
          <span>Filter</span>

          <div className={`${styles.dropdownFlex} d-flex mt-2`}>
            <Stack direction="horizontal" gap={1}>
              <Dropdown className="d-inline">
                <Dropdown.Toggle
                  className={styles.displayLastTime}
                  id="dropdown-autoclose-true"
                >
                  {selectedTimeFilter.title}
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.dropdownMenu}>
                  {timeFilter.map((time) => (
                    <Dropdown.Item
                      key={time.title}
                      onClick={() => handleOnTimeFilterChange(time)}
                    >
                      {time.title}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown className="d-inline">
                <Dropdown.Toggle
                  className={styles.displayLastTime}
                  id="dropdown-autoclose-true"
                >
                  {oddsMarket.title}
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.dropdownMenu}>
                  {marketsList.map((m, i) => (
                    <Dropdown.Item key={i} onClick={() => droppingBookies(m)}>
                      {m.title}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Stack>
          </div>
        </div>
        <div className={`${styles.allSportsDisplay} pt-4`}>
          <Stack
            direction="horizontal"
            className={`${mycoupoStyle.evetTabDisplay} me-4`}
            gap={2}
          >
            <h5
              onClick={() => handleOnSportChange("All")}
              className={`text-nowrap ${styles.pointer} ${
                activeTab === "All" ? styles.activeAll : null
              }`}
            >
              All Sports
            </h5>
            <br></br>
            <EventNav onClickTab={handleOnSportChange} isActive={checkActive} />
          </Stack>
        </div>
        {isLoader ? (
          <Loading height={50} width={50} />
        ) : (
          <Virtuoso
            useWindowScroll
            totalCount={(_droppingOdds && _droppingOdds?.length) || 0}
            data={_droppingOdds}
            overscan={3}
            initialItemCount={_droppingOdds.length}
            itemContent={(index, droppingOdd) => {
              if (!droppingOdd.matchDetails) return null;

              return (
                <div className="mt-4" key={index}>
                  <SportsNav
                    icon={getSportsIcon(
                      droppingOdd.matchDetails.match.breadcrumbs.sport.name
                    )}
                    title={
                      droppingOdd.matchDetails.match.breadcrumbs.sport.name
                    }
                    countryIcon={getFlagIconKey(
                      droppingOdd.matchDetails.match["country-name"]
                    )}
                    countryName={droppingOdd.matchDetails.match["country-name"]}
                    language={droppingOdd.matchDetails.match["tournament-name"]}
                  />

                  <SportDetails
                    isDroppingOdds={true}
                    market={`${getMarketNameFromKey(
                      droppingOdd.market == "ha" ? "haot" : droppingOdd.market
                    )} ${
                      droppingOdd.subMarket && droppingOdd.subMarket != ""
                        ? `- ${droppingOdd.subMarket}`
                        : ""
                    }`}
                    countryOne={droppingOdd.matchDetails.match["home-name"]}
                    countryTwo={droppingOdd.matchDetails.match["away-name"]}
                    timing={getDateAndTime(
                      droppingOdd.matchDetails.match["date-start-timestamp"]
                    )}
                    minus={droppingOdd}
                    display={true}
                    match={droppingOdd.matchDetails}
                    pastOdds={droppingOdd.pastOdds}
                    currentOdds={droppingOdd.odds}
                    isSaveable={false}
                  />
                </div>
              );
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DroppingOddsComponent;
