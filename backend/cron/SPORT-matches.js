const { getLeagues, getLeaguesMatches, saveSportsLeaguesMatchs } = require("./services");

const SPORT_NAME = "";

module.exports = {

    start : async () => {
        saveSportsLeaguesMatchs(SPORT_NAME);
    }
}