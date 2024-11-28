import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./Default.module.css";
import { Col, Row, Stack } from "react-bootstrap";
import { Icon } from "@iconify/react";
import SearchComponent from "../SearchForm/SearchComponent";
import { NavLink } from "react-router-dom";

const Default = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const openMenuEvent = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <Row className={`me-0 ms-0 `}>
        <Col md={2} className={`${styles.sidebar} me-0 ms-0 pe-0 ps-0`}>
          <Sidebar />
        </Col>

        <Col md={10} className={`${styles.mainBg}  ps-0`}>
          <div className={`${styles.responsiveHeader}`}>
            <div className="d-flex justify-content-between">
              <Stack direction="horizontal">
                <Icon
                  onClick={openMenuEvent}
                  fontSize={"24px"}
                  icon="material-symbols:menu"
                />
                <NavLink to={"/home"}>
                  <div className={styles.logoRH}>OddsRun</div>
                </NavLink>
              </Stack>
              <Stack direction="horizontal">
                <SearchComponent />
                <NavLink to={"/save-coupon"}>
                  <Icon
                    icon="solar:sim-card-minimalistic-linear"
                    fontSize={"20px"}
                  />
                </NavLink>
              </Stack>
            </div>
          </div>
          {openMenu && (
            <div className={styles.openMenu}>
              <Sidebar
                closeSidebar={() => {
                  setOpenMenu(false);
                }}
                responsive={true}
              />
            </div>
          )}

          <Header />
          <div
            className={`${styles.padingStart} ${openMenu && styles.sidebar}`}
          >
            {props.children}
          </div>

          <Footer />
        </Col>
      </Row>
    </>
  );
};

export default Default;
