const express = require("express");
const Router = express.Router();

var apicache = require('apicache')
var cache = apicache.middleware



// Chat Controller
Router.post("/sport/leagues", DataController.getSportLeagues);
Router.post("/league/matches", DataController.getLeagueMatches);
Router.post("/matches/hot-matches", cache('5 minutes'), DataController.getHotMatches);
Router.post("/matches/next-matches", DataController.nextMatches);
Router.post("/match/details", DataController.matchDetails);
Router.post("/dropping-odds", cache('5 minute'), DataController.droppingOdds);
Router.post("/sure-bets", cache('5 minutes'), DataController.sureBets);
Router.post("/events", DataController.topEvents);
Router.post('/file/upload', IMAGE_STORAGE.single('image'), UPLOAD_IMAGE_FUNC);
Router.post('/search', DataController.searchTeamOrPlayer);
Router.post('/team/matches', DataController.getLeagueMatches);
Router.post('/league/results', DataController.results);
Router.post('/bookmakers', DataController.getBookmakers);
Router.post('/bookies', DataController.getBookies);
Router.post('/league-content', DataController.getLeagueContent);


// UserController
Router.post('/articles', cache('5 minutes'), UserController.getArticles);
Router.post('/article/details', UserController.getArticleDetails);
Router.post('/banner', UserController.getBanner);

Router.post('/register', UserController.register);
Router.post('/login', UserController.login);
Router.post('/password/forgot', UserController.forgotPassword);
Router.post('/password/reset', UserController.resetPassword);
// Router.post('/users', UserController.getAllUsers);

Router.post('/profile', _isAuth, UserController.getProfile);
Router.post('/profile/update', _isAuth, UserController.updateProfile);
Router.post('/password/change', _isAuth, UserController.changePassword);

async function _isAuth(req, res, next) {
  try {
    var validate = await __.verifyToken(req);

    if (!validate) throw new Error("You must login first.");

    next();
  } catch (error) {
    console.error(error);
    __.res(res, error.message, 401);
  }
}

module.exports = Router;
