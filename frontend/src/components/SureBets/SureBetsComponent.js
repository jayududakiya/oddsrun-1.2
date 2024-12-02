import React, { useEffect } from "react";
import PagesNav from "../DroppingOdds/PagesNav";
import droppingStyle from "../../Pages/DroppingOdds/DroppingOdds.module.css";
import AboutDroppingOdds from "../DroppingOdds/AboutDroppingOdds";
import SportsNav from "../DroppingOdds/SportsNav";
import GAME1 from "../../assets/image 11.jpg";
import SportDetails from "../DroppingOdds/SportDetails";
import { useDispatch, useSelector } from "react-redux";
import { loadSureBets } from "../../store/data.action";
import { getSportsIcon } from "../../data/SportsIcon";
import { getFlagIconKey } from "../../data/flag";
import moment from "moment";
import { toast } from "react-toastify";
import Loading from "../../Loader/Loading";
import { getDateAndTime } from "../../data/formater";
import { Virtuoso } from "react-virtuoso";

const SureBetsComponent = (props) => {
  const { isLoader, setIsLoader } = props;
  const _sureBets = useSelector((state) => state.dataReducer.sureBets);
  const dispatch = useDispatch();

  const sureBets = () => {
    setIsLoader(true);
    try {
      dispatch(loadSureBets());
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (_sureBets.length !== 0) {
      setIsLoader(false);
    }
  }, [_sureBets]);

  useEffect(() => {
    sureBets();
  }, []);

  return (
    <>
      <div className={`${droppingStyle.droppingOddsBg} mt-3`}>
        <PagesNav nextTab="Sure Bets" />
        <AboutDroppingOdds
          disciption={true}
          title="Sure Bets"
          description="Sure bets, also known as arbitrage bets, are a popular betting strategy that guarantees a profit regardless of the outcome of a sporting event. This method involves placing bets on all possible outcomes using different bookmakers to exploit differences in betting odds. By comparing the best sports odds, bettors can secure sure bets with minimal risk. Sure bets are a highly effective way to take advantage of fluctuating odds and maximize returns in sports betting."
        />

        {isLoader && <Loading height={50} width={50} />}

        {_sureBets?.map((sureBet, index) => (
          <div className="mt-4" key={index}>
            <SportsNav
              icon={getSportsIcon(sureBet.matches.match.breadcrumbs.sport.name)}
              title={sureBet.matches.match.breadcrumbs.sport.name}
              countryIcon={getFlagIconKey(
                sureBet.matches.match["country-name"]
              )}
              countryName={sureBet.matches.match["country-name"]}
              language={sureBet.matches.match["tournament-name"]}
            />

            <SportDetails
              countryOne={sureBet.matches.match["home-name"]}
              countryTwo={sureBet.matches.match["away-name"]}
              timing={
                window.localStorage.getItem("Timezone-object")
                  ? getDateAndTime(
                      sureBet.matches.match["date-start-timestamp"],
                      "DD MMMM YYYY, HH:mm"
                    )
                  : moment
                      .unix(sureBet.matches.match["date-start-timestamp"])
                      .format("DD MMMM YYYY, HH:mm")
              }
              match={sureBet.matches}
              minus={false}
              maxBookmarkers={sureBet.maxBookmarkers}
              img={GAME1}
              sureBets={
                (1 / Number(sureBet.sureBetsFinal.toFixed(4)) - 1) * 100
              }
              display={true}
              showMax={true}
              isSaveable={false}
            />
          </div>
        ))}

        {_sureBets && _sureBets?.length > 0 ? (
          <Virtuoso
            useWindowScroll
            totalCount={
              _sureBets.filter((sureBet) => sureBet?.matches?.match).length
            }
            data={_sureBets.filter((sureBet) => sureBet?.matches?.match)}
            overscan={3}
            initialItemCount={
              _sureBets.filter((sureBet) => sureBet?.matches?.match).length
            }
            itemContent={(index, sureBet) => {
              return (
                <div className="mt-4" key={index}>
                  <SportsNav
                    icon={getSportsIcon(
                      sureBet.matches.match.breadcrumbs.sport.name
                    )}
                    title={sureBet.matches.match.breadcrumbs.sport.name}
                    countryIcon={getFlagIconKey(
                      sureBet.matches.match["country-name"]
                    )}
                    countryName={sureBet.matches.match["country-name"]}
                    language={sureBet.matches.match["tournament-name"]}
                  />

                  <SportDetails
                    countryOne={sureBet.matches.match["home-name"]}
                    countryTwo={sureBet.matches.match["away-name"]}
                    timing={
                      window.localStorage.getItem("Timezone-object")
                        ? getDateAndTime(
                            sureBet.matches.match["date-start-timestamp"],
                            "DD MMMM YYYY, HH:mm"
                          )
                        : moment
                            .unix(sureBet.matches.match["date-start-timestamp"])
                            .format("DD MMMM YYYY, HH:mm")
                    }
                    match={sureBet.matches}
                    minus={false}
                    maxBookmarkers={sureBet.maxBookmarkers}
                    img={GAME1}
                    sureBets={
                      (1 / Number(sureBet.sureBetsFinal.toFixed(4)) - 1) * 100
                    }
                    display={true}
                    showMax={true}
                    isSaveable={false}
                  />
                </div>
              );
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default SureBetsComponent;
