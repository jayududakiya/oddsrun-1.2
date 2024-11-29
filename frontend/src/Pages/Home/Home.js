import React, { useEffect, useState } from "react";
import Default from "../../components/Default/Default";
import CouponDetails from "../../components/MyCoupon/CouponDetails";
import { Col, Row } from "react-bootstrap";
import HomeComponent from "../../components/Home/HomeComponent";
import { countryName } from "../../store/data.reducer";
import { useDispatch, useSelector } from "react-redux";
import { loadHotMatches, loadNextMatches } from "../../store/data.action";
import { toast } from "react-toastify";
import { getDateAndTime } from "../../data/formater";
import moment from "moment";

const Home = () => {
  const [isLoader, setIsLoader] = useState([false]);

  const _hotMatches = useSelector((state) => state.dataReducer.hotMatches);
  const _nextMatches = useSelector((state) => state.dataReducer.nextMatches);
  const dispatch = useDispatch();
  const saveCountryName = async () => {
    try {
      const country = window.localStorage.getItem("countryName");

      if (country == null) {
        countryName();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const hotMatches = async () => {
    setIsLoader(true);
    const currentDate = getDateAndTime(moment().unix());
    const date = moment(currentDate, "DD MMM HH:mm").format("YYYYMMDD");
    try {
      dispatch(loadHotMatches({ date: date }));
      setIsLoader(false);
    } catch (error) {
      toast.error(error);
    }
  };

  const nextMatches = () => {
    setIsLoader(true);
    try {
      dispatch(loadNextMatches({ sport: "soccer", isUpcoming: true }));
      setIsLoader(false);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    saveCountryName();
    hotMatches();
    nextMatches();
  }, []);

  return (
    <Default>
      <Row>
        <Col xs={12} lg={8}>
          <HomeComponent
            hotMatchesDetails={_hotMatches}
            nextMatches={_nextMatches}
            isLoader={isLoader}
          />
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

export default Home;
