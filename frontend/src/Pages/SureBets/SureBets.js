import React, { useState } from "react";
import Default from "../../components/Default/Default";
import { Col, Row } from "react-bootstrap";
import CouponDetails from "../../components/MyCoupon/CouponDetails";
import SureBetsComponent from "../../components/SureBets/SureBetsComponent.js";

const SureBets = () => {
  const [isLoader, setIsLoader] = useState([false]);
  return (
    <Default>
      <Row>
        <Col md={8}>
          <SureBetsComponent isLoader={isLoader} setIsLoader={setIsLoader} />
        </Col>
        <Col md={4}>
          <div className="p-3">
            <CouponDetails />
          </div>
        </Col>
      </Row>
    </Default>
  );
};

export default SureBets;
