const { getLeagues, getLeaguesMatches, saveSportsLeaguesMatchs } = require("./services");

const SPORT_NAME = "hockey";

module.exports = {

    start : async () => {
        saveSportsLeaguesMatchs(SPORT_NAME);
    }
}