import React from "react";
import { getSportsIcon } from "../../data/SportsIcon";
import { doFormatText } from "../../data/formater";
import SportsNav from "../DroppingOdds/SportsNav";
import styles from "../../Pages/LeaguesData/LeaguesData.module.css";
import { getFlagIconKey } from "../../data/flag";
import MycouponMsgBtn from "../MyCoupon/MycouponMsgBtn";
import LeagueMatchItem from "./LeagueMatchItem";
import { Virtuoso } from "react-virtuoso";

const LeagueResult = (props) => {
  const { params, matches } = props;
  return (
    <div className={`pt-4 ${styles.bg}`}>
      <SportsNav
        icon={getSportsIcon(params.sport)}
        title={doFormatText(
          params.sport == "soccer" ? "Football" : params.sport
        )}
        countryIcon={getFlagIconKey(params.country)}
        countryName={doFormatText(params.country)}
        language={doFormatText(params.league)}
      />

      {Object.keys(matches).map((matchKey, index) => {
        const dateMatches = matches[matchKey];

        return (
          <div className="mt-4" key={index}>
            <MycouponMsgBtn bg={true} title={matchKey} />

            <div className={styles.dataItemBorder}>
              {dateMatches && dateMatches.length > 0 ? (
                <Virtuoso
                  useWindowScroll
                  totalCount={(dateMatches && dateMatches?.length) || 0}
                  data={dateMatches}
                  overscan={3}
                  initialItemCount={dateMatches.length}
                  itemContent={(index, match) => {
                    return (
                      <LeagueMatchItem
                        isSaveable={true}
                        showWinder={true}
                        dateMatches={dateMatches}
                        key={index}
                        matchIndex={index}
                        match={match}
                        timeFrom={match.match["homeResult"]}
                        timeTo={match.match["awayResult"]}
                      />
                    );
                  }}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeagueResult;
