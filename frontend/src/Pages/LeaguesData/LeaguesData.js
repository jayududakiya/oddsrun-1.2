import React from "react";
import style from "./LeaguesData.module.css";
import Default from "../../components/Default/Default";
import { Col, Row } from "react-bootstrap";
import LeaguesDataComponent from "../../components/LeaguesData/LeaguesDataComponent";
import CouponDetails from "../../components/MyCoupon/CouponDetails";

const LeaguesData = () => {
  return (
    <Default>
      <Row>
        <Col md={8}>
          <LeaguesDataComponent />
        </Col>
        <Col md={4} className={style.premierLanDisplay}>
          <div className="p-3">
            <CouponDetails />
          </div>
        </Col>
      </Row>
    </Default>
  );
};

export default LeaguesData;
