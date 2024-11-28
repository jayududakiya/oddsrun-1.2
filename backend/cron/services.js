const brokerSportsApiRequest = require("../brokersports/brokersports-api");


const calculateStats = (odds) => {
    // let totalLocal = 0;
    // let totalDraw = 0;
    // let totalVisitor = 0;
    // let highestLocal = -Infinity;
    // let highestDraw = -Infinity;
    // let highestVisitor = -Infinity;
    // let highestLocalKey = null;
    // let highestDrawKey = null;
    // let highestVisitorKey = null;
    // let count = 0;

    let total0 = 0;
    let total1 = 0;
    let total2 = 0;
    let highest0 = -Infinity;
    let highest1 = -Infinity;
    let highest2 = -Infinity;
    let count = 0;

    let highestLocalKey = null;
    let highestDrawKey = null;
    let highestVisitorKey = null;

    for (const key in odds) {
        const values = odds[key];
        if ("0" in values) {
            total0 += values["0"];
            // highest0 = Math.max(highest0, values["0"]);
            if (values["0"] > highest0) {
                highest0 = values["0"];
                highestLocalKey = key
            }
        }
        if ("1" in values) {
            total1 += values["1"];

            if ("2" in values) {

                if (values["1"] > highest1) {
                    highest1 = values["1"];
                    highestDrawKey = key
                }

            } else {

                if (values["1"] > highest1) {
                    highest1 = values["1"];
                    highestVisitorKey = key
                }

            }

        }


        if ("2" in values) {
            total2 += values["2"];
            // highest2 = Math.max(highest2, values["2"]);
            if (values["2"] > highest2) {
                highest2 = values["2"];
                highestVisitorKey = key
            }
        }
        count++;
    }

    const average0 = total0 / count || 0;
    const average1 = total1 / count || 0;
    const average2 = total2 / count || 0;

    return {
        average: {
            0: average0,
            1: average1,
            2: average2,
        },
        highest: {
            0: highest0 === -Infinity ? 0 : highest0,
            1: highest1 === -Infinity ? 0 : highest1,
            2: highest2 === -Infinity ? 0 : highest2,
        },
        highestLocalKey, highestDrawKey, highestVisitorKey
    };

    // for (const key in odds) {
    //     const values = odds[key];
    //     count++;
    //     if (values.length === 1) {
    //         totalLocal += values[0];
    //         highestLocal = Math.max(highestLocal, values[0]);
    //         // if (values[0] > highestLocal) {
    //         //     highestLocal = values[0];
    //         //     highestLocalKey = key;
    //         // }
    //     } else if (values.length === 2) {
    //         totalLocal += values[0];
    //         totalVisitor += values[1];
    //         highestLocal = Math.max(highestLocal, values[0]);
    //         highestVisitor = Math.max(highestVisitor, values[1]);
    //         // if (values[0] > highestLocal) {
    //         //     highestLocal = values[0];
    //         //     highestLocalKey = key;
    //         // }
    //         // if (values[1] > highestVisitor) {
    //         //     highestVisitor = values[1];
    //         //     highestVisitorKey = key;
    //         // }
    //     } else if (values.length === 3) {
    //         totalLocal += values[0];
    //         totalDraw += values[1];
    //         totalVisitor += values[2];
    //         highestLocal = Math.max(highestLocal, values[0]);
    //         highestDraw = Math.max(highestDraw, values[1]);
    //         highestVisitor = Math.max(highestVisitor, values[2]);

    //         // if (values[0] > highestLocal) {
    //         //     highestLocal = values[0];
    //         //     highestLocalKey = key;
    //         // }
    //         // if (values[1] > highestDraw) {
    //         //     highestDraw = values[1];
    //         //     highestDrawKey = key;
    //         // }
    //         // if (values[2] > highestVisitor) {
    //         //     highestVisitor = values[2];
    //         //     highestVisitorKey = key;
    //         // }

    //     }
    // }

    // const average = {
    //     local: totalLocal / count || 0,
    //     draw: totalDraw / count || 0,
    //     visitor: totalVisitor / count || 0,
    // };

    // const highest = {
    //     local: highestLocal === -Infinity ? 0 : highestLocal,
    //     draw: highestDraw === -Infinity ? 0 : highestDraw,
    //     visitor: highestVisitor === -Infinity ? 0 : highestVisitor,
    // };

    // // If draw is 0, remove it from the result
    // if (average.draw === 0) delete average.draw;
    // if (highest.draw === 0) delete highest.draw;

    return { average, highest, highestLocalKey, highestDrawKey, highestVisitorKey };
}


