
const SPORT_MARKET = {
    soccer: [
        {
            title: "1X2",
            key: "1X2",
            subKeys: ['1X2', '1X21h', '1X22h'],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        // {
        //     title: 'Home/Away',
        //     key: 'ha',
        //     subKeys: ['ha', 'ha1h'],
        //     subMenu: ['Full Time', '1st Half'],
        // },
        {
            title: 'Over/Under',
            key: 'ou',
            subKeys: ['ou', 'ou1h', 'ou2h'],
            subMenu: ['Full Time', '1st Half', '2nd Half'],
        },
        {
            title: 'Asian Handicap',
            key: 'ah',
            subKeys: ['ah', 'ah1h', 'ah2h'],
            subMenu: ['Full Time', '1st Half', '2nd Half'],
        },
        {
            title: 'Both Teams to Score',
            key: 'bts',
            subKeys: ['bts', 'bts1h', 'bts2h'],
            subMenu: ['Full Time', '1st Half', '2nd Half'],
        },
        {
            title: 'Double Chance',
            key: 'dc',
            subKeys: ['dc', 'dc1h', 'dc2h'],
            subMenu: ['Full Time', '1st Half', '2nd Half'],
        },
        {
            title: 'European Handicap',
            key: 'eh',
            subKeys: ['eh', 'eh1h', 'eh2h'],
            subMenu: ['Full Time', '1st Half', '2nd Half'],
        },
        {
            title: 'Draw No Bet',
            key: 'dnb',
            subKeys: ['dnb', 'dnb1h', 'dnb2h'],
            subMenu: ['Full Time', '1st Half', '2nd Half'],
        },
        {
            title: 'Correct Score',
            key: 'cs',
            subKeys: ['cs', 'cs1h', 'cs2h'],
            subMenu: ['Full Time', '1st Half', '2nd Half'],
        },

        {
            title: 'Halftime/Fulltime',
            key: 'hf',
            subKeys: ['hf'],
            subMenu: ['Full Time'],
        },
        {
            title: 'To Qualify',
            key: 'TQ',
            subKeys: ['TQ'],
            subMenu: ['Full Time'],
        },
        {
            title: 'Odd or Even',
            key: 'oe',
            subKeys: ['oe', 'oe1h', 'oe2h'],
            subMenu: ['Full Time', '1st Half', '2nd Half'],
        },
    ],
    tennis: [
        {
            title: 'Home/Away',
            key: 'ha',
            subKeys: ['ha', 'ha1set', 'ha2set', 'ha3set', 'ha4set', 'ha5set'],
            subMenu: ['Full Time', '1st  Set', '2 SET', '3 SET', '4 SET', '5 SET'],
        },
        {
            title: "Asian Handicap Games",
            key: "ahgames",
            subKeys: [
                "ahgames",
                "ahgames1set",
                "ahgames2set",
                "ahgames3set",
                "ahgames4set",
            ],
            subMenu: [
                "Full Time",
                "FIRST SET",
                "SECOND SET",
                "THIRD SET",
                "FOURTH SET",
            ],
        },
        {
            title: "Asian Handicap Sets",
            key: "ahsets",
            subKeys: ["ahgames"],
            subMenu: ["Full Time"],
        },
        {
            title: "Over/Under Sets",
            key: "ousets",
            subKeys: ["ousets"],
            subMenu: ["Full Time"],
        },
        {
            title: "Over/Under Games",
            key: "ougames",
            subKeys: [
                "ougames",
                "ougames1set",
                "ougames2set",
                "ougames3set",
                "ougames4set",
                "ougames5set",
            ],
            subMenu: [
                "FULLTIME 22",
                "FIRST SET",
                "SECOND SET",
                "THIRD SET",
                "FOURTH SET",
                "FIFTH SET",
            ],
        },
        {
            title: "Correct Score",
            key: "cs",
            subKeys: ["cs", "cs1set", "cs2set", "cs3set", "cs4set"],
            subMenu: [
                "FULLTIME",
                "FIRST SET",
                "SECOND SET",
                "THIRD SET",
                "FOURTH SET",
            ],
        },
        {
            title: "Odd or Even",
            key: "oe",
            subKeys: ["oe", "oe1set", "oe2set"],
            subMenu: ["FULLTIME", "FIRST SET", "SECOND SET"],
        },

        {
            title: "To Qualify",
            key: "TQ",
            subKeys: ["TQ"],
            subMenu: ["Full Time"],
        },
    ],
    basketball: [
        {
            title: "1X2",
            key: "1X2",
            subKeys: ["1X2", "1X21h", "1X22h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: 'Home/Away',
            key: 'haot',
            subKeys: ['haot'],
            subMenu: ['FT Including OT'],
        },
        {
            title: "Over/Under",
            key: "ou",
            subKeys: ["ou", "ou1h", "ou2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Asian Handicap",
            key: "ah",
            subKeys: ["ah", "ah1h", "ah2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Draw No Bet",
            key: "dnb",
            subKeys: ["dnb"],
            subMenu: ["Full Time"],
        },
        // {
        //     title: "Double Chance",
        //     key: "dc",
        //     subKeys: ["dc", "dc1h", "dc2h"],
        //     subMenu: ["Full Time", "1st Half", "2nd Half"],
        // },
        // {
        //     title: "Halftime/Fulltime",
        //     key: "hf",
        //     subKeys: ["hf"],
        //     subMenu: ["Full Time"],
        // },
        {
            title: 'European Handicap',
            key: 'eh',
            subKeys: ['eh', 'eh1h', 'eh2h'],
            subMenu: ['Full Time', '1st Half', '2nd Half'],
        },
    ],
    hockey: [
        {
            title: "1X2",
            key: "1X2",
            subKeys: ["1X2", "1X21p", "1X22p", '1X23p'],
            subMenu: ["Full Time", "1st Period", "2nd Period", "3rd Period"],
        },
        {
            title: 'Home/Away',
            key: 'ha',
            subKeys: ['ha', 'ha1set', 'ha2set', 'ha3set', 'ha4set', 'ha5set'],
            subMenu: ['Full Time', '1 SET', '2 SET', '3 SET', '4 SET', '5 SET'],
        },
        {
            title: "Asian Handicap",
            key: "ah",
            subKeys: ["ah", "ah1h", "ah2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Over/Under",
            key: "ou",
            subKeys: ["ou", "ou1h", "ou2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Draw No Bet",
            key: "dnb",
            subKeys: ["dnb"],
            subMenu: ["Full Time"],
        },
        {
            title: "Handicap European",
            key: "eh",
            subKeys: ["eh", "eh1p", "eh2p", "eh3p"],
            subMenu: ["Full Time", "1st Period", "2nd Period", "3rd Period"],
        },
        {
            title: "Odd or Even",
            key: "oe",
            subKeys: ["oe"],
            subMenu: ["FULLTIME"],
        },
        {
            title: "Both Teams to Score",
            key: "bts",
            subKeys: ["bts", "bts1p", "bts2p", "bts3p"],
            subMenu: ["Full Time", "1st Period", "2nd Period", "3rd Period"],
        },
    ],
    handball: [
        {
            title: "1X2",
            key: "1X2",
            subKeys: ["1X2"],
            subMenu: ["Full Time"],
        },
        {
            title: 'Home/Away',
            key: 'ha',
            subKeys: ["ha", "ha1h", "ha2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Asian Handicap",
            key: "ah",
            subKeys: ["ah", "ah1h", "ah2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Over/Under",
            key: "ou",
            subKeys: ["ou", "ou1h", "ou2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Draw No Bet",
            key: "dnb",
            subKeys: ["dnb"],
            subMenu: ["Full Time"],
        },
        {
            title: "Handicap European",
            key: "eh",
            subKeys: ["eh", "eh1h", "eh2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Double Chance",
            key: "dc",
            subKeys: ["dc", "dc1h", "dc2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Halftime/Fulltime",
            key: "hf",
            subKeys: ["hf"],
            subMenu: ["Full Time"],
        },
        {
            title: "Odd or Even",
            key: "oe",
            subKeys: ["oe", "oe1h", "oe2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
    ],
    baseball: [
        {
            title: "1X2",
            key: "1X2",
            subKeys: ["1X2"],
            subMenu: ["Full Time"],
        },
        {
            title: 'Home/Away',
            key: 'ha',
            subKeys: ['ha', 'ha1h'],
            subMenu: ['Full Time', '1st Half'],
        },
        {
            title: "Asian Handicap",
            key: "ah",
            subKeys: ["ah", "ah1h"],
            subMenu: ["Full Time", "1st Half"],
        },
        {
            title: "Over/Under",
            key: "ou",
            subKeys: ["ou", "ou1h"],
            subMenu: ["Full Time", "1st Half"],
        },
        {
            title: "Handicap European",
            key: "eh",
            subKeys: ["eh"],
            subMenu: ["Full Time"],
        },
        {
            title: "Odd or Even",
            key: "oe",
            subKeys: ["oe"],
            subMenu: ["FULLTIME"],
        },
    ],
    volleyball: [
        {
            title: 'Home/Away',
            key: 'ha',
            subKeys: ['ha', 'ha1set', 'ha2set', 'ha3set', 'ha4set', 'ha5set'],
            subMenu: ['Full Time', '1 SET', '2 SET', '3 SET', '4 SET', '5 SET'],
        },
        {
            title: "Asian Handicap Sets",
            key: "ahsets",
            subKeys: ["ahgames"],
            subMenu: ["ASIAN HANDICAP 1.5"],
        },
        {
            title: "Over/Under Sets",
            key: "ousets",
            subKeys: ["ousets"],
            subMenu: ["Full Time"],
        },
        {
            title: "Odd or Even",
            key: "oe",
            subKeys: ["oe", "oe1set", "oe2set", "oe3set"],
            subMenu: ["FULLTIME", "FIRST SET", "SECOND SET", "THIRD SET"],
        },
    ],
    cricket: [
        {
            title: 'Home/Away',
            key: 'haot',
            subKeys: ['haot'],
            subMenu: ['FT including OT'],
        },
        {
            title: "Over/Under",
            key: "ou",
            subKeys: ["ou"],
            subMenu: ["Full Time"],
        },
        // {
        //     title: "Asian Handicap",
        //     key: "ah",
        //     subKeys: ["ah"],
        //     subMenu: ["FT including OT"],
        // },
    ],
    snooker: [
        {
            title: 'Home/Away',
            key: 'ha',
            subKeys: ['ha', 'ha1set', 'ha2set', 'ha3set', 'ha4set', 'ha5set'],
            subMenu: ['Full Time', '1 SET', '2 SET', '3 SET', '4 SET', '5 SET'],
        },
        // {
        //     title: "Asian Handicap",
        //     key: "ah",
        //     subKeys: ["ah"],
        //     subMenu: ["Full Time"],
        // },
        // {
        //     title: "Over/Under",
        //     key: "OU6.5",
        //     subKeys: ["OU6.5", "ou1h", "ou2h"],
        //     subMenu: ["Full Time", "1st Half", "2nd Half"],
        // },
        {
            title: 'Correct Score',
            key: 'cs',
            subKeys: ['cs', 'cs1set', 'cs2set'],
            subMenu: ['Full Time', 'FIRST SET', 'SECOND SET'],
        },
        {
            title: "Odd or Even",
            key: "oe",
            subKeys: ["oe", "oe1set", "oe2set"],
            subMenu: ["FULLTIME", "FIRST SET", "SECOND SET"],
        },
    ],
    darts: [
        {
            title: 'Home/Away',
            key: 'ha',
            subKeys: ['ha', 'ha1set', 'ha2set', 'ha3set', 'ha4set', 'ha5set'],
            subMenu: ['Full Time', '1 SET', '2 SET', '3 SET', '4 SET', '5 SET'],
        },
        {
            title: "Asian Handicap Sets",
            key: "ahgames",
            subKeys: ["ahgames"],
            subMenu: ["ASIAN HANDICAP 1.5"],
        },
        {
            title: 'Correct Score',
            key: 'cs',
            subKeys: ['cs', 'cs1set', 'cs2set', 'cs3set', 'cs4set', 'cs5set'],
            subMenu: ['Full Time', 'FIRST SET', 'SECOND SET', 'THIRD SET', 'FOURTH SET', 'FIFTH SET'],
        },
    ],
    boxing: [
        {
            title: "1X2",
            key: "1X2",
            subKeys: ["1X2"],
            subMenu: ["Full Time"],
        },
        {
            title: 'Home/Away',
            key: 'ha',
            subKeys: ["ha"],
            subMenu: ["Full Time"],
        },
        {
            title: "Asian Handicap",
            key: "ah",
            subKeys: ["ah"],
            subMenu: ["Full Time"],
        },
        {
            title: "Over/Under Rounds",
            key: "ou",
            subKeys: ["ou"],
            subMenu: ["Full Time"],
        },
    ],
    badminton: [
        {
            title: 'Home/Away',
            key: 'ha',
            subKeys: ['ha', 'ha1set', 'ha2set', 'ha3set', 'ha4set', 'ha5set'],
            subMenu: ['Full Time', '1 SET', '2 SET', '3 SET', '4 SET', '5 SET'],
        },
        {
            title: "Asian Handicap Sets",
            key: "ahsets",
            subKeys: ["ahgames"],
            subMenu: ["ASIAN HANDICAP 1.5"],
        },
        {
            title: "Over/Under Sets",
            key: "ousets",
            subKeys: ["ousets"],
            subMenu: ["Full Time"],
        },
        {
            title: "Correct Score",
            key: "cs",
            subKeys: ["cs", "ou1h", "ou2h"],
            subMenu: [
                "FULLTIME 2:0",
                "FIRST SET 6:1",
                "SECOND SET 7:6",
                "THIRD SET 6:2",
                "FOURTH SET 7:6",
            ],
        },
    ],
    waterpolo: [
        {
            title: "1X2",
            key: "1X2",
            subKeys: ["1X2", "1x21h", "1x22h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Asian Handicap",
            key: "ah",
            subKeys: ["ah", "ah1h", "ah2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Over/Under",
            key: "ou",
            subKeys: ["ou", "ou1h", "ou2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Double Chance",
            key: "dc",
            subKeys: ["dc", "dc1h", "dc2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Odd or Even",
            key: "oe",
            subKeys: ["oe", "oe1set", "oe2set"],
            subMenu: ["FULLTIME", "FIRST SET", "SECOND SET"],
        },
    ],
    esports: [
        {
            title: 'Home/Away',
            key: 'ha',
            subKeys: ['ha'],
            subMenu: ['Full Time'],
        },
    ],
    mma: [
        {
            title: "1X2",
            key: "1X2",
            subKeys: ["1X2"],
            subMenu: ["Full Time"],
        },
        {
            title: 'Home/Away',
            key: 'ha',
            subKeys: ['ha'],
            subMenu: ['Full Time'],
        },
        {
            title: "Asian Handicap",
            key: "ah",
            subKeys: ["ah"],
            subMenu: ["Full Time"],
        },
    ],
    'american-football': [
        {
            title: "1X2",
            key: "1X2",
            subKeys: ["1X2"],
            subMenu: ["Full Time"],
        },
    ],
    futsal: [
        {
            title: "1X2",
            key: "1X2",
            subKeys: ["1X2", "1X21h", "1X22h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Over/Under",
            key: "ou",
            subKeys: ["ou", "ou1h", "ou2h"],
            subMenu: ["FT including OT", "1st Half", "2nd Half"],
        },
        {
            title: "Asian Handicap",
            key: "ah",
            subKeys: ["ah", "ah1h", "ah2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Both Teams to Score",
            key: "bts",
            subKeys: ["bts", "bts1h", "bts2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Double Chance",
            key: "dc",
            subKeys: ["dc", "dc1h", "dc2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Draw No Bet",
            key: "dnb",
            subKeys: ["dnb", "dnb1h", "dnb2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Halftime/Fulltime",
            key: "hf",
            subKeys: ["hf"],
            subMenu: ["Full Time"],
        },
        {
            title: "Odd or Even",
            key: "oe",
            subKeys: ["oe", "oe1h", "oe2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
    ],
    'rugby-union': [
        {
            title: "1X2",
            key: "1X2",
            subKeys: ["1X2", "1X21h", "1X22h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Home/Away",
            key: "haot",
            subKeys: ["haot", "ha1h", "ha2h"],
            subMenu: ["FT including OT", "1st Half", "2nd Half"],
        },
        {
            title: "Over/Under",
            key: "ou",
            subKeys: ["ou", "ou1h", "ou2h"],
            subMenu: ["FT including OT", "1st Half", "2nd Half"],
        },
        {
            title: "Asian Handicap",
            key: "ah",
            subKeys: ["ah", "ah1h", "ah2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Double Chance",
            key: "dc",
            subKeys: ["dc", "dc1h", "dc2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "European Handicap",
            key: "eh",
            subKeys: ["eh", "eh1h", "eh2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Draw No Bet",
            key: "dnb",
            subKeys: ["dnb", "dnb1h", "dnb2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Halftime/Fulltime",
            key: "hf",
            subKeys: ["hf"],
            subMenu: ["Full Time"],
        },
        {
            title: "Odd or Even",
            key: "oe",
            subKeys: ["oe", "oe1h", "oe2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
    ],
    'rugby-league': [
        {
            title: "1X2",
            key: "1X2",
            subKeys: ["1X2", "1X21h", "1X22h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Home/Away",
            key: "haot",
            subKeys: ["haot", "ha1h", "ha2h"],
            subMenu: ["FT including OT", "1st Half", "2nd Half"],
        },
        {
            title: "Over/Under",
            key: "ou",
            subKeys: ["ou", "ou1h", "ou2h"],
            subMenu: ["FT including OT", "1st Half", "2nd Half"],
        },
        {
            title: "Asian Handicap",
            key: "ah",
            subKeys: ["ah", "ah1h", "ah2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Double Chance",
            key: "dc",
            subKeys: ["dc", "dc1h", "dc2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "European Handicap",
            key: "eh",
            subKeys: ["eh", "eh1h", "eh2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Draw No Bet",
            key: "dnb",
            subKeys: ["dnb", "dnb1h", "dnb2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
        {
            title: "Halftime/Fulltime",
            key: "hf",
            subKeys: ["hf"],
            subMenu: ["Full Time"],
        },
        {
            title: "Odd or Even",
            key: "oe",
            subKeys: ["oe", "oe1h", "oe2h"],
            subMenu: ["Full Time", "1st Half", "2nd Half"],
        },
    ]
}



const brokerSportsApiRequest = require("../brokersports/brokersports-api");

function calculateStats(odds) {
    let totalLocal = 0;
    let totalDraw = 0;
    let totalVisitor = 0;
    let highestLocal = -Infinity;
    let highestDraw = -Infinity;
    let highestVisitor = -Infinity;
    let count = 0;

    for (const key in odds) {
        const values = odds[key];
        count++;
        if (values.length === 1) {
            totalLocal += values[0];
            highestLocal = Math.max(highestLocal, values[0]);
        } else if (values.length === 2) {
            totalLocal += values[0];
            totalVisitor += values[1];
            highestLocal = Math.max(highestLocal, values[0]);
            highestVisitor = Math.max(highestVisitor, values[1]);
        } else if (values.length === 3) {
            totalLocal += values[0];
            totalDraw += values[1];
            totalVisitor += values[2];
            highestLocal = Math.max(highestLocal, values[0]);
            highestDraw = Math.max(highestDraw, values[1]);
            highestVisitor = Math.max(highestVisitor, values[2]);
        }
    }

    const average = {
        local: totalLocal / count || 0,
        draw: totalDraw / count || 0,
        visitor: totalVisitor / count || 0,
    };

    const highest = {
        local: highestLocal === -Infinity ? 0 : highestLocal,
        draw: highestDraw === -Infinity ? 0 : highestDraw,
        visitor: highestVisitor === -Infinity ? 0 : highestVisitor,
    };

    // If draw is 0, remove it from the result
    if (average.draw === 0) delete average.draw;
    if (highest.draw === 0) delete highest.draw;

    return { average, highest };
}


const sports = ["soccer", "tennis", "basketball", "hockey", "handball", "baseball", "volleyball", "cricket", "snooker", "darts", "boxing", "badminton", "esports", "mma", "futsal", "rugby-union", "rugby-league"];
// ,

const getMatchesMarketOdds = (market, match) => {

    return new Promise(async (resolve, reject) => {
        try {

            const urlPath = `${match.match.url}${market}`
            console.log('urlPath', urlPath)
            const response = await brokerSportsApiRequest(urlPath, true);
            if (!response) throw new Error('Oops! Something went wrong! Please try again');

            // console.log('response',response)

            if (!response.oddsdata || !response.oddsdata.back) {
                reject('No Odds Data Found')
            }

            var allTheOdds = [];

            Object.keys(response.oddsdata.back).map(marketKey => {
                const marketData = response.oddsdata.back[marketKey]
                if (marketData.odds) {

                    var state = calculateStats(marketData.odds);
                    const handicapValue = marketData.handicapValue;

                    var oddsSet = {};

                    var marketCols = '1'

                    oddsSet.local = {
                        avg: !isNaN(state.average.local) ? Number(state.average.local.toFixed(2)) : null,
                        max: !isNaN(state.highest.local) ? Number(state.highest.local.toFixed(2)) : null,
                    }
                    if (Object.values(marketData.odds)[0].length >= 2) {
                        oddsSet.visitor = {
                            avg: !isNaN(state.average.visitor) ? Number(state.average.visitor.toFixed(2)) : null,
                            max: !isNaN(state.highest.visitor) ? Number(state.highest.visitor.toFixed(2)) : null,
                        }

                    }

                    if (Object.values(marketData.odds)[0].length == 3) {
                        oddsSet.draw = {
                            avg: !isNaN(state.average.draw) ? Number(state.average.draw.toFixed(2)) : null,
                            max: !isNaN(state.highest.draw) ? Number(state.highest.draw.toFixed(2)) : null,
                        }
                    }

                    if (Object.values(marketData.odds)[0].length == 2) {
                        marketCols = '1|2'
                    }

                    if (Object.values(marketData.odds)[0].length == 3) {
                        marketCols = '1|X|2'
                    }

                    allTheOdds.push({
                        market: market,
                        handicapValue: handicapValue,
                        oddsSet: oddsSet,
                        marketCols: marketCols
                    })


                }

            });

            // console.log('allTheOdds',allTheOdds)



            resolve(allTheOdds)


        } catch (error) {
            reject(error)
        }

    })

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
                // {
                //     $limit: 200,
                // },
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


        const times = ['1h','2h','4h','12h','24h']

        for (let index = 0; index < times.length; index++) {
            const time = times[index];
            
            try {
                
                const ooddsDropData =   await  fireQueryFordData(time);
                const createdOdds = await Model._create(_DroppingOddsSchema, {
                    oddsData: ooddsDropData,
                    key : time
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
                        key : time
                    })
                }



            } catch (error) {
                console.log('Error')
            }

        }

     

    } catch (error) {
        console.log('Error saveDroppingOdds', error)
    }
}

const saveSureBets =  async () => {
    try {
        
        const condition = {
        };
    
        const aggregate = [
          {
            $match: condition,
          },
          {
            $sort : {
              createdAt : 1
            }
          },
          {
            $group: {
              _id: { match :  '$match', subMarket : '$subMarket'},
             createdAtPast: { $first: "$createdAt" },
             createdAt: { $last: "$createdAt" },
             match : {$last : "$match"},
             market : {$last : "$market"},
             odds : {$last : "$odds"},
             date : {$last : "$date"},
             matches : {$last : "$matchDetails"}
            }
          },
          {
            $match: {
              'matches.match.event-stage-name' : 'Scheduled'
            },
          },
          {
            $addFields: {
              localOdds:  "$odds",
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
        
        const matches = await _MachOdds.aggregate(aggregate);

        const createSureBets = await Model._create(_Surebets, {
            sureBets: matches,
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
        console.log('error',error)
    }
}


const saveNextMatches =  async (sportMatches) => {
   
    try {
    
        await  _Matches.deleteMany({});
        console.log('Deleted Matches',moment().format('LLLL'))
        await  _Matches.insertMany(sportMatches);
        console.log('inserted',moment().format('LLLL'))


    } catch (error) {
        console.log('error',error)
    }
   
}


module.exports = {
    start: async () => {


        var sportMatches = [];
        var allSportsMatches = [];
        var totalAPICalls = 0;

        const today = moment();
        const dates = [today]
        // ,moment(today).add(1,'days'), moment(today).add(2,'days') 

        try {

            for (let sportIndex = 0; sportIndex < sports.length; sportIndex++) {
                const sport = sports[sportIndex];

                for (let dateIndex = 0; dateIndex < dates.length; dateIndex++) {
                    const date = dates[dateIndex];

                    try {

                        const dateMatches = await getMatchesData({ sport, date });
                        totalAPICalls++;

                        allSportsMatches = [...allSportsMatches, ...dateMatches]


                        for (let matchIndex = 0; matchIndex < dateMatches.length; matchIndex++) {
                            const match = dateMatches[matchIndex];


                            try {
                                // GET odds Markets
                                var market = '1X2';
                                const cols = match.match.cols.split('|');
                                if (cols.length == 2) market = 'haot'; //Home Away


                                // SAVE 1X2
                                sportMatches.push({
                                    sport: sport,
                                    match: match.match.url,
                                    matchDetails: match,
                                    market: market,
                                    subMarket: '',
                                    date: date.format('YYYYMMDD'),
                                    data: {},
                                    odds: match.odds[0] || {}
                                })

                                const sportMarkets = SPORT_MARKET[sport] || [];


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



                    } catch (error) {
                        console.error('error while take matches', error)
                        continue;
                    }

                }

            }



            console.log('totalAPICalls ===== ', totalAPICalls)
            // console.log('sportMatches',sportMatches)

            await _MachOdds.insertMany(sportMatches);
            console.log('inserted', moment().format('LLLL'));

            // SAVE Surebets
            saveSureBets();

            // Save Dropping Odds
            saveDroppingOdds();

            // Save Matches
            // saveNextMatches(allSportsMatches)


        } catch (error) {
            console.log('Error while getting league', error);
        }


    }
}