import React, { Fragment } from "react";
import homeStyle from "../../Pages/Home/Home.module.css";
import styles from "../../components/MyCoupon/MyCoupon.module.css";
import TopEvent from "../MyCoupon/TopEvent";
import SportsNav from "../DroppingOdds/SportsNav";
import SportDetails from "../DroppingOdds/SportDetails";
import { Stack } from "react-bootstrap";
import MycouponMsgBtn from "../MyCoupon/MycouponMsgBtn";
import NextMatchesDetails from "./NextMatchesDetails";
import { getFlagIconKey } from "../../data/flag";
import moment from "moment";
import { getSportsIcon } from "../../data/SportsIcon";
import Loading from "../../Loader/Loading";
import { getDateAndTime } from "../../data/formater";
import myCouponStyle from "../MyCoupon/MyCoupon.module.css";

const HomeComponent = (props) => {
  const { hotMatchesDetails = [], nextMatches = [], isLoader } = props;

  return (
    <>
      <div className={homeStyle.bg}>
        <p className={`${styles.myCouponTitle} mt-2 ${styles.topEvent}`}>
          Hot Matches
        </p>

        {isLoader && <Loading height="50" width="50" />}
        {hotMatchesDetails?.map((match, index) => {
          let matchItem = match;
          return (
            <div className="mt-4" key={index}>
              <SportsNav
                icon={getSportsIcon(matchItem.match.breadcrumbs.sport.name)}
                title={matchItem.match.breadcrumbs.sport.name}
                countryIcon={getFlagIconKey(matchItem.match["country-name"])}
                countryName={matchItem.match["country-name"]}
                language={matchItem.match["tournament-name"]}
              />
              <SportDetails
                countryOne={matchItem.match["home-name"]}
                countryTwo={matchItem.match["away-name"]}
                timing={getDateAndTime(matchItem.match["date-start-timestamp"])}
                match={matchItem}
                minus={false}
                img={false}
                isSaveable={false}
                maxBookmarkers={matchItem.maxBookmarkers}
              />
            </div>
          );
        })}
      </div>

      <TopEvent navBar={true} />

      <div className={homeStyle.bg}>
        <p className={`${styles.myCouponTitle} mt-2 ${styles.topEvent}`}>
          Upcoming Matches
        </p>

        {isLoader && <Loading height="50" width="50" />}
        {nextMatches.matches?.slice(0, 10).map((match, index) => (
          <Fragment key={index}>
            <Stack
              direction="horizontal"
              className={`mt-4 ${homeStyle.nextMatchDisplay}`}
            >
              <SportsNav
                icon={getSportsIcon(nextMatches.sport)}
                title={nextMatches.sport}
                countryIcon={getFlagIconKey(match.match["country-name"])}
                countryName={match.match["country-name"]}
                language={match.match["tournament-name"]}
              />

              <div className={`ms-auto ${homeStyle.displayNone}`}>
                <MycouponMsgBtn
                  title={
                    window.localStorage.getItem("Timezone-object")
                      ? getDateAndTime(
                          match.match["date-start-timestamp"],
                          "DD MMMM, HH:mm"
                        )
                      : moment
                          .unix(match.match["date-start-timestamp"])
                          .format("DD MMMM, HH:mm")
                  }
                  bg={true}
                />
              </div>
            </Stack>

            <div>
              <NextMatchesDetails
                firstCountry={match.match["home-name"]}
                timeFrom={
                  match.match["event-stage-name"] == "Finished"
                    ? match.match["homeResult"]
                    : ""
                }
                timeTo={
                  match.match["event-stage-name"] == "Finished"
                    ? match.match["awayResult"]
                    : ""
                }
                secondCountry={match.match["away-name"]}
                minusPoint="71 S"
                match={match}
                isSaveable={true}
              />
            </div>
          </Fragment>
        ))}
      </div>

      <div className={`mt-4 mb-3`}>
        <div className={`${myCouponStyle.leaguesHeading} p-3 fw-normal`}>
          Welcome to OddsRun, your ultimate online betting comparison platform
          for everything related to sports betting. Whether you’re a seasoned
          bettor or just getting started, we provide you with a comprehensive
          range of tools to enhance your betting experience. Our platform offers
          dropping odds, sure bets, betting predictions, betting lines,
          schedule, results, and more—all designed to help you make informed
          betting decisions and maximize your returns.
          <br /> <br />
          At OddsRun, we specialize in offering the best odds across various
          markets. Our advanced system tracks odds movement in real time,
          ensuring you stay updated with the most accurate and competitive odds.
          With our dropping odds feature, you can spot sudden shifts in the
          market and act quickly to take advantage of the best betting
          opportunities. For those looking for guaranteed profit, our sure bets
          section compares betting lines from different bookmakers, helping you
          exploit odds discrepancies and lock in a winning bet. <br /> <br /> We
          also provide betting tips and predictions on major sports events,
          along with a full schedule of upcoming matches across various leagues
          and tournaments. Our platform covers football, tennis, basketball, and
          more, making sure you’re equipped with everything you need to succeed
          in sports betting. Check real-time results, explore betting lines, and
          use our expert predictions to get ahead of the game. Whether you're
          looking to bet online, compare the best odds, or discover sure bets,
          OddsRun is your go-to platform for a smarter and more profitable
          betting experience. Join us today and stay ahead with the latest
          betting odds and the best insights in online sports betting.
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
