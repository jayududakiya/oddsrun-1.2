export const getSportsIcon = (SportName) => {
  
  SportName = SportName?.toLowerCase();
  switch (SportName) {
    case "tennis":
      return "emojione-v1:tennis";
    case "hockey":
      return "noto-v1:hole";
    case "soccer":
      return "openmoji:soccer-ball";
    case "football":
      return "openmoji:soccer-ball";
    case "american football":
      return "fluent-emoji-flat:american-football";
    case "boxing":
      return "openmoji:boxing-glove";
    case "cricket":
      return "bxs:cricket-ball";
    case "darts":
      // return "arcticons:pro-darts"
      return "gravity-ui:target-dart";
    case "esports":
      return "ic:outline-sports-esports";
    case "handball":
      return "emojione:person-playing-handball-medium-light-skin-tone";
    case "mma":
      return "ic:twotone-sports-mma";
    case "snooker":
      return "mdi:snooker-rack";
    case "volleyball":
      return "fa6-solid:volleyball";
    case "badminton":
      return "mdi:badminton";
    case "waterpolo":
      return "tabler:waterpolo";

    default:
      return `openmoji:${SportName}`;
  }
};
