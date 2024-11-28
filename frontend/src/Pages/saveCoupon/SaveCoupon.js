import React from "react";
import Default from "../../components/Default/Default";
import styles from "./SaveCoupon.module.css";
import { Col, Row } from "react-bootstrap";
import SaveCoupons from "../../components/MyCoupon/SaveCoupons";

const SaveCoupon = () => {
  return (
    <div className={styles.saveCoupon}>
      <Default>
        <Row className="mt-5 mb-5">
          <Col md={6}>
            <SaveCoupons />
          </Col>
        </Row>
      </Default>
    </div>
  );
};

export default SaveCoupon;
