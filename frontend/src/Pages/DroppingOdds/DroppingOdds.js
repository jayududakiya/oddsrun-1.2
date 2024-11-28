import React from "react";
import Default from "../../components/Default/Default";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "react-bootstrap";
import DroppingOddsComponent from "../../components/DroppingOdds/DroppingOddsComponent";
import CouponDetails from "../../components/MyCoupon/CouponDetails";

const DroppingOdds = () => {
  return (
    <>
      <Default>
        <Row>
          <Col md={8} className="p-0">
            <DroppingOddsComponent />
          </Col>
          <Col md={4}>
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
