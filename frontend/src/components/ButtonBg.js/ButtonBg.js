import React from "react";
import styles from "../Header/Header.module.css";

const ButtonBg = (props) => {
  return (
    <div>
      <button className={`${styles.btnRegister} ${props.btnPadding && styles.btnPadding}`}>{props.btnName}</button>
    </div>
  );
};

export default ButtonBg;