const getMatchesMarketOdds = (market, matchUrl) => {

    return new Promise(async (resolve, reject) => {
        try {

            const urlPath = `${matchUrl}${market}`
            // console.log('urlPath', urlPath)
            const response = await brokerSportsApiRequest(urlPath, true);
            if (!response) throw new Error('Oops! Something went wrong! Please try again');

            // console.log('response',response)

            if (!response.oddsdata || !response.oddsdata.back) {
                reject('No Odds Data Found');
            } else {

                var allTheOdds = [];

                Object.keys(response.oddsdata.back).map(marketKey => {
                    const marketData = response.oddsdata.back[marketKey]
                    if (marketData.odds) {

                        var state = calculateStats(marketData.odds);
                        // console.log('state',state)
                        const handicapValue = marketData.handicapValue;


                        var oddsSet = {};
                        var maxBookmarkers = {
                            localBookmarker: state.highestLocalKey,
                            drawBookmarker: state.highestDrawKey,
                            visitorBookmarker: state.highestVisitorKey,
                        }

                        var marketCols = '1'

                        oddsSet.local = {
                            avg: !isNaN(state.average['0']) ? Number(state.average['0'].toFixed(2)) : null,
                            max: !isNaN(state.highest['0']) ? Number(state.highest['0'].toFixed(2)) : null,
                        }

                        if (Object.keys(Object.values(marketData.odds)[0]).length >= 2) {

                            var visitorKey = '2';
                            if (Object.keys(Object.values(marketData.odds)[0]).length == 2) {
                                visitorKey = '1'
                            }

                            oddsSet.visitor = {
                                avg: !isNaN(state.average[visitorKey]) ? Number(state.average[visitorKey].toFixed(2)) : null,
                                max: !isNaN(state.highest[visitorKey]) ? Number(state.highest[visitorKey].toFixed(2)) : null,
                            }

                        }

                        if (Object.keys(Object.values(marketData.odds)[0]).length == 3) {
                            oddsSet.draw = {
                                avg: !isNaN(state.average['1']) ? Number(state.average['1'].toFixed(2)) : null,
                                max: !isNaN(state.highest['1']) ? Number(state.highest['1'].toFixed(2)) : null,
                            }
                        }

                        if (Object.values(marketData.odds)[0].length == 2) {
                            marketCols = '1|2'
                        }

                        if (Object.values(marketData.odds)[0].length == 3) {
                            marketCols = '1|X|2'
                        }

                        // console.log('oddsSet.local',oddsSet.local)
                        // console.log('oddsSet.draw',oddsSet.draw)
                        // console.log('oddsSet.visitor',oddsSet.visitor)


                        allTheOdds.push({
                            market: market,
                            handicapValue: handicapValue,
                            oddsSet: oddsSet,
                            marketCols: marketCols,
                            maxBookmarkers: maxBookmarkers
                        })


                    }

                });

                // console.log('allTheOdds',allTheOdds)


                // console.log('allTheOdds',allTheOdds)
                resolve(allTheOdds)

            }




        } catch (error) {
            reject(error)
        }

    })

}


