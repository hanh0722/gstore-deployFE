import React from "react";
import Loading from "../Loading/Loading";
import styles from "./Progress.module.scss";
const Progress = () => {
  return (
    <div className={styles.layout}>
      <p>Loading...</p>
      <Loading/>
      <div className={styles.progress}></div>
    </div>
  );
};

export default Progress;
