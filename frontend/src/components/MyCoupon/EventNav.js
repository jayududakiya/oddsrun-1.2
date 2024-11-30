import React from "react";
import { Stack, Nav, NavDropdown } from "react-bootstrap";
import styles from "./MyCoupon.module.css";
import NavTab from "./NavTab";

const TABS = [
  { title: "Football" },
  { title: "Basketball" },
  { title: "Baseball" },
  { title: "Hockey" },
  { title: "Tennis" },
];

const DROPDOWN_ITEMS = [
  "American Football",
  "Boxing",
  "Cricket",
  "Darts",
  "Esports",
  "Handball",
  "MMA",
  "Snooker",
  "Volleyball",
  "Badminton",
  "Waterpolo",
];

const EventNav = ({ onClickTab, isActive }) => {
  return (
    <div className={styles.eventNavWrapper}>
      <Stack
        direction="horizontal"
        gap={3}
        className={`${styles.evetTabDisplay} ${styles.gap}`}
      >
        {/* Render Main Tabs */}
        <Stack
          direction="horizontal"
          gap={3}
          className={`${styles.gap} ${styles.custom_stack_wrap}`}
        >
          {TABS.map((tab, index) => (
            <NavTab
              key={index}
              title={tab.title}
              isActive={isActive && isActive(tab.title)}
              onClickTab={onClickTab}
            />
          ))}

          {/* Render More Dropdown */}
          <div className={styles.more}>
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title={<span style={{ color: "#656ef5" }}>More</span>}
              >
                {DROPDOWN_ITEMS.map((item, index) => (
                  <NavDropdown.Item key={index}>
                    <NavTab title={item} onClickTab={onClickTab} />
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          </div>
        </Stack>
      </Stack>
    </div>
  );
};

export default EventNav;