const fireQueryFordData = (timeFilter) => {

    return new Promise(async (resolve, reject) => {


        try {


            const condition = {};

            const min = 4;
            const max = 50;


            const startDate = moment().subtract(+timeFilter.split('h')[0], 'hours').toDate();
            condition.createdAt = { $gte: startDate }

            const aggregate = [
                {
                    $match: condition,
                },
                {
                    $sort: {
                        createdAt: 1
                    }
                },
                {
                    $group: {
                        _id: { match: '$match', subMarket: '$subMarket' },
                        match: { $last: "$match" },
                        sport: { $last: "$sport" },
                        market: { $last: "$market" },
                        pastOdds: { $first: "$odds" },
                        odds: { $last: "$odds" },
                        pastDate: { $first: "$date" },
                        date: { $last: "$date" },
                        createdAtPast: { $first: "$createdAt" },
                        createdAt: { $last: "$createdAt" },
                        subMarket: { $last: "$subMarket" },
                        matchDetails: { $last: "$matchDetails" }
                    }
                },
                {
                    $addFields: {
                        localOdds: "$odds",
                    },
                },
                {
                    $addFields: {
                        localAvg: "$odds.local.avg",
                        localMax: "$odds.local.max",
                        visitorAvg: "$odds.visitor.avg",
                        visitorMax: "$odds.visitor.max",
                        drawAvg: "$odds.draw.avg",
                        drawMax: "$odds.draw.max",
                        pastOddslocalAvg: "$pastOdds.local.avg",
                        pastOddslocalMax: "$pastOdds.local.max",
                        pastOddsvisitorAvg: "$pastOdds.visitor.avg",
                        pastOddsvisitorMax: "$pastOdds.visitor.max",
                        pastOddsdrawAvg: "$pastOdds.draw.avg",
                        pastOddsdrawMax: "$pastOdds.draw.max",
                    },
                },
                {
                    $addFields: {
                        localDrops: {
                            $cond: {
                                if: {
                                    $or: [
                                        { $eq: ["$pastOddslocalAvg", 0] },
                                        { $lt: ["$pastOddslocalAvg", "$localAvg"] },
                                        { $gt: ["$visitorAvg", 10] }
                                    ]
                                },
                                then: 0, // Set a default value or handle appropriately
                                else: {
                                    $abs: {
                                        $multiply: [
                                            { $subtract: [1, { $divide: ["$localAvg", "$pastOddslocalAvg"] }] },
                                            100
                                        ]
                                    }
                                }
                            }
                        },
                        visitorDrops: {
                            $cond: {
                                if: {
                                    $or: [
                                        { $eq: ["$pastOddsvisitorAvg", 0] },
                                        { $lt: ["$pastOddsvisitorAvg", "$visitorAvg"] },
                                        { $gt: ["$visitorAvg", 10] }
                                    ]
                                },
                                then: 0,
                                else: {
                                    $abs: {
                                        $multiply: [
                                            { $subtract: [1, { $divide: ["$visitorAvg", "$pastOddsvisitorAvg"] }] },
                                            100
                                        ]
                                    }
                                }
                            }
                        },
                        drawDrops: {
                            $cond: {
                                if: {
                                    $or: [
                                        { $eq: ["$pastOddsdrawAvg", 0] },
                                        { $lt: ["$pastOddsdrawAvg", "$drawAvg"] },
                                        { $gt: ["$drawAvg", 10] }
                                    ]
                                },
                                then: 0,
                                else: {
                                    $abs: {
                                        $multiply: [
                                            { $subtract: [1, { $divide: ["$drawAvg", "$pastOddsdrawAvg"] }] },
                                            100
                                        ]
                                    }
                                }
                            }
                        },
                    },
                },
                {
                    $addFields: {
                        maxDrop: {
                            $max: ["$localDrops", "$visitorDrops", "$drawDrops"],
                        },
                    },
                },
                {
                    $match: {
                        $and: [{ maxDrop: { $gte: min } }, { maxDrop: { $lte: max } }],
                    },
                },
                {
                    $sort: {
                        maxDrop: -1,
                    },
                },
                {
                    $limit: 200,
                },
            ];

            const matches = await _MachOdds.aggregate(aggregate);
            resolve(matches)



        } catch (error) {
            reject(error)
        }

    })

}

const saveDroppingOdds = async () => {
    try {


        const times = ['1h', '2h', '4h', '12h', '24h']

        for (let index = 0; index < times.length; index++) {
            const time = times[index];

            try {

                const ooddsDropData = await fireQueryFordData(time);
                const createdOdds = await Model._create(_DroppingOddsSchema, {
                    oddsData: ooddsDropData,
                    key: time
                });

                if (createdOdds) {

                    // console.log('DDDD',{
                    //     _id: {
                    //         $ne: createdOdds._id,
                    //     },
                    //     key : time
                    // })

                    // Remove Old Data
                    _DroppingOddsSchema.deleteMany({
                        _id: {
                            $ne: createdOdds._id,
                        },
                        key: time
                    })
                }



            } catch (error) {
                console.log('Error', error)
            }

        }



    } catch (error) {
        console.log('Error saveDroppingOdds', error)
    }
}

