import React, { useEffect } from "react";
import Default from "../../components/Default/Default";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "react-bootstrap";
import DroppingOddsComponent from "../../components/DroppingOdds/DroppingOddsComponent";
import CouponDetails from "../../components/MyCoupon/CouponDetails";

const DroppingOdds = () => {
  useEffect(() => {
    // Create the script element
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://www.oddsrun.com/droppingOdds",
      name: "Dropping Odds | Track Sports Betting Trends & Maximize Wins",
      description:
        "Stay ahead in betting with Dropping Odds. Monitor market shifts and spot opportunities to secure the highest odds for maximum returns.",
      url: "https://www.oddsrun.com/droppingOdds",
    });

    // Append the script to the document head
    document.head.appendChild(script);

    // Cleanup function to remove the script if necessary
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return (
    <>
      <Default>
        <h1 className="fs-3 fw-bold pt-3 px-2 pb-0 mb-0 text-capitalize">droppingOdds</h1>
        <Row>
          <Col xs={12} lg={8}>
            <DroppingOddsComponent />
          </Col>
          <Col xs={12} lg={4}>
            <div className="p-3">
              <CouponDetails />
            </div>
          </Col>
        </Row>
      </Default>
    </>
  );
};

export default DroppingOdds;
