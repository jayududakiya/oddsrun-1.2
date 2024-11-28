const { getLeagues, getLeaguesMatches, saveSportsLeaguesMatchs } = require("./services");

const SPORT_NAME = "baseball";

module.exports = {

    start : async () => {
        saveSportsLeaguesMatchs(SPORT_NAME);
    }
}