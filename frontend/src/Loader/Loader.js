import React from "react";
import { ColorRing } from "react-loader-spinner";
import styles from "./Loader.module.css";
import LOADER from "../assets/loderGif.gif";

const Loader = () => {

  return (
    <div className={styles.loaderMain}>
      {/* <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#656ef5", "#e0e2fd", "#656ef5", "#e0e2fd", "#656ef5"]}
      /> */}
      <img src={LOADER} alt="" />
    </div>
  );
};

export default Loader;
