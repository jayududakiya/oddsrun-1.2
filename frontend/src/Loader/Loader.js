import React from "react";
import styles from "./Loader.module.css";
import LOADER from "../assets/loderGif.gif";

const Loader = () => {
  return (
    <div className={styles.loaderMain}>
      <img src={LOADER} alt="" />
    </div>
  );
};

export default Loader;
