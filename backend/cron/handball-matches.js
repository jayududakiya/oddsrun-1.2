const { getLeagues, getLeaguesMatches, saveSportsLeaguesMatchs } = require("./services");

const SPORT_NAME = "handball";

module.exports = {

    start : async () => {
        saveSportsLeaguesMatchs(SPORT_NAME);
    }
}