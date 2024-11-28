import React from "react";
import { Col, Row } from "react-bootstrap";
import Default from "../../components/Default/Default";
import BookMakers from "../../components/BookMakers/BookMakers";

import styles from "./MatchWithOdds.module.css";
import CouponDetails from "../../components/MyCoupon/CouponDetails";

const MatchWithOdds = () => {

  return (
    <Default>
      <Row>
        <Col md={8}>
          <div className="pt-3">
            <BookMakers />
          </div>
        </Col>
        <Col md={4} className={styles.navbarDisplay}>
          <div className="p-3">
            <CouponDetails />
          </div>
        </Col>
      </Row>
    </Default>
  );
};

export default MatchWithOdds;
