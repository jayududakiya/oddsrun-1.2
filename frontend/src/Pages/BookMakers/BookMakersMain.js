import React, { useEffect } from "react";
import Default from "../../components/Default/Default";
import CouponDetails from "../../components/MyCoupon/CouponDetails";
import { Col, Row } from "react-bootstrap";
import BookmakersComponent from "../../components/BookMakers/BookmakersComponent";

const BookMakersMain = () => {
  useEffect(() => {
    // Create the script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://www.oddsrun.com/bookmakers",
      "name": "Bookmakers Odds Comparison | Find Top Betting Sites",
      "description": "Compare bookmakers odds for the best betting sites. Get top odds, bonuses, and more with our bookmakers odds comparison for the highest returns on your wagers.",
      "url": "https://www.oddsrun.com/bookmakers"  
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
          <BookmakersComponent />
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

export default BookMakersMain;
