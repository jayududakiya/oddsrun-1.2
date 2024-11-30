import React from "react";
import styles from "./Loader.module.css";
import LOADER_VIDEO from "../assets/loderGif.mp4";
const Loader = () => {
  return (
    <div className={styles.loaderMain}>
    <video
      src={LOADER_VIDEO}
      autoPlay
      loop
      muted
      playsInline
      className={styles.loaderVideo}
    />
  </div>
  );
};

export default Loader;
