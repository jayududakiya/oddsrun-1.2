

function groupAndSortMatches(matches, onlyMatches = false) {
  // Group matches by tournament-url and date-start-timestamp
  const groupedMatches = matches.reduce((acc, match) => {
    const tournamentUrl = match.match["tournament-url"];
    const dateStartTimestamp = match.match["date-start-timestamp"];
    var key = `${tournamentUrl}_${dateStartTimestamp}`;
    if (onlyMatches) {
      key = tournamentUrl;
    }

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(match);
    return acc;
  }, {});

  // Convert groupedMatches object to array
  const groupedArray = Object.keys(groupedMatches).map((key) => {
    return {
      key: key,
      tournamentUrl: key.split("_")[0],
      dateStartTimestamp: parseInt(key.split("_")[1]),
      matches: groupedMatches[key],
    };
  });

  // Sort the array by date-start-timestamp in ascending order
  groupedArray.sort((a, b) => a.dateStartTimestamp - b.dateStartTimestamp);

  return groupedArray;
}

const TOP_EVENTS_LEAGUES = [
  "champions-league",
  "europa-league",
  "serie-a",
  "premier-league",
  "bundesliga",
  "la-liga",
  "nba",
  "euroleague",
  "nfl",
  "nhl",
  "atp-wta-australian-open",
  "atp-wta-roland-garros",
  "atp-wta-wimbledon",
  "atp-wta-open",
];

const TOP_EVENTS_LEAGUES2 = [
  {
    url: "champions-league",
    country: "Europe",
    sport: ["soccer", "football"],
  },
  {
    url: "europa-league",
    country: "Europe",
    sport: ["soccer", "football"],
  },
  {
    url: "serie-a",
    country: "Italy",
    sport: ["soccer", "football"],
  },
  {
    url: "premier-league",
    country: "England",
    sport: ["soccer", "football"],
  },
  {
    url: "bundesliga",
    country: "Germany",
    sport: ["soccer", "football"],
  },
  {
    url: "la-liga",
    country: "Spain",
    sport: ["soccer", "football"],
  },
  {
    url: "mls",
    country: "USA",
    sport: ["soccer", "football"],
  },
  {
    url: "nba",
    country: "USA",
    sport: ["basketball"],
  },
  {
    url: "euroleague",
    country: "Europe",
    sport: ["basketball"],
  },

  {
    url: "nfl",
    country: "USA",
    sport: ["american-football"],
  },
  {
    url: "nhl",
    country: "USA",
    sport: ["hockey"],
  },
  {
    url: "atp-wta-australian-open",
    country: "Australia",
    sport: ["tennis"],
  },
  {
    url: "atp-wta-roland-garros",
    country: "France",
    sport: ["tennis"],
  },
  {
    url: "atp-wta-wimbledon",
    country: "United Kingdom",
    sport: ["tennis"],
  },
  {
    url: "atp-wta-open",
    country: "USA",
    sport: ["tennis"],
  },
];

const _getTopEventCondition = () => {
  var finalCondition = [];

  TOP_EVENTS_LEAGUES2.map((league) => {
    finalCondition.push({
      "match.tournament-url": league.url,
      "match.country-name": league.country,
      "match.sport-url-name": {
        $in: league.sport,
      },
    });
  });

  return finalCondition;
};

const { ConnectionStates } = require("mongoose");
const brokerSportsApiRequest = require("../brokersports/brokersports-api");
const { getMatchesMarketOdds } = require("../cron/services");
const { SPORT_MARKET } = require("../cron/sports-market");

