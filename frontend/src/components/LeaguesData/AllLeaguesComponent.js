import React, { useEffect, useState } from "react";
import PagesNav from "../DroppingOdds/PagesNav";
import AboutDroppingOdds from "../DroppingOdds/AboutDroppingOdds";
import droppingStyle from "../../Pages/DroppingOdds/DroppingOdds.module.css";
import myCouponStyle from "../MyCoupon/MyCoupon.module.css";
import { NavLink, useParams } from "react-router-dom";
import MycouponMsgBtn from "../MyCoupon/MycouponMsgBtn";
import { Col, Row, Stack } from "react-bootstrap";
import BettingToolItem from "../MyCoupon/BettingToolItem";
import PostRequest from "../../services/PostRequest";
import { doFormatText, stringToSlug } from "../../data/formater";
import { getFlagIconKey } from "../../data/flag";
import { Icon } from "@iconify/react/dist/iconify.js";
import BreadcrumbComponent from "../DroppingOdds/Breadcrumbs";
import useMetaTags from "../../hooks/useMetaTags";

const AllLeaguesComponent = () => {
  const params = useParams();
  const [navs, setNavs] = useState([]);

  const events = [
    "Premier League (21)",
    "Euro U21 (2)",
    "Euro 2024 (12)",
    "Champions League (2)",
    "Premier League (21)",
    "Euro U21 (2)",
    "Euro 2024 (12)",
    "Champions League (2)",
  ];

  const [leaguesData, setLeaguesData] = useState({});

  const generateSeries = (length) => {
    let series = [];
    for (let i = 0; i < length; i++) {
      if (i % 4 === 0 || i % 4 === 1) {
        series.push(i);
      }
    }
    return series;
  };

  const topEventsIndices = generateSeries(events.length);
  // console.log('topEventsIndices', events);

  const loadAllLeagues = async () => {
    const data = {
      groupBy: "country",
      sport: params["sport-name"],
      country: params["country-name"],
    };

    try {
      const response = await PostRequest("/sport/leagues", data);

      setLeaguesData(response);
    } catch (error) { }
  };

  useEffect(() => {

    if (params) {
      const nvs = [{
        title: params["sport-name"] == 'soccer' ? 'football' : params["sport-name"],
        url: `/${stringToSlug(params["sport-name"])}`
      }];


      if (params["country-name"]) {
        nvs.push({
          title: params["country-name"],
          url: `/${stringToSlug(params["country-name"])}/${stringToSlug(params["sport-name"])}`
        })
      }

      setNavs(nvs)
    }


    loadAllLeagues();
  }, [params]);

  let countryName = params["country-name"]
  let sportsName = params["sport-name"]

  const meta = {
    title: params ?
      `${(sportsName == 'soccer' ? 'Football' : sportsName)
      + "," + ' '
      + doFormatText(sportsName) + ' '
      + (doFormatText(countryName) == undefined ? '' : doFormatText(countryName)) + ' '} best betting odds, results and comparison betting lines` : "",


    description: params ? `Compare best betting lines and betting odds for the ${doFormatText(countryName) + ' '
      + sportsName == 'soccer' ? 'Football' : sportsName + ', '
      + sportsName + ' '} leagues and tournaments. Explore odds arbitrage, results and find the best betting bookmakers.` : '',

    canonical: window.location.href,
    meta: {
      charset: "utf-8",
      name: {
        keywords:
          params ?
            `${(sportsName == 'soccer' ? 'Football' : sportsName)
            + "," + ' '
            + doFormatText(sportsName) + ' '
            + (doFormatText(countryName) == undefined ? '' : doFormatText(countryName) + ' ')}leagues, tournaments, odds comparison, dropping odds, matched betting, compare sport odds, predictions, tips, results, betting lines`
            : ""
      },
    },
  }

  const metaTags = [
    { name: "description", content: meta.description },
    { name: "keywords", content: meta.meta.name.keywords },
  ];

  useMetaTags(metaTags, meta.title);


  return (
    <>
      <div className={`${droppingStyle.droppingOddsBg} mt-3`}>
        <BreadcrumbComponent navs={navs} />
        <AboutDroppingOdds disciption={true} title={`${doFormatText(params["sport-name"] == 'soccer' ? 'football' : params["sport-name"])} Betting Odds Comparison`} />

        {/* <Stack direction="horizontal" className="mt-4" gap={2}>
          <MycouponMsgBtn title={<div className="m-1">Upcoming Events</div>} />
          <MycouponMsgBtn title={<div className="m-1">Results</div>} />
        </Stack> */}

        <div className={`mt-4 ${myCouponStyle.sportsName}`}>
          {Object.entries(leaguesData).map(([league, data], index) => (
            <>
              {/* {console.log("data", league)} */}
              <div className={myCouponStyle.leaguesHeading}>
                <Stack direction="horizontal" gap={2}>
                  <div>
                    <Icon icon={getFlagIconKey(doFormatText(league))} />
                  </div>
                  <div>{doFormatText(league)}</div>
                </Stack>
              </div>

              <Row>
                {data.map((event, eventIndex) => {
                  // console.log('event.name', event);
                  const topEventsIndices = generateSeries(data.length);
                  return (
                    <Col md={6} key={eventIndex} className="pb-1">
                      <div key={eventIndex}
                        // className={eventIndex == 0 ? myCouponStyle : "SetPlace"}
                        className={topEventsIndices.indexOf(eventIndex) !== -1 ? myCouponStyle.SetPlace : myCouponStyle.bgTopEvents}
                      >
                        <NavLink to={`/matches/${event.sport}/${event.country}/${event.name}`} >
                          <BettingToolItem title={doFormatText(event.name)} />
                        </NavLink>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllLeaguesComponent;
