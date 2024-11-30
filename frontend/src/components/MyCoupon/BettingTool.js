import React from "react";
import styles from "./MyCoupon.module.css";
import { useEffect } from "react";

const BettingTool = () => {
  useEffect(() => {
    // Load external script
    const script = document.createElement("script");
    script.src = "https://ggbetpro.com/l/6700ecd72ca24576c408c63b";
    script.async = true;

    const adminBroBox = document.getElementById("banner_img");
    if (adminBroBox) {
      adminBroBox.appendChild(script);
    }

    script.onload = () => {
      // Wait for the script to load and add the alt attribute to the image
      const imgTag = adminBroBox.querySelector("img"); // Assuming the script injects an <img> inside #banner_img
      if (imgTag) {
        imgTag.alt = "banner"; // Replace with your desired alt text
      }
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div>
      <div className={`${styles.myCouponBg} mt-3`}>
        <div id="banner_img" className={styles.banner_Img}></div>
      </div>
    </div>
  );
};

export default BettingTool;
