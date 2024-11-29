import React from "react";
import { Nav, NavDropdown, Stack } from "react-bootstrap";
import styles from "./MyCoupon.module.css";
import NavTab from "./NavTab";

const EventNav = (props) => {
  const { onClickTab = false, isActive } = props;

  return (
    <>
      <Stack
        direction="horizontal"
        className={`${styles.evetTabDisplay} ${styles.gap}`}
        gap={3}
      >
        <Stack
          direction="horizontal"
          gap={3}
          className={`${styles.gap} ${styles.custom_stack_wrap}`}
        >
          <NavTab
            isActive={isActive && isActive("Football")}
            onClickTab={onClickTab}
            title="Football"
          />
          <NavTab
            isActive={isActive && isActive("Basketball")}
            onClickTab={onClickTab}
            title="Basketball"
          />
          <NavTab
            isActive={isActive && isActive("Baseball")}
            onClickTab={onClickTab}
            title="Baseball"
          />
        </Stack>
        <Stack
          direction="horizontal"
          gap={3}
          className={`${styles.gap} ${styles.custom_stack_wrap}`}
        >
          <NavTab
            icon="noto-v1:hole"
            isActive={isActive && isActive("Hockey")}
            onClickTab={onClickTab}
            title="Hockey"
          />
          <NavTab
            icon="emojione-v1:tennis"
            onClickTab={onClickTab}
            isActive={isActive && isActive("Tennis")}
            title="Tennis"
          />

          <div className={`ms-auto ${styles.more}`}>
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title={<span style={{ color: "#656ef5" }}>More</span>}
              >
                <NavDropdown.Item>
                  <NavTab onClickTab={onClickTab} title="American Football" />
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavTab onClickTab={onClickTab} title="Boxing" />
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavTab onClickTab={onClickTab} title="Cricket" />
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavTab onClickTab={onClickTab} title="Darts" />
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavTab onClickTab={onClickTab} title="Esports" />
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavTab onClickTab={onClickTab} title="Handball" />
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavTab onClickTab={onClickTab} title="MMA" />
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavTab onClickTab={onClickTab} title="Snooker" />
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavTab onClickTab={onClickTab} title="Volleyball" />
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavTab onClickTab={onClickTab} title="Badminton" />
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavTab onClickTab={onClickTab} title="Waterpolo" />
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </div>
        </Stack>
      </Stack>
    </>
  );
};

export default EventNav;
