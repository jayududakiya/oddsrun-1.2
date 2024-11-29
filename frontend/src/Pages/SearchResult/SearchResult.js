import React from "react";
import Default from "../../components/Default/Default";
import CouponDetails from "../../components/MyCoupon/CouponDetails";
import { Col, Row } from "react-bootstrap";
import SearchResultComponent from "../../components/searchResult/SearchResultComponent";
import { useParams } from "react-router-dom";

const SearchResult = () => {
  const params = useParams();
  return (
    <Default>
      <Row>
        <Col xs={12} lg={8}>
          <SearchResultComponent params={params} />
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

export default SearchResult;
