import React, { useEffect, useState } from "react";
import Default from "../../components/Default/Default";
import CouponDetails from "../../components/MyCoupon/CouponDetails";
import { Col, Row } from "react-bootstrap";
import HomeComponent from "../../components/Home/HomeComponent";
import { countryName } from "../../store/data.reducer";
import { useDispatch, useSelector } from "react-redux";
import { loadHotMatches, loadNextMatches } from "../../store/data.action";
import { toast } from "react-toastify";
import { getDateAndTime } from "../../data/formater";
import moment from "moment";

const Home = () => {
  const [isLoader, setIsLoader] = useState([false]);

  const _hotMatches = useSelector((state) => state.dataReducer.hotMatches);
  const _nextMatches = useSelector((state) => state.dataReducer.nextMatches);
  const dispatch = useDispatch();
  const saveCountryName = async () => {
    try {
      const country = window.localStorage.getItem("countryName");

      if (country == null) {
        countryName();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const hotMatches = async () => {
    setIsLoader(true);
    const currentDate = getDateAndTime(moment().unix());
    const date = moment(currentDate, "DD MMM HH:mm").format("YYYYMMDD");
    try {
      dispatch(loadHotMatches({ date: date }));
      setIsLoader(false);
    } catch (error) {
      toast.error(error);
    }
  };

  const nextMatches = () => {
    setIsLoader(true);
    try {
      dispatch(loadNextMatches({ sport: "soccer", isUpcoming: true }));
      setIsLoader(false);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    saveCountryName();
    hotMatches();
    nextMatches();
  }, []);

  useEffect(() => {
    // Create the script element
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://www.oddsrun.com/",
      name: "Sports Betting Odds Calculator | Compare Betting Odds",
      description:
        "Use our sports betting odds calculator to compare odds across top bookmakers for Football, Tennis, NFL, esports, and more. Get the best odds today!",
      url: "https://www.oddsrun.com/",
    });

    console.log('script', script)

    // Append the script to the document head
    document.head.appendChild(script);

    // Cleanup function to remove the script if necessary
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Default>
      <Row>
        <Col xs={12} lg={8}>
          <HomeComponent
            hotMatchesDetails={_hotMatches}
            nextMatches={_nextMatches}
            isLoader={isLoader}
          />
        </Col>
        <Col xs={12} lg={4}>
          <div className="p-3">
            <CouponDetails />
          </div>
        </Col>
      </Row>
    </Default>
  );
};

export default Home;
