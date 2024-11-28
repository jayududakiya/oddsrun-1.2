import React, { useEffect, useState } from "react";
import styles from "../../Pages/DroppingOdds/DroppingOdds.module.css";
import nextMatchStyle from "../../Pages/NextMatches/NextMatches.module.css";
import PagesNav from "../DroppingOdds/PagesNav";
import { Stack } from "react-bootstrap";
import PostRequest from "../../services/PostRequest";
import { doFormatText } from "../../data/formater";
import { toast } from "react-toastify";
import SportsNav from "../DroppingOdds/SportsNav";
import { getSportsIcon } from "../../data/SportsIcon";
import { getFlagIconKey } from "../../data/flag";
import LeagueMatchItem from "../LeaguesData/LeagueMatchItem";

const SearchResultComponent = (props) => {
  const params = props.params;
  const [matchData, setMatchData] = useState([]);

  const loadMatchDetails = async () => {
    const data = {
      league: `${params.sport}/${params.country}/${params.turnament}`,
      team: doFormatText(params["team-name"]),
    };
    try {
      const response = await PostRequest("/league/matches", data);
      if (response) {
        setMatchData(response);
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    loadMatchDetails();
  }, [params]);

  return (
    <div className={`mt-3 ${styles.droppingOddsBg}`}>
      <PagesNav nextTab={params["team-name"]} />
      <div className={styles.searchTitle}>
        Next Match Search: {doFormatText(params["team-name"])}
      </div>
      <div className={`mt-4`}>
        <Stack
          direction="horizontal"
          gap={3}
          className={styles.setToggle}
        ></Stack>
      </div>
      <div className="mt-5">
        <SportsNav
          icon={getSportsIcon(params.sport)}
          title={params.sport == "soccer" ? "football" : params.sport}
          countryIcon={getFlagIconKey(params.country)}
          countryName={params.country}
          language={params.turnament}
        />
        <div className={nextMatchStyle.dataItemBorder}>
          {matchData.matches?.map((match, index) => (
            <LeagueMatchItem
              dateMatches={matchData.matches}
              key={index}
              matchIndex={index}
              match={match}
              isSaveable={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultComponent;