const saveSureBets = async () => {
    try {


        console.log('STARTED SUREBETS')


        const condition = {
        };

        const aggregate = [
            //   {
            //     $match: condition,
            //   },
            {
                $sort: {
                    _id: -1
                }
            },
            {
                $group: {
                    _id: { match: '$match', subMarket: '$subMarket' },
                    createdAtPast: { $first: "$createdAt" },
                    createdAt: { $last: "$createdAt" },
                    match: { $last: "$match" },
                    market: { $last: "$market" },
                    odds: { $last: "$odds" },
                    date: { $last: "$date" },
                    matches: { $last: "$matchDetails" },
                }
            },
            {
                $match: {
                    'matches.match.event-stage-name': 'Scheduled'
                },
            },
            {
                $addFields: {
                    localOdds: "$odds",
                },
            },
            {
                $addFields: {
                    localAvg: "$localOdds.local.avg",
                    localMax: "$localOdds.local.max",
                    visitorAvg: "$localOdds.visitor.avg",
                    visitorMax: "$localOdds.visitor.max",
                    drawAvg: "$localOdds.draw.avg",
                    drawMax: "$localOdds.draw.max",
                },
            },
            {
                $match: {
                    localMax: { $ne: null },
                    visitorMax: { $ne: null },
                },
            },
            {
                $addFields: {
                    localSureBet: {
                        $divide: [1, "$localMax"],
                    },
                    visitorSureBet: {
                        $divide: [1, "$visitorMax"],
                    },
                    drawSureBet: {
                        $cond: {
                            if: {
                                $eq: ["$drawMax", null]
                            },
                            then: 0,
                            else: {
                                $divide: [1, "$drawMax"],
                            }
                        }

                    },
                },
            },
            {
                $addFields: {
                    sureBetsFinal: {
                        $sum: ["$localSureBet", "$visitorSureBet", "$drawSureBet"],
                    },
                },
            },
            {
                $addFields: {
                    sureBetsFinalPercentage: {
                        $multiply: ["$sureBetsFinal", 100],
                    },
                },
            },
            {
                $match: {
                    sureBetsFinal: { $lte: 1 },
                    // localMax: { $ne: null },
                },
            },
            {
                $sort: {
                    sureBetsFinal: 1,
                },
            },
            {
                $limit: 20,
            },
        ];

        console.log('Start getting matches')

        const matches = await _MachOdds.aggregate(aggregate);


        console.log('matches',matches)


        // Get Bookies
        var finalMatchesWithBookmarkers = [];
        for (let index = 0; index < matches.length; index++) {
            const matchItem = matches[index];

            const marketOdds = await getMatchesMarketOdds(matchItem.market, matchItem.match);
            // console.log('marketOdds',marketOdds)
            if (marketOdds && marketOdds.length !== 0) {
                const dataSaveIndex = 0;
                const element = marketOdds[dataSaveIndex];
                matchItem.maxBookmarkers = element.maxBookmarkers
            }

            finalMatchesWithBookmarkers.push(matchItem)

        }

        console.log('finalMatchesWithBookmarkers',finalMatchesWithBookmarkers)


        const createSureBets = await Model._create(_Surebets, {
            sureBets: finalMatchesWithBookmarkers,
        });

        if (createSureBets) {
            // Remove Old Data
            _Surebets.deleteMany({
                _id: {
                    $ne: createSureBets._id,
                }
            })
        }


    } catch (error) {
        console.log('error', error)
    }
}

const saveResults = async (completedMatches) => {
    try {



        const finalResults = [];
        const newMatchesId = [];
        completedMatches.map(matchItem => {


            if (matchItem.match['event-stage-name'] == 'Finished') {

                finalResults.push({
                    match: matchItem.match,
                    odds: matchItem.odds,
                    year: moment.unix(matchItem.match['date-start-timestamp']).format('YYYY'),
                    date: moment.unix(matchItem.match['date-start-timestamp']).format('DD-MM-YYYY'),
                    league: matchItem.match['tournament-url'],
                });

                newMatchesId.push(matchItem.match.id)

            }




        })

        console.log('Existing Matches found - ', newMatchesId)



        // Delete existing matches
        const remooved = await _Result.deleteMany({
            'match.id': {
                $in: newMatchesId
            }
        })

        console.log('Removed ', remooved)

        console.log('Completed Matches :', finalResults.length)
        _Result.insertMany(finalResults);


    } catch (error) {
        console.log('error', error)
    }
}



