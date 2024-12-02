import React, { useEffect, useState } from "react";
import Default from "../../components/Default/Default";
import { Col, Row } from "react-bootstrap";
import NextMatchesComponent from "../../components/NextMatches/NextMatchesComponent";
import CouponDetails from "../../components/MyCoupon/CouponDetails";
import { useParams } from "react-router-dom";

const NextMatches = () => {
  const [isLoader, setIsLoader] = useState([false]);
  const params = useParams();

  useEffect(() => {
    const handleParamChange = () => {
      window.location.reload();
    };

    window.addEventListener("popstate", handleParamChange);

    return () => {
      window.removeEventListener("popstate", handleParamChange);
    };
  }, [params["sport-name"]]);

  useEffect(() => {
    // Create the script element
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://www.oddsrun.com/soccer/next-matches",
      "name": "Upcoming Sports Events | Next Matches Odds & Betting",
      "description": "Discover upcoming sports events and compare odds from top bookmakers for the best betting opportunities on the next matches. Stay informed and bet smarter.",
      "url": "https://www.oddsrun.com/soccer/next-matches"  
    });

    // Append the script to the document head
    document.head.appendChild(script);

    // Cleanup function to remove the script if necessary
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Default>
      <h1 className="fs-3 fw-bold pt-3 px-2 pb-0 mb-0  text-capitalize">
        Upcoming Matches & Odds
      </h1>
      <Row>
        <Col xs={12} lg={8}>
          <NextMatchesComponent
            params={
              params["sport-name"] == "soccer"
                ? "football"
                : params["sport-name"]
            }
            isLoader={isLoader}
            setIsLoader={setIsLoader}
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

export default NextMatches;
