import React, { useEffect, useState } from "react";
import Default from "../../components/Default/Default";
import { Col, Row } from "react-bootstrap";
import CouponDetails from "../../components/MyCoupon/CouponDetails";
import SureBetsComponent from "../../components/SureBets/SureBetsComponent.js";

const SureBets = () => {
  const [isLoader, setIsLoader] = useState([false]);
  useEffect(() => {
    // Create the script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://www.oddsrun.com/sure-bets",
      "name": "Sure Bets | Maximize Profit with Arbitrage Betting",
      "description": "Sure Bets | Maximize Profit with Arbitrage Betting",
      "url": "https://www.oddsrun.com/sure-bets"  
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
      <Row>
        <Col xs={12} lg={8}>
          <SureBetsComponent isLoader={isLoader} setIsLoader={setIsLoader} />
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

export default SureBets;