const getMatchesData = ({ sport, date }) => {

    return new Promise(async (resolve, reject) => {
        try {

            const urlPath = `/matches/${sport}/${moment(date).format('YYYYMMDD')}`
            console.log('urlPath', urlPath)
            const response = await brokerSportsApiRequest(urlPath);
            if (!response) throw new Error('Oops! Something went wrong! Please try again');

            resolve(response)

            // leaguesData = await Model._create(_Leagues,saveToLeagues)

        } catch (error) {
            reject(error)
        }

    })

}


const getLeagues = (sport) => {

    return new Promise(async (resolve, reject) => {
        try {

            const condition = {
                sport: sport,
                createdAt: {
                    $gte: moment().startOf('day').toDate(),
                    $lte: moment().endOf('day').toDate()
                }
            }


            var leaguesData = await Model._findOne(_Leagues, condition);

            if (leaguesData) {
                resolve(leaguesData.leagues);
            } else {

                const urlPath = `/${sport}`
                const response = await brokerSportsApiRequest(urlPath);
                if (!response) throw new Error('Oops! Something went wrong! Please try again');

                const saveToLeagues = {
                    sport: sport,
                    leagues: response
                }

                await Model._create(_Leagues, saveToLeagues)
                resolve(response)

            }



            // leaguesData = await Model._create(_Leagues,saveToLeagues)

        } catch (error) {
            reject(error)
        }

    })

}


const getLeaguesMatches = ({ sport, country, name }) => {

    return new Promise(async (resolve, reject) => {
        try {

            const urlPath = `/${sport}/${country}/${name}`
            console.log('urlPath', urlPath)
            const response = await brokerSportsApiRequest(urlPath);
            if (!response) throw new Error('Oops! Something went wrong! Please try again');

            resolve(response)
            const saveLeagueMatches = {
                league: `${sport}/${country}/${name}`,
                matches: response,
            };
            matches = await Model._create(_LeagueMatches, saveLeagueMatches);

            // leaguesData = await Model._create(_Leagues,saveToLeagues)

        } catch (error) {
            reject(error)
        }

    })

}


const saveMatchesOdds = (sport, latestOddsMatches, hasMarket = '1X2', wantToRunMath = false) => {

    return new Promise(async (resolve, reject) => {
        try {

            var sportMatches = []

            for (let matchIndex = 0; matchIndex < latestOddsMatches.length; matchIndex++) {
                const match = latestOddsMatches[matchIndex];

                try {

                    // GET odds Markets
                    var market = hasMarket
                    // var market = '1X2';
                    const cols = match.match.cols.split('|');
                    // if (cols.length == 2) market = 'haot'; //Home Away

                    // SAVE 1X2
                    var maxBookmarkers = {};


                    // const marketOdds = await getMatchesMarketOdds(market,match);
                    // if(marketOdds && marketOdds.length !== 0){
                    //     const dataSaveIndex = 0;
                    //     const element = marketOdds[dataSaveIndex];
                    //     maxBookmarkers = element.maxBookmarkers
                    // }

                    // console.log('maxBookmarkers',maxBookmarkers)

                    sportMatches.push({
                        sport: sport,
                        match: match.match.url,
                        matchDetails: match,
                        market: market,
                        subMarket: '',
                        date: moment().format('YYYYMMDD'),
                        data: {},
                        odds: match.odds[0] || {},
                        maxBookmarkers: {}
                    })

                    // const sportMarkets = SPORT_MARKET[sport] || [];

                    // for (let sportMarketIndex = 0; sportMarketIndex < sportMarkets.length; sportMarketIndex++) {
                    //     const marketItem = sportMarkets[sportMarketIndex];
                    //     const market = marketItem.key;

                    //     try {
                    //         const marketOdds = await getMatchesMarketOdds(market,match);
                    //         totalAPICalls++;

                    //         for (let dataSaveIndex = 0; dataSaveIndex < marketOdds.length; dataSaveIndex++) {
                    //             const element = marketOdds[dataSaveIndex];
                    //             match.odds = [element.oddsSet]
                    //             match.match.cols =  element.marketCols // _getMarket(element.oddsSet) 
                    //             sportMatches.push({
                    //                 sport : sport,
                    //                 match : match.match.url,
                    //                 matchDetails : match,
                    //                 market : market,
                    //                 subMarket : element.handicapValue,
                    //                 date : date.format('YYYYMMDD'),
                    //                 data : {},
                    //                 odds : element.oddsSet || {}
                    //             })
                    //         }


                    //     } catch (error) {
                    //         console.log('error',error)
                    //     }

                    // }



                } catch (error) {
                    console.log('error', error)
                    continue;
                }


            }

            await _MachOdds.insertMany(sportMatches);
            console.log('inserted', moment().format('LLLL'));


            if (wantToRunMath) {

                // Save Dropping Odds
                saveDroppingOdds();

                // SAVE Surebets
                saveSureBets();
            }

            resolve(true);



        } catch (error) {
            resolve(reject);
            console.error('error while take matches', error)
        }
    })

}


