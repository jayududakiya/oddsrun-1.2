import React from "react";
import styles from "./MyCoupon.module.css";
import BettingToolItem from "./BettingToolItem";
import { useEffect } from "react";
import PostRequest from "../../services/PostRequest";
import { useState } from "react";
import { ASSETS_URL } from "../../config/Api_Url";
import axios from "axios";

const BettingTool = () => {
  const [banner, setBanner] = useState({});
  const [country, setCountry] = useState("");
  const [defaultBanner, setDefaultBanner] = useState({});

  const getGeoInfo = async () => {
    try {
      let response = await axios.get("https://ipapi.co/json/");
      if (response) {
        setCountry(response.data.country_name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBannerImage = async () => {
    try {
      const response = await PostRequest("/banner", { country: country });
      console.log(response);

      if (response) {
        setBanner(response);
      }
    } catch (error) {}
  };
  const getDefaultBannerImage = async () => {
    try {
      const response = await PostRequest("/banner", { country: "DEFAULT" });
      console.log(response);

      if (response) {
        setDefaultBanner(response);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getGeoInfo();
  }, []);
  useEffect(() => {
    getBannerImage();
    getDefaultBannerImage();
  }, [country]);

  useEffect(() => {
    // Load external script
    const script = document.createElement("script");
    script.src = "https://ggbetpro.com/l/6700ecd72ca24576c408c63b";
    script.async = true;
    const adminBroBox = document.getElementById("banner_img");
    if (adminBroBox) {
      adminBroBox.appendChild(script);
    }
  
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);
  

  return (
    <div>
      <div className={`${styles.myCouponBg} mt-3`}>
        {/* <p className={`${styles.myCouponTitle} mt-2`}>Banners</p>

        <hr /> */}
        {/* <div>
          <BettingToolItem
            icon="solar:graph-down-new-broken"
            title="Dropping odds"
          />
          <div className="mt-3">
            <BettingToolItem icon="charm:block" title="Blocked Odds" />
          </div>
          <div className="mt-3">
            <BettingToolItem icon="solar:graph-up-linear" title="Value Bets" />
          </div>
          <div className="mt-3">
            <BettingToolItem icon="nimbus:fire" title="Hot Matches" />
          </div>
          <div className="mt-3">
            <BettingToolItem
              icon="solar:graph-up-linear"
              title="Archived Results"
            />
          </div>
          <div className="mt-3">
            <BettingToolItem
              icon="carbon:list-checked-mirror"
              title="Standings"
            />
          </div>
        </div> */}
        <div id="banner_img"  className={styles.banner_Img}></div>
        {/* <a href={banner.url} target="_blank" >
          {banner?.image ? (
            <img
              className={styles.bannerImage}
              src={ASSETS_URL + banner?.image}
              alt=""
            />
          ) : (
            // <img className={styles.bannerImage} src={ASSETS_URL + defaultBanner?.image} alt="" />
            <img
              className={styles.bannerImage}
              src={ASSETS_URL + defaultBanner?.image}
              alt=""
            />
          )}
        </a> */}
      </div>
    </div>
  );
};

export default BettingTool;
