const { getLeagues, getLeaguesMatches, saveSportsLeaguesMatchs } = require("./services");

const SPORT_NAME = "soccer";

module.exports = {

    start : async () => {
        saveSportsLeaguesMatchs(SPORT_NAME);
    }
}