const saveSportsLeaguesMatchs = async (SPORT_NAME) => {

    console.log("Scron started for --- ", SPORT_NAME)
    var totalAPICalls = 0;

    try {

        const sport = SPORT_NAME;
        var sportMatches = [];


        for (let day = 0; day <= 2; day++) {

            const date = moment().add(day, 'days');
            console.log('date', date)

            const dateMatches = await getMatchesData({ sport, date });
            totalAPICalls++;

            sportMatches = [...sportMatches, ...dateMatches]
        }

        // const leagues  =  await getLeagues(sport);

        // for (let index = 0; index < leagues.length; index++) {
        //     const league = leagues[index];

        //     try {

        //         const matches = await getLeaguesMatches(league);
        //         totalAPICalls = totalAPICalls + 1;
        //         if(matches && Array.isArray(matches)){
        //             sportMatches = [...sportMatches, ...matches]
        //         }

        //     } catch (error) {
        //         console.log('Error while getting Matches',error)
        //         continue;
        //     }

        // }

        // console.log("sportMatches",sportMatches)

        console.log('sportMatches  ', sportMatches.length)
        console.log('totalAPICalls ===== ', totalAPICalls)

        // SAVE ODDS
        saveMatchesOdds(SPORT_NAME, sportMatches)

        console.log('Deleting Matches', moment().format('LLLL'))
        await _Matches.deleteMany({
            'match.sport-url-name': SPORT_NAME
        });

        console.log('Deleted Matches ' + SPORT_NAME, moment().format('LLLL'))
        await _Matches.insertMany(sportMatches);
        console.log('inserted', moment().format('LLLL'))

    } catch (error) {
        console.log('Error while getting league', error);
    }

}


const collectAllTheMatches = (SPORT_NAME) => {

    return new Promise(async (resolve, reject) => {
        console.log("Scron started for --- ", SPORT_NAME)
        var totalAPICalls = 0;
        try {

            const sport = SPORT_NAME;
            var sportMatches = [];

            const leagues = await getLeagues(sport);
            totalAPICalls++;

            console.log('leagues ', leagues.length);

            for (let index = 0; index < leagues.length; index++) {
                const league = leagues[index];

                try {

                    const matches = await getLeaguesMatches(league);
                    totalAPICalls++;
                    if (matches && Array.isArray(matches)) {
                        sportMatches = [...sportMatches, ...matches]
                    }

                } catch (error) {
                    console.log('Error while getting Matches', error)
                    continue;
                }

            }


            // for (let day = -1; day <= 5; day++) {
            //     const date = moment().add(day,'days');
            //     console.log('date',date)
            //     const dateMatches = await getMatchesData({ sport, date });
            //     totalAPICalls++;

            //     sportMatches = [...sportMatches, ...dateMatches]
            // }

            resolve({ sportMatches, totalAPICalls })

        } catch (error) {
            reject(error)
            console.log('Error while getting league', error);
        }
    })

}


module.exports = { getLeagues, getLeaguesMatches, saveSportsLeaguesMatchs, collectAllTheMatches, saveMatchesOdds, saveDroppingOdds, saveSureBets, saveResults, getMatchesMarketOdds }
