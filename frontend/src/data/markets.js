export const markets = {
  soccer: [
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
      subMenu: ["Full Time", "1st Half", "2nd Half"],
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
      title: "Correct Score",
      key: "cs",
      subKeys: ["cs", "cs1h", "cs2h"],
      subMenu: ["Full Time", "1st Half", "2nd Half"],
    },

    {
      title: "Halftime/Fulltime",
      key: "hf",
      subKeys: ["hf"],
      subMenu: ["Full Time"],
    },
    {
      title: "To Qualify",
      key: "TQ",
      subKeys: ["TQ"],
      subMenu: ["Full Time"],
    },
    {
      title: "Odd or Even",
      key: "oe",
      subKeys: ["oe", "oe1h", "oe2h"],
      subMenu: ["Full Time", "1st Half", "2nd Half"],
    },
  ],
  football: [
    {
      title: "1X2",
      key: "1X2",
      subKeys: ["1X2"],
      subMenu: ["Full Time"],
    },
    {
      title: "Home/Away",
      key: "ha",
      subKeys: ["ha", "ha1h"],
      subMenu: ["Full Time", "1st Half"],
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
      title: "Correct Score",
      key: "cs",
      subKeys: ["cs", "cs1h", "cs2h"],
      subMenu: ["Full Time", "1st Half", "2nd Half"],
    },

    {
      title: "Halftime/Fulltime",
      key: "hf",
      subKeys: ["hf"],
      subMenu: ["Full Time"],
    },
    {
      title: "To Qualify",
      key: "TQ",
      subKeys: ["TQ"],
      subMenu: ["Full Time"],
    },
    {
      title: "Odd or Even",
      key: "oe",
      subKeys: ["oe", "oe1h", "oe2h"],
      subMenu: ["Full Time", "1st Half", "2nd Half"],
    },
  ],
  tennis: [
    {
      title: "Home/Away",
      key: "ha",
      subKeys: ["ha", "ha1set", "ha2set"], //, "ha3set", "ha4set", "ha5set"
      subMenu: ["Full Time", "1st Set", "2 Set"], //, "3 Set", "4 Set", "5 Set"
    },
    {
      title: "Asian Handicap",
      key: "ahgames",
      subKeys: [
        ["ahgames", "ahsets"],
        "ahgames1set",
        "ahgames2set",
        // "ahgames3set",
        // "ahgames4set",
      ],
      subMenu: ["Full Time", "1st Set", "2 Set"]
    },
    // {
    //   title: "Asian Handicap Sets",
    //   key: "ahsets",
    //   subKeys: ["ahsets"],
    //   subMenu: ["Full Time"],
    // },
    // {
    //   title: "Over/Under Sets",
    //   key: "ousets",
    //   subKeys: ["ousets"],
    //   subMenu: ["Full Time"]
    // },
    {
      title: "Over/Under",
      key: "ougames",
      subKeys: [
        ["ougames", "ousets"],
        "ougames1set",
        "ougames2set",
        // "ougames3set",
        // "ougames4set",
        // "ougames5set",
      ],
      subMenu: ["Full Time", "1st Set", "2 Set"]
    },
    {
      title: "Correct Score",
      key: "cs",
      subKeys: ["cs", "cs1set", "cs2set"], // "cs3set", "cs4set"
      subMenu: ["Full Time", "1st Set", "2 Set"]
    },
    {
      title: "Odd or Even",
      key: "oe",
      subKeys: ["oe", "oe1set", "oe2set"],
      subMenu: ["FULLTIME", "FIRST SET", "SECOND SET"],
    },

    // {
    //   title: "To Qualify",
    //   key: "TQ",
    //   subKeys: ["TQ"],
    //   subMenu: ["Full Time"],
    // },
  ],
  basketball: [
    {
      title: "1X2",
      key: "1X2",
      subKeys: ["1X2", "1X21h", "1X22h"],
      subMenu: ["Full Time", "1st Half", "2nd Half"],
    },
    {
      title: "Home/Away",
      key: "haot",
      subKeys: ["haot"],
      subMenu: ["FT Including OT"],
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
      title: "European Handicap",
      key: "eh",
      subKeys: ["eh", "eh1h", "eh2h"],
      subMenu: ["Full Time", "1st Half", "2nd Half"],
    },
  ],
  hockey: [
    {
      title: "1X2",
      key: "1X2",
      subKeys: ["1X2", "1X21p", "1X22p", "1X23p"],
      subMenu: ["Full Time", "1st Period", "2nd Period", "3rd Period"],
    },
    {
      title: "Home/Away",
      key: "haot",
      subKeys: ["haot", "ha1p", "ha2p", "ha3p"],
      subMenu: ["FT including OT", "1st Period", "2 Period", "3rd Period"],
    },
    {
      title: "Asian Handicap",
      key: "ah",
      subKeys: ["ah", "ah1p", "ah2p", "ah3p"],
      subMenu: ["Full Time", "1st Period", "2 Period", "3rd Period"],
    },
    {
      title: "Over/Under",
      key: "ou",
      subKeys: ["ou", "ou1p", "ou2p", "ou3p"],
      subMenu: ["Full Time", "1st Period", "2 Period", "3rd Period"],
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
      title: "Home/Away",
      key: "haot",
      subKeys: ["haot", "ha1h", "ha2h"],
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
      title: "Home/Away",
      key: "ha",
      subKeys: ["ha", "ha1h"],
      subMenu: ["Full Time", "1st Half"],
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
      title: "Home/Away",
      key: "ha",
      subKeys: ["ha", "ha1set", "ha2set", "ha3set"], //, "ha4set", "ha5set"
      subMenu: ["Full Time", "1 SET", "2 SET", "3 SET"], //, "4 SET", "5 SET"
    },
    {
      title: "Asian Handicap Sets",
      key: "ahsets",
      subKeys: ["ahsets"],
      subMenu: ["Full Time"],
    },
    {
      title: "Over/Under",
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
      title: "Home/Away",
      key: "haot",
      subKeys: ["haot"],
      subMenu: ["FT including OT"],
    },
    {
      title: "Over/Under",
      key: "ou",
      subKeys: ["ou"],
      subMenu: ["Full Time"],
    },
    {
      title: "Asian Handicap",
      key: "ah",
      subKeys: ["ah"],
      subMenu: ["FT including OT"],
    },
  ],
  snooker: [
    {
      title: "Home/Away",
      key: "ha",
      subKeys: ["ha"], //, "ha1set", "ha2set", "ha3set", "ha4set", "ha5set"
      subMenu: ["Full Time"], //, "1 SET", "2 SET", "3 SET", "4 SET", "5 SET"
    },
    {
      title: "Asian Handicap",
      key: "ah",
      subKeys: ["ah"],
      subMenu: ["Full Time"],
    },
    {
      title: "Over/Under",
      key: "ou",
      subKeys: ["ou"],
      subMenu: ["Full Time"],
    },
    {
      title: "Correct Score",
      key: "cs",
      subKeys: ["cs"], // "cs1set", "cs2set"
      subMenu: ["Full Time"], //, "FIRST SET", "SECOND SET"
    },
    {
      title: "Odd or Even",
      key: "oe",
      subKeys: ["oe"], //, "oe1set", "oe2set"
      subMenu: ["Full Time"], //, "FIRST SET", "SECOND SET"
    },
  ],
  darts: [
    {
      title: "Home/Away",
      key: "ha",
      subKeys: ["ha"],
      subMenu: ["Full Time"],
    },
    // {
    //   title: "Asian Handicap Legs",
    //   key: "AHLegs",
    //   subKeys: ["AHLegs"],
    //   subMenu: ["Full Time"],
    // },
    {
      title: "Asian Handicap Sets",
      key: "ahsets",
      subKeys: ["ahsets"],
      subMenu: ["Full Time"],
    },
    {
      title: "Correct Score",
      key: "cs",
      subKeys: ["cs"], //, "cs1set", "cs2set", "cs3set", "cs4set", "cs5set"
      subMenu: [
        "Full Time",
        // "FIRST SET",
        // "SECOND SET",
        // "THIRD SET",
        // "FOURTH SET",
        // "FIFTH SET",
      ],
    },
    // {
    //   title: "Over/Under",
    //   key: "oulegs",
    //   subKeys: ["oulegs"],
    //   subMenu: ["Full Time"],
    // },
  ],
  boxing: [
    {
      title: "1X2",
      key: "1X2",
      subKeys: ["1X2"],
      subMenu: ["Full Time"],
    },
    {
      title: "Home/Away",
      key: "ha",
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
      title: "Home/Away",
      key: "ha",
      subKeys: ["ha", "ha1set", "ha2set", "ha3set"], // "ha4set", "ha5set"
      subMenu: ["Full Time", "1 SET", "2 SET", "3 SET"], //, "4 SET", "5 SET"
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
      title: "Home/Away",
      key: "ha",
      subKeys: ["ha"],
      subMenu: ["Full Time"],
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
      title: "Home/Away",
      key: "ha",
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
      title: "Over/Under",
      key: "ou",
      subKeys: ["ou"],
      subMenu: ["Full Time"],
    },
  ],
  'american-football': [
    {
      title: "Home/Away",
      key: "haot",
      subKeys: ["haot"],
      subMenu: ["Full Time"],
    },
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
  ],
};
