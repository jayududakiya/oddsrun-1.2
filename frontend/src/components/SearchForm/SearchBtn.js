import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import styles from "../Header/Header.module.css";
import searchStyle from "../SearchForm/SearchForm.module.css";
import { NavLink } from "react-router-dom";
import { Stack } from "react-bootstrap";
import { getAssetImage } from "../../data/flag";
import PostRequest from "../../services/PostRequest";
import { stringToSlug } from "../../data/formater";
import { toast } from "react-toastify";

const SearchBtn = (props) => {
  const [isSearchActive, setIsSearchActive] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const getPlayer = async (event) => {
    if (event.target.value == "") {
      setIsSearchActive(false);
      setSearchResult([]);
      return false;
    }
    try {
      const data = {
        search: event.target.value,
        sport: props.sportName,
      };

      const response = await PostRequest("/search", data);

      if (response) {
        setIsSearchActive(true);
        setSearchResult(response);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        className={`${styles.searchTeam}`}
        onChange={getPlayer}
        style={{ backgroundColor: props.searchResult ? "white" : "" }}
      >
        <input type="text" placeholder="Search team/player" />
        <Icon icon="ri:search-2-line" color="#818398" fontSize={"20px"} />
      </div>

      {isSearchActive && (
        <div className={searchStyle.overlay}>
          <div className={searchStyle.bgSearchForm}>
            {searchResult.map((result, index) => {
              return (
                <NavLink
                  onClick={() => {
                    setIsSearchActive(false);
                  }}
                  key={index}
                  to={`/search/${stringToSlug(
                    result.isHomeTeam
                      ? result.data.match["home-name"]
                      : result.data.match["away-name"]
                  )}${result.data.match.breadcrumbs.tournament.url}`}
                >
                  <Stack className="mt-3" direction="horizontal" gap={2}>
                    <img
                      height={24}
                      width={"auto"}
                      src={getAssetImage(
                        result.isHomeTeam
                          ? result.data.match["home-participant-images"]
                          : result.data.match["away-participant-images"]
                      )}
                      alt="away-participant-images"
                    />
                    <span className="ml-1">
                      {result.isHomeTeam
                        ? result.data.match["home-name"]
                        : result.data.match["away-name"]}
                    </span>
                  </Stack>
                </NavLink>
              );
            })}

            {searchResult.length == 0 && isSearchActive && (
              <span> There are no any result found! </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBtn;
