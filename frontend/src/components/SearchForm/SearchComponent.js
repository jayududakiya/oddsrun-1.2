import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import searchStyle from "./SearchForm.module.css";
import { Stack } from "react-bootstrap";
import { getAssetImage } from "../../data/flag";
import { NavLink } from "react-router-dom";
import { stringToSlug } from "../../data/formater";
import PostRequest from "../../services/PostRequest";

const SearchComponent = (props) => {
  const [searchResult, setSearchResult] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState("");
  const [isSearching, setIsSearching] = useState(false);

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
      // toast.error(error);
    }
  };

  const toggleSearch = () => {
    setIsSearching(!isSearching);
  };

  return (
    <div className="search-container">
      {isSearching ? (
        <div className="search-input-container">
          <input
            onChange={getPlayer}
            className="search-input"
            type="text"
            placeholder="Search..."
          />
          <Icon
            onClick={toggleSearch}
            icon="material-symbols-light:close"
            className={"me-2"}
            fontSize={"18px"}
          />
        </div>
      ) : (
        <div className="me-3">
          <Icon
            onClick={toggleSearch}
            icon="ri:search-2-line"
            fontSize={"18px"}
          />
        </div>
      )}

      {isSearchActive && (
        <div className={searchStyle.mobileSearchResult}>
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
                <Stack
                  className="mt-3"
                  key={index}
                  direction="horizontal"
                  gap={2}
                >
                  <img
                    height={24}
                    width={"auto"}
                    src={getAssetImage(
                      result.isHomeTeam
                        ? result.data.match["home-participant-images"]
                        : result.data.match["away-participant-images"]
                    )}
                    alt={
                      result.isHomeTeam
                        ? result.data.match["home-name"]
                        : result.data.match["away-name"]
                    }
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
      )}
    </div>
  );
};

export default SearchComponent;
