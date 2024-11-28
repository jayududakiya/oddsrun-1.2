import { Icon } from "@iconify/react";
import React from "react";
import { Stack } from "react-bootstrap";
import styles from "./MyCoupon.module.css";
import { useDispatch } from "react-redux";
import { loadDroppingOdds } from "../../store/data.action";
import { toast } from "react-toastify";
import { getSportsIcon } from "../../data/SportsIcon";

const NavTab = (props) => {
  const { onClickTab, isActive } = props;
  const dispatch = useDispatch();

  const filterDroppingOdds = (data) => {
    try {
      dispatch(
        loadDroppingOdds({
          sport: data.toLowerCase(),
        })
      );
    } catch (error) {
      toast.error(error);
    }
  };

  const handleNavClick = () => {
    if (onClickTab) {
      onClickTab(props.title);
    } else {
      filterDroppingOdds(props.title);
    }
  };

  return (
    <Stack
      direction="horizontal"
      className={`${styles.navTab} ${isActive ? styles.activeSportName : ""}`}
      onClick={handleNavClick}
    >
      <Icon icon={getSportsIcon(props.title)} className={styles.iconFont} />
      <span className={`ms-2 ${styles.navTabFont}`}>{props.title}</span>
    </Stack>
  );
};

export default NavTab;
