import {
  ALPHABET,
  BET365,
  BETCLIC,
  BETFAIR,
  BETINASIA,
  BETSAFE,
  BETSSON,
  BETVICTOR,
  BETWAY,
  BET_FAIR_EXCHANGE,
  BET_FRED,
  BWIN,
  CHANCE,
  DAFABET,
  EIGHT_SPORT,
  EUROBET,
  FIRST_BET,
  FORTUNA,
  FRANCE_PARI,
  GGBET,
  LASBET,
  MARSBET,
  MATCH_BOOK,
  N1_BET,
  NORDICBET,
  PINNACLE,
  PLANET_WIN,
  SPORTIUM,
  STS,
  TEN_BET,
  TIPSPORT,
  UNIBET,
  VOBET,
  VULKANBET,
  WILLIAM_HILL,
} from "../assets/images";

export const getBetLogo = (logo) => {
  switch (logo) {
    case "Betsafe":
      return BETSAFE;
    case "Betway":
      return BETWAY;
    case "888sport":
      return EIGHT_SPORT;
    case "Nordicbet":
      return NORDICBET;
    case "Betsson":
      return BETSSON;
    case "Chance.cz":
      return CHANCE;
    case "Ifortuna.cz":
      return FORTUNA;
    case "Tipsport.cz":
      return TIPSPORT;
    case "Bwin.it":
      return BWIN;
    case "Betvictor":
      return BETVICTOR;
    case "Efortuna.pl":
      return FORTUNA;
    case "Ifortuna.sk":
      return FORTUNA;
    case "Sts.pl":
      return STS;
    case "Sportium.es":
      return SPORTIUM;
    case "Tipsport.sk":
      return TIPSPORT;
    case "Betfair":
      return BETFAIR;
    case "Vulkan bet":
      return VULKANBET;
    case "Marsbet":
      return MARSBET;
    case "Ggbet":
      return GGBET;
    case "Vobet":
      return VOBET;
    case "1xbet":
      return FIRST_BET;
    case "William hill":
      return WILLIAM_HILL;
    case "Pinnacle":
      return PINNACLE;
    case "Alphabet":
      return ALPHABET;
    case "10x10bet":
      return TEN_BET;
    case "Lasbet":
      return LASBET;
    case "N1 bet":
      return N1_BET;
    case "Bwin.es":
      return BWIN;
    case "Williamhill.it":
      return WILLIAM_HILL;
    case "Eurobet.it":
      return EUROBET;
    case "Unibet":
      return UNIBET;
    case "Bet365":
      return BET365;
    case "Betfred":
      return BET_FRED;
    case "Bet At Home":
      return BET365;
    case "Betfair exchange":
      return BET_FAIR_EXCHANGE;
    case "France pari":
      return FRANCE_PARI;
    case "Betclic.fr":
      return BETCLIC;
    case "Dafabet":
      return DAFABET;
    case "Matchbook":
      return MATCH_BOOK;
    case "Unibet.it":
      return UNIBET;
    case "Bet365.it":
      return BET365;
    case "Planetwin365":
      return PLANET_WIN;
    case "Betinasia":
      return BETINASIA;
  }
};
