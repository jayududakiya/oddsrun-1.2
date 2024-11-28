import React from "react";
import { Oval } from "react-loader-spinner";
import styles from "../Loader/Loader.module.css";

const Loading = (props) => {
  return (
    <div className={styles.loader}>
      <Oval
        visible={true}
        height="150"
        width="150"
        color="#656ef5"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
        secondaryColor="gray"
        {...props}
      />
    </div>
  );
};

export default Loading;
