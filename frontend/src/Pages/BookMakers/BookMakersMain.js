import React from "react";
import Default from "../../components/Default/Default";
import CouponDetails from "../../components/MyCoupon/CouponDetails";
import { Col, Row } from "react-bootstrap";
import BookmakersComponent from "../../components/BookMakers/BookmakersComponent";

const BookMakersMain = () => {
  return (
    <Default>
      <Row>
        <Col md={8}>
          <BookmakersComponent />
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

export default BookMakersMain;
