import React from "react";
import styles from "../Pages/Login/Login.module.css";
import { Col, Row } from "react-bootstrap";

const FormDefault = (props) => {
  return (
    <div className={styles.loginBg}>
      <h4>OddsRun</h4>

      <div className="container m-auto mt-5">
        <Row>
          <Col md={7} className={`${styles.displayOrNot} mt-5`}>
            <h1>OddsRun</h1>
            <h2>
              Unlock the Winning Odds: Your Ultimate Destination for Game
              Betting!
            </h2>
          </Col>
          <Col md={5}>
            <div className={styles.card}>
              <p className={styles.signInText}>{props.title}</p>

              {props.children}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FormDefault;
