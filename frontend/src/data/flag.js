import { BROKER_SPORT_ASSEST } from "../config/Api_Url";

export const getFlagIconKey = (country) => {
  // console.log("country------------------------", country);
  if (typeof country !== "string") {
    if (country === undefined) {
      country = "undefined";
    } else {
      country = String(country);
    }
  }
  country = country.trim().toLowerCase();
  switch (country) {
    case "hong-kong":
      return "twemoji:flag-hong-kong-sar-china";
    case "hong kong":
      return "twemoji:flag-hong-kong-sar-china";
    case "asia":
      return "fluent-emoji-flat:globe-showing-asia-australia";
    case "europe":
      return "twemoji:flag-european-union";
    case "africa":
      return "twemoji:flag-south-africa";
    case "czech-republic":
      return "twemoji:flag-czechia";
    case "south-america":
      return "ic:sharp-south-america";
    case "usa":
      return "twemoji:flag-liberia";
    case "north-central-america":
      return "emojione:globe-showing-americas";

    case "northern-ireland":
      return "twemoji:flag-ireland";
    case "korea, republic of":
      return "cif:kr";

    case "dominican republic":
      return "twemoji:flag-dominican-republic";
    case "united states of america":
      return "twemoji:flag-us-outlying-islands";
    case "united kingdom of great britain and northern ireland":
      return "twemoji:flag-for-flag-france";
    case "south africa":
      return "twemoji:flag-south-africa";
    case "bolivia, plurinational state of":
      return "emojione-v1:flag-for-bolivia";
    case "bosnia and herzegovina":
      return "emojione-v1:flag-for-bosnia-and-herzegovina";

    case "world":
      return "noto-v1:world-map";
    case "switzerland":
      return "noto-v1:world-map";
    case "türkiye":
      return "twemoji:flag-turkiye";
    case "new zealand":
      return "twemoji:flag-new-zealand";
    case "syrian arab republic":
      return "emojione-v1:flag-for-syria";
    case "taiwan, province of china":
      return "twemoji:flag-taiwan";
    case "venezuela, bolivarian republic of":
      return "twemoji:flag-venezuela";
    case "moldova, republic of":
      return "emojione-v1:flag-for-moldova";
    case "north macedonia":
      return "twemoji:flag-north-macedonia";
    case "ivory":
      return "flag:ci-4x3";
    case "undefined":
      return "noto-v1:world-map";

    default:
      return `twemoji:flag-${country}`;
  }
};

export const _getMarket = (market) => {
  // console.log('market',market)

  switch (market.length) {
    case 1:
      return "1";

    case 2:
      return "1|2";

    case 3:
      return "1|X|2";

    default:
      return "1|X|2";
  }
};

export const getAssetImage = (pathUrl) => {
  return `${BROKER_SPORT_ASSEST}${pathUrl}`;
};