exports.getSportLeagues = async (req, res) => {
  try {
    var sport = req.body.sport;
    if (!sport) sport = "soccer";
    const urlPath = `/${sport}`;

    const condition = {
      sport: sport,
      createdAt: {
        $gte: moment().startOf("day").toDate(),
        $lte: moment().endOf("day").toDate(),
      },
    };

    const options = {
      sort: {
        _id: -1,
      },
    };

    var leaguesData = await Model._findOne(_Leagues, condition, options);

    if (!leaguesData) {
      const response = await brokerSportsApiRequest(urlPath);
      if (!response)
        throw new Error("Oops! Something went wrong! Please try again");

      const saveToLeagues = {
        sport: sport,
        leagues: response,
      };
      leaguesData = await Model._create(_Leagues, saveToLeagues);
    }

    if (req.body.groupBy) {
      leaguesData = underscore.groupBy(leaguesData.leagues, req.body.groupBy);
    }

    if (req.body.country && req.body.groupBy == "country") {
      obj = {};
      obj[req.body.country] = leaguesData[req.body.country];
      leaguesData = obj;
      if (!leaguesData) leaguesData = {};
    }

    __.res(res, JSON.parse(JSON.stringify(leaguesData)), 200);
  } catch (error) {
    __.res(res, error.message, 500);
  }
};

