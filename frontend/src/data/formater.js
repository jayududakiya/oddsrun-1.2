import moment from "moment";
import BOOKIES_DATA from "./bookies";
export const doFormatText = (text) => {
  let words = text?.split("-");
  for (let i = 0; i < words?.length; i++) {
    words[i] =
      words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }

  let wordsCap = ["atp", "wta", "itf", "nba", "nhl", "nfl"];

  // Create a regular expression that matches any of the words
  let regex = new RegExp(`\\b(${wordsCap.join("|")})\\b`, "gi");

  // Replace the matched words with their uppercase version
  var ftext = words?.join(" ").replace(regex, (match) => match.toUpperCase());

  return ftext;
};

export const stringToSlug = (str) => {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
};

export const numFormate = (input) => {
  const num = parseFloat(input);
  if (isNaN(num)) {
    throw new Error("Invalid number");
  }
  if (num % 1 === 0) {
    return num.toString();
  } else {
    return num.toFixed(1);
  }
};

const decimalToFractional = (decimalOdds) => {
  try {
    // Check if the input is valid
    if (decimalOdds <= 1) {
      return decimalOdds;
    }

    // Calculate the denominator
    let denominator = decimalOdds - 1;

    // Calculate the numerator
    let numerator = Math.floor(denominator * 100);

    // Find the greatest common divisor (GCD) to simplify the fraction
    const gcd = (a, b) => {
      return b === 0 ? a : gcd(b, a % b);
    };
    const divisor = gcd(numerator, 100);

    // Simplify the fraction
    numerator /= divisor;
    denominator = 100 / divisor;

    return numerator + "/" + denominator;
  } catch (error) {
    return "-";
  }
};

const decimalToMoneyline = (decimalOdds) => {
  if (
    typeof decimalOdds !== "number" &&
    (typeof decimalOdds !== "string" || isNaN(Number(decimalOdds)))
  ) {
    return "-";
  }

  // Convert string to number if needed
  if (typeof decimalOdds === "string") {
    decimalOdds = Number(decimalOdds);
  }
  if (decimalOdds < 2) {
    return Math.round(-100 / (decimalOdds - 1));
  } else {
    return Math.round((decimalOdds - 1) * 100);
  }
};

export const OddsFormat = (decimalOdds) => {
  const format = window.localStorage.getItem("Odds-Format");

  if (isNaN(Number(decimalOdds))) {
    return "-";
  }

  switch (format) {
    case "Fractional Odds":
      return decimalToFractional(decimalOdds);
    case "Money line odds":
      return decimalToMoneyline(decimalOdds);
    default:
      return Number(decimalOdds).toFixed(2);
  }
};

export const getDateAndTime = (
  time,
  format = "DD MMM HH:mm",
  doConvert = true
) => {
  var timezone = false;
  try {
    timezone = window.localStorage.getItem("Timezone-object")
      ? JSON.parse(window.localStorage.getItem("Timezone-object"))
      : false;

    if (timezone && doConvert) {
      if (format == "unix") {
        return moment.tz(moment.unix(time), timezone.tzCode).unix();
      }

      return moment.tz(moment.unix(time), timezone.tzCode).format(format);
    } else {
      // console.log('false', moment.unix(time).format(format));
      if (format == "unix") {
        return moment.unix(time).unix();
      }
      return moment.unix(time).format(format);
    }
  } catch (error) {
    if (format == "unix") {
      return moment.unix(time).unix();
    }

    return moment.unix(time).format(format);
  }
};

export const isSavedCoupon = (matchID, col, market) => {
  const readFromLocal = localStorage.getItem("MY_COUPON");
  if (readFromLocal) {
    try {
      const parseData = JSON.parse(readFromLocal);
      if (
        parseData[`${matchID}__KD_MASTER_${market}`] &&
        parseData[`${matchID}__KD_MASTER_${market}`].col == col
      )
        return true;
      return false;
    } catch (error) {
      return false;
    }
  }
};

export const getBookmarker = (col, data = {}) => {
  try {
    var icon = "";

    switch (col) {
      case "1":
        icon = BOOKIES_DATA[data.localBookmarker]?.logo;
        break;

      case "X":
        icon = BOOKIES_DATA[data.drawBookmarker]?.logo;
        break;

      case "2":
        icon = BOOKIES_DATA[data.visitorBookmarker]?.logo;
        break;

      default:
        icon = null;
    }

    if (!icon) return null;
    return require(`../assets/bookmarkers/${icon}`);
  } catch (error) {
    return null;
  }
};

export const getTimezoneStartEnd = (activeDate = false) => {
  var timezone = false;
  const now = activeDate
    ? moment.utc(activeDate, "YYYY-MM-DD 00:00:00")
    : moment();
  const end = now.clone().add("days", 1);

  // console.log('now', now.format('LLLL'))
  // console.log('end', end.format('LLLL'))

  try {
    timezone = window.localStorage.getItem("Timezone-object")
      ? JSON.parse(window.localStorage.getItem("Timezone-object"))
      : false;

    if (timezone) {
      timezone = timezone.tzCode;
      let startOfDayInTimezone = now.unix();
      let endDayInTimezone = end.unix();
      return { startOfDayInTimezone, endDayInTimezone };
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log("error", error);
    let startOfDayInTimezone = now.unix();
    let endDayInTimezone = now.endOf("day").unix();

    return { startOfDayInTimezone, endDayInTimezone };
  }
};

export const getTimezone = () => {
  var timezone = false;
  try {
    timezone = window.localStorage.getItem("Timezone-object")
      ? JSON.parse(window.localStorage.getItem("Timezone-object"))
      : false;

    if (timezone) {
      timezone = timezone.tzCode;
    } else {
      throw new Error();
    }
  } catch (error) {
    timezone = "UTC";
  }

  return timezone;
};

export const getMarketKeysCount = (odds) => {
  var cols = 3;
  // THIS CODE IS  FOR IN RESPONSE OF API SOMETIME WE GET {} OR SOMETIME []
  if (!Array.isArray(Object.values(odds)[0])) {
    cols = Object.values(Object.values(odds)[0]).length;
  } else {
    cols = Object.values(odds)[0].length;
  }

  return cols;
};
