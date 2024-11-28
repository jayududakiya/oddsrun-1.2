import React, { useEffect, useState, useRef } from "react";
import PagesNav from "../DroppingOdds/PagesNav";
import AboutDroppingOdds from "../DroppingOdds/AboutDroppingOdds";
import droppingStyle from "../../Pages/DroppingOdds/DroppingOdds.module.css";
import PostRequest from "../../services/PostRequest";
import axios from "axios";

const BookmakersComponent = () => {
  const [loading, setLoading] = useState(true);
  const [bookies, setBookies] = useState([]);
  const defaultFetchTriggered = useRef(false);

  const getBookies = async (country = "DEFAULT") => {
    setLoading(true);
    try {
      const response = await PostRequest("/bookmakers", { country: country });
      if (response) {
        setBookies(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getGeoInfo = async () => {
    try {
      const response = await axios.get("https://ipapi.co/json/");
      if (response) {
        getBookies(response.data.country_name);
      }
    } catch (error) {
      console.log(error);
      getBookies("DEFAULT");
    }
  };

  useEffect(() => {
    getGeoInfo();
  }, []);

  useEffect(() => {
    if (!loading && bookies.length === 0 && !defaultFetchTriggered.current) {
      defaultFetchTriggered.current = true; // Mark default fetch as triggered
      getBookies("DEFAULT");
    }
  }, [bookies, loading]);

  return (
    <div className={`${droppingStyle.droppingOddsBg} mt-3`}>
      <PagesNav nextTab="Bookmakers" />
      <AboutDroppingOdds
        disciption={true}
        title="Bookmakers Comparison - Where to Bet?"
        description="The best bookmakers stand out by offering competitive betting odds, ensuring that bettors get the highest potential returns on their wagers. They provide a wide range of betting markets, allowing users to bet on various sports, events, and outcomes. Top bookmakers also offer attractive bonuses and promotions, enhancing the overall betting experience with features like free bets and deposit bonuses. Additionally, features like live betting, fast payouts, and excellent customer support set them apart in any bookmakers comparison, making them the ideal choice for serious bettors looking for the best sports odds."
      />

      {loading ? (
        <p>Loading...</p>
      ) : bookies.length > 0 ? (
        bookies.map((booky, index) => {
          if (booky.fullDescriptions) {
            return (
              <div
                key={index}
                dangerouslySetInnerHTML={{
                  __html: `<p>${booky.fullDescriptions}</p>`,
                }}
              ></div>
            );
          }
          return null;
        })
      ) : (
        <p>No bookmakers available.</p>
      )}
    </div>
  );
};

export default BookmakersComponent;