exports.getHotMatches = async (req, res) => {
  try {
    const condition = {
      "match.date-start-timestamp": {
        $gte: moment().startOf("day").unix(),
        $lte: moment().add(30, "days").endOf("day").unix(),
      },
      $or: _getTopEventCondition(),
      "match.event-stage-name": "Scheduled",
    };

    console.log("condition", condition);

    var searchResult = await __.hotMatches(condition);
    console.log("searchResult", searchResult.length);
    if (!searchResult || searchResult.length == 0) {
      const condition2 = {
        "match.date-start-timestamp": {
          $gte: moment().startOf("day").unix(),
          $lte: moment().endOf("day").unix(),
        },
        "match.event-stage-name": "Scheduled",
        "match.sport-url-name": {
          $in: ["basketball", "soccer", "football", "tennis"],
        },
      };
      searchResult = await __.hotMatches(condition2);
    }

    if (!searchResult) searchResult = [];

    const uniqueMatches = Array.from(
      new Set(searchResult.map((item) => item.match["tournament-name"]))
    ).map((tournamentName) => {
      return searchResult.find(
        (item) => item.match["tournament-name"] === tournamentName
      );
    });

    const sortedMatches = uniqueMatches.sort(
      (a, b) =>
        a.match["date-start-timestamp"] - b.match["date-start-timestamp"]
    );
    var firstThreeMatches = sortedMatches.slice(0, 3);


    var finalMatchesWithBookmarkers = [];


    for (let index = 0; index < firstThreeMatches.length; index++) {
      try {
        var matchItem = firstThreeMatches[index];
        // const market = matchItem.match.cols.split('|').length == 3 ? '1X2' : 'ha'
        // const market = "1X2"
        const market = SPORT_MARKET[matchItem.match['sport-url-name']][0].key

        const marketOdds = await getMatchesMarketOdds(market, matchItem.match.url);
        console.log('marketOdds', marketOdds.length)
        if (marketOdds && marketOdds.length !== 0) {
          const dataSaveIndex = 0;
          const element = marketOdds[dataSaveIndex];
          matchItem.maxBookmarkers = element.maxBookmarkers
          finalMatchesWithBookmarkers.push(element.maxBookmarkers)

        } else {
          finalMatchesWithBookmarkers.push({})
        }



        // finalMatchesWithBookmarkers.push(matchItem)
      } catch (error) {
        finalMatchesWithBookmarkers.push({})
      }

    }


    finalMatchesWithBookmarkers.map((b, index) => {
      firstThreeMatches[index] = { ...JSON.parse(JSON.stringify(firstThreeMatches[index])), maxBookmarkers: b };
      console.log('firstThreeMatches[index]', firstThreeMatches[index])
    })



    __.res(res, firstThreeMatches, 200);
  } catch (error) {
    __.res(res, error.message, 500);
  }

  // const today = moment()
  // const condition = {
  //   date: {
  //     $in: [today.format('YYYYMMDD'), today.clone().format('YYYYMMDD')]
  //   },
  //   sport: {
  //     $in: ["basketball", "soccer", "football", "tennis"],
  //   },
  //   'matchDetails.match.event-stage-name': 'Scheduled'
  // }

  // try {

  //   const aggregate = [
  //     {
  //       $match: condition,
  //     },
  //     {
  //       $group: {
  //         _id: null,
  //         market: { $last: "$market" },
  //         odds: { $last: "$odds" },
  //         pastDate: { $first: "$date" },
  //         date: { $last: "$date" },
  //         matches: { $last: "$matchDetails" }
  //       }
  //     },
  //     {
  //       $sort: {
  //         date: -1
  //       }
  //     },
  //     {
  //       $limit: +req.body.limit || 10,
  //     },
  //   ];

  //   const matches = await _MachOdds.aggregate(aggregate);

  //   __.res(res, matches, 200);

  // } catch (error) {
  //   __.res(res, error.message, 500);
  // }

  // try {
  //   const fiveDaysFromNowTimestamp = moment().add(3, "days").unix();
  //   const aggregate = [
  //     {
  //       $match: {
  //         sport: {
  //           $in: ["basketball", "soccer", "football", "tennis"],
  //         },
  //       },
  //     },
  //     {
  //       $unwind: "$matches",
  //     },
  //     {
  //       $match: {
  //         "matches.match.event-stage-name": "Scheduled",
  //         $and: [
  //           {
  //             "matches.match.date-start-timestamp": {
  //               $gte: moment().add(1, "days").unix(),
  //             },
  //           },
  //           {
  //             "matches.match.date-start-timestamp": {
  //               $lte: fiveDaysFromNowTimestamp,
  //             },
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       $sort: {
  //         "matches.match.date-start-timestamp": 1,
  //       },
  //     },
  //     {
  //       $limit: 10,
  //     },
  //   ];

  //   const matches = await HotMatches.aggregate(aggregate);

  //   __.res(res, matches, 200);
  // } catch (error) {
  //   __.res(res, error.message, 500);
  // }
};

exports.nextMatches = async (req, res) => {
  try {
    var sport = req.body.sport;
    if (!sport) sport = "soccer";

    let today = req.body.date || moment().format("YYYYMMDD");

    if (sport == "football") {
      sport = "soccer";
      // sportsList.push('football')
    }
    const urlPath = `/matches/${sport}/${today}`;
    const sportsList = [sport];
    // if (sport == 'soccer') {
    //   // sportsList.push('football')
    // }

    const condition = {
      "match.sport-url-name": {
        $in: sportsList,
      },
    };

    // condition['match.date-start-timestamp'] = {
    //   $gte: moment().startOf("day").unix(),
    //   $lte: moment().endOf("day").unix()
    // }

    // if (req.body.startOfTheDay && req.body.endOfTheDay) {

    //   condition['match.date-start-timestamp'] = {
    //     $gte: +req.body.startOfTheDay,
    //     $lte: +req.body.endOfTheDay
    //   }
    // }

    var checkForFinishedMatch = false;

    condition["match.date-start-timestamp"] = {
      $gte: moment().startOf("day").unix(),
      $lte: moment().endOf("day").unix(),
    };

    const timezone = req.body.timezone || "UTC";

    if (req.body.date) {
      // Define the date in YYYYMMDD format
      const dateStr = req.body.date;
      // const timezone =  'Pacific/Midway';

      // Parse the date string into a moment object and set the timezone
      const momentObj = momentTz.tz(dateStr, "YYYYMMDD", timezone);

      // Set the time to the start and end of the day
      const startOfDay = momentObj.clone().add(-1, "days").startOf("day");
      const endOfDay = momentObj.clone().endOf("day");

      // Convert to 10-digit timestamps (in seconds)
      const startTimestamp = Math.floor(startOfDay.valueOf() / 1000);
      const endTimestamp = Math.floor(endOfDay.valueOf() / 1000);

      condition["match.date-start-timestamp"] = {
        $gte: startTimestamp,
        $lte: endTimestamp,
      };
    }

    const options = {
      limit: 500,
      skip: req.body.skip || 0,
    };

    var matches = await Model._find(_Matches, condition, options);
    console.log("urlPath", urlPath);
    if (!matches || matches.length == 0) {
      const pastMatches = await brokerSportsApiRequest(urlPath);
      matches = JSON.parse(JSON.stringify(pastMatches));
    }

    var finalResponse = {
      matches: matches,
      sport: sport,
    };

    // if (checkForFinishedMatch && req.body.isUpcoming) {
    //   finalResponse.matches = finalResponse.finalResponse.filter(
    //     (match) => match.match["event-stage-name"] == "Scheduled"
    //   );
    // }

    if (req.body.isEvent) {
      // var groupedMatches = underscore.groupBy(
      //   finalResponse.matches,
      //   function (match) {
      //     return match.match['tournament-url'];
      //   }
      // );
      // console.log('groupedMatches',groupedMatches)
      finalResponse = groupAndSortMatches(finalResponse.matches, true);
    }

    if (req.body.isKickOf) {
      // var groupedMatches = underscore.groupBy(
      //   finalResponse.matches,
      //   function (match) {
      //     return match.match['date-start-timestamp'] + '-' + match.match['tournament-url']
      //   }
      // );

      // var sortedGroupedMatches = underscore.mapObject(groupedMatches, function(matches) {
      //   return underscore.sortBy(matches, function(match) {
      //     return match.match['date-start-timestamp'];
      //   });
      // });

      finalResponse = groupAndSortMatches(finalResponse.matches);
    }

    __.res(res, finalResponse, 200);
  } catch (error) {
    console.log("Error", error);
    __.res(res, error.message, 500);
  }
};

exports.matchDetails = async (req, res) => {
  try {
    if (!req.body.match) throw new Error("Invalid arguments");
    if (!req.body.market) throw new Error("Invalid arguments");

    let today = req.body.date || moment().format("YYYYMMDD");
    const urlPath = `${req.body.match}${req.body.market}`;

    const condition = {
      match: req.body.match,
      market: req.body.market,
      date: today,
    };

    if (moment(today, "YYYYMMDD").diff(moment(), "days") >= 0) {
      condition.createdAt = {
        $gte: moment().add(-5, "minutes").toDate(),
      };
    }

    const options = {
      sort: {
        _id: -1,
      },
    };

    var match = await Model._findOne(_Matches, {
      "match.id": +req.body.id,
    });

    var isCreatedNew = false;

    var matchOdds = await Model._findOne(
      _MatchOddsDetails,
      condition,
      options,
      false
    );
    isCreatedNew = matchOdds;

    if (!matchOdds) {
      const matchOddsData = await brokerSportsApiRequest(urlPath, true);
      const saveMatchOdds = {
        match: req.body.match,
        market: req.body.market,
        date: today,
        data: matchOddsData,
      };
      matchOdds = await Model._create(_MatchOddsDetails, saveMatchOdds);
      isCreatedNew = matchOdds;
      matchOdds = JSON.parse(JSON.stringify(matchOdds));
    }
    console.log("matchOdds=====", matchOdds);

    var matchData;

    if (
      isCreatedNew.matchDetails &&
      Object.keys(isCreatedNew.matchDetails).length > 0
    ) {
      matchData = isCreatedNew.matchDetails;
      // console.log("matchData========", matchData);
    } else {
      const matchUrl = req.body.match;
      matchData = await brokerSportsApiRequest(`${matchUrl}`, true);
      isCreatedNew.matchDetails = {
        ...matchData.eventData,
        ...matchData.eventBody,
      };
      matchData = { ...matchData.eventData, ...matchData.eventBody };
      isCreatedNew.save();
    }

    __.res(res, { matchOdds, matchData, match }, 200);
  } catch (error) {
    __.res(res, { matchOdds: {}, matchData: {}, match: {} }, 200);
  }
};

exports.getLeagueMatches = async (req, res) => {
  try {
    if (!req.body.league) throw new Error("Invalid argument!");

    console.log("req.body.league", req.body.league);

    const urlPath = `/${req.body.league}`;

    const condition = {
      league: req.body.league,
      // createdAt: {
      //   $gte: moment().add(-5, "minutes").toDate(),
      // },
    };

    const options = {
      sort: {
        _id: -1,
      },
    };

    var matches = await Model._findOne(_LeagueMatches, condition, options);
    console.log("matches", matches);
    if (!matches || (matches && matches.matches.length == 0)) {
      const leagueMatches = await brokerSportsApiRequest(urlPath);
      const saveLeagueMatches = {
        league: req.body.league,
        matches: leagueMatches,
      };
      matches = await Model._create(_LeagueMatches, saveLeagueMatches);
      matches = JSON.parse(JSON.stringify(matches));
      // Also save in matches
      _Matches.insertMany(leagueMatches);
    }

    if (req.body.groupBy) {
      var groupedMatches = underscore.groupBy(
        matches.matches,
        function (match) {
          match.match.matchDate = moment
            .unix(match.match["date-start-timestamp"])
            .format("DD,MMM YYYY");
          return match.match.matchDate;
        }
      );
      matches = groupedMatches;
    }

    if (req.body.team) {
      matches.matches = matches.matches.filter(
        (match) =>
          __.stringToSlug(match.match["home-name"]) ==
          __.stringToSlug(req.body.team) ||
          __.stringToSlug(match.match["away-name"]) ==
          __.stringToSlug(req.body.team)
      );
    }

    __.res(res, matches, 200);
  } catch (error) {
    __.res(res, error.message, 500);
  }
};

exports.droppingOdds = async (req, res) => {
  try {
    const condition = {};
    if (req.body.timeFilter) {
      condition.key = req.body.timeFilter;
    }

    const options = {
      sort: {
        _id: -1,
      },
    };

    const droppingOddsData = await Model._findOne(
      _DroppingOddsSchema,
      condition,
      options
    );

    var filterData = [];
    if (droppingOddsData) {
      var filterCondition = {};

      if (req.body.market) {
        filterCondition.market = req.body.market;
      }

      if (req.body.sport && req.body.sport !== "") {
        filterCondition.sport = req.body.sport;
      }

      if (Object.keys(filterCondition).length !== 0) {
        filterData = underscore.filter(
          droppingOddsData.oddsData,
          function (item) {
            return underscore.every(filterCondition, function (value, key) {
              return item[key] === value;
            });
          }
        );
      } else {
        filterData = droppingOddsData.oddsData;
      }
    }

    // console.log('filterData',filterData)

    __.res(res, filterData, 200);
  } catch (error) {
    console.log("error", error);
    __.res(res, error.message, 500);
  }
};

exports.sureBets = async (req, res) => {
  try {
    const options = {
      sort: {
        _id: -1,
      },
    };

    const matches = await Model._findOne(_Surebets, {}, options);

    __.res(res, matches ? matches.sureBets : [], 200);
  } catch (error) {
    console.log("error", error);
    __.res(res, error.message, 500);
  }
};

exports.topEvents = async (req, res) => {
  try {
    let today = req.body.date || moment().format("YYYYMMDD");

    const condition = {
      date: today,
    };

    if (req.body.sport) {
      condition["events.sport"] = { $in: [req.body.sport] };
    } else {
      // condition['events.sport'] = {
      //   $in: ["soccer", "football", "basketball", "hockey", "tennis", "american-football"]
      // }
      // condition['match.country-name'] = {
      //   $in: ['England','Italy','Europe','Germany','Usa','USA','Usa']
      // };
    }

    const options = {
      sort: {
        _id: -1,
      },
    };

    console.log("condition of events", condition);

    var topEvents = await Model._findOne(_TopEvents, condition, options);
    // console.log('topEvents', topEvents)

    if (!topEvents || topEvents.events.length === 0) {
      const aggregate = [
        {
          $match: {
            $or: _getTopEventCondition(),
            // 'match.sport-url-name': {
            //   $in: req.body.sport ? [req.body.sport] : ["soccer", "football", "basketball", "hockey", "tennis", "american-football"]
            // },
            // 'match.tournament-url': {
            //   $in: TOP_EVENTS_LEAGUES
            // },
          },
        },
        {
          $group: {
            _id: "$match.tournament-url",
            sport: { $first: "$match.sport-url-name" },
            name: { $first: "$match.breadcrumbs.tournament.name" },
            url: { $first: "$match.breadcrumbs.tournament.url" },
          },
        },

        {
          $limit: 12,
        },
      ];

      topEvents = await _Matches.aggregate(aggregate);
      var topEventsArray = topEvents.map((e) => {
        delete e._id;
        return e;
      });

      // Save
      const topEventsSave = {
        date: today,
        events: JSON.parse(JSON.stringify(topEventsArray)),
      };
      topEvents = await Model._create(_TopEvents, topEventsSave);
    }

    __.res(res, topEvents, 200);
  } catch (error) {
    console.log("error", error);
    __.res(res, error.message, 500);
  }
};

exports.searchTeamOrPlayer = async (req, res) => {
  try {
    if (!req.body.search || req.body.search.trim() == "")
      throw new Error("Invalid arguments!");
    const regex = new RegExp("^" + req.body.search, "i");
    const condition = {
      $or: [
        {
          "match.away-name": regex,
        },
        {
          "match.home-name": regex,
        },
      ],
    };

    if (req.body.sport && req.body.sport.trim() !== "") {
      condition["match.sport-url-name"] = req.body.sport;
    }

    // const options = {
    //   limit : 10
    // }

    // const  searchResult = await Model._find(_Matches,condition,options);

    const aggregate = [
      {
        $match: condition,
      },
      {
        $group: {
          _id: {
            away: "$match.away-name",
            home: "$match.home-name",
          },
          match: { $last: "$match" },
        },
      },

      {
        $limit: +req.body.limit || 10,
      },
    ];

    // if(!searchResult) throw new Error('Oops! Failed to get results, Please try again');
    const searchResult = await _Matches.aggregate(aggregate);
    // console.log('searchResult',searchResult)

    var filterResult = searchResult.map((item) => {
      if (
        regex.test(item.match["home-name"]) ||
        regex.test(item.match["away-name"])
      ) {
        return {
          isHomeTeam: regex.test(item.match["home-name"]),
          data: item,
        };
      } else {
        return null;
      }
    });

    __.res(res, filterResult, 200);
  } catch (error) {
    __.res(res, error.message, 500);
  }
};

exports.results = async (req, res) => {
  try {
    var league = req.body.league;
    if (!league) throw new Error("Invalid arguments");

    const condition = {
      league: league,
      // "match.country-name": "Bhutan",
      "match.country-name": __.slugToString(req.body.country),
      "match.sport-url-name": req.body.sport,
    };

    const options = {
      limit: 100,
      skip: req.body.skip || 0,
      sort: {
        "match.date-start-timestamp": -1,

      },
    };

    var matches = await Model._find(_Result, condition, options);
    var finalResponse = [];
    var groupedMatches = underscore.groupBy(matches, function (match) {
      return match.date;
    });
    finalResponse = groupedMatches;

    __.res(res, finalResponse, 200);
  } catch (error) {
    __.res(res, error.message, 500);
  }
};
exports.getBookmakers = async (req, res) => {
  try {
    var country = req.body.country;

    const condition = {
      country: country,
    };
    var bookmakers = await Model._find(_Bookmakers, condition);

    __.res(res, bookmakers, 200);
  } catch (error) {
    __.res(res, error.message, 500);
  }
};

exports.getLeagueContent = async (req, res) => {
  try {

    // Validate Form
    const required = ["sport", "country","league"];
    const validate = __._checkFields(req.body, required);
    if (validate !== true) throw new Error(validate.message);


    const condition = {
      sport : req.body.sport,
      country : req.body.country,
      league : req.body.league,
    }

    const options = {
      sort : {
        _id : -1
      }
    }

    const content = await Model._findOne(_LeagueContent,condition,options)
    if(!content) throw new Error('')

    __.res(res, content, 200);
  } catch (error) {
    __.res(res, '', 200);
  }
};

exports.getBookies = async (req, res) => {
  try {
    const bookies = await _Bookies.find(); // Fetch all bookies
    __.res(res, bookies, 200);
  } catch (error) {
    __.res(res, error.message, 500);
  }
};