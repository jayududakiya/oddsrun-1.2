// import { Icon } from "@iconify/react";
// import React from "react";
// import { Stack } from "react-bootstrap";
// import styles from "./MyCoupon.module.css";
// import { useDispatch } from "react-redux";
// import { loadDroppingOdds } from "../../store/data.action";
// import { toast } from "react-toastify";
// import { getSportsIcon } from "../../data/SportsIcon";

// const NavTab = (props) => {
//   const { onClickTab, isActive } = props;
//   const dispatch = useDispatch();

//   const filterDroppingOdds = (data) => {
//     try {
//       dispatch(
//         loadDroppingOdds({
//           sport: data.toLowerCase(),
//         })
//       );
//     } catch (error) {
//       toast.error(error);
//     }
//   };

//   const handleNavClick = () => {
//     if (onClickTab) {
//       onClickTab(props.title);
//     } else {
//       filterDroppingOdds(props.title);
//     }
//   };

//   return (
//     <Stack
//       direction="horizontal"
//       className={`${styles.navTab} ${isActive ? styles.activeSportName : ""}`}
//       onClick={handleNavClick}
//     >
//       <Icon icon={getSportsIcon(props.title)} className={styles.iconFont} />
//       <span className={`ms-2 ${styles.navTabFont}`}>{props.title}</span>
//     </Stack>
//   );
// };

// export default NavTab;

import React from "react";
import { Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import styles from "./MyCoupon.module.css";
import { loadDroppingOdds } from "../../store/data.action";
import { toast } from "react-toastify";
import { getSportsIcon } from "../../data/SportsIcon";

const NavTab = ({ title, onClickTab, isActive }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    try {
      if (onClickTab) {
        onClickTab(title); // Pass the tab title to the parent handler
      } else {
        dispatch(loadDroppingOdds({ sport: title.toLowerCase() })); // Fallback action
      }
    } catch (error) {
      toast.error("An error occurred while filtering odds!");
    }
  };

  return (
    <Stack
      direction="horizontal"
      className={`${styles.navTab} ${isActive ? styles.activeSportName : ""}`}
      onClick={handleClick}
    >
      <Icon icon={getSportsIcon(title)} className={styles.iconFont} />
      <span className={`ms-2 ${styles.navTabFont}`}>{title}</span>
    </Stack>
  );
};

export default NavTab;
