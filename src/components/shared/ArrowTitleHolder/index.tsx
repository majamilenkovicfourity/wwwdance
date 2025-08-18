import { FC } from "react";
import styles from "./styles.module.scss";

interface ArrowTitleHolderProp {
  title: string;
}

const ArrowTitleHolder: FC<ArrowTitleHolderProp> = ({ title }) => {
  return (
    <div className={styles.upcomingEvent}>
      <div className={styles.arrowHolder}>
        <img src="/assets/ArrowRight.png" alt="arrow" />
        <img src="/assets/ArrowRight.png" alt="arrow" />
      </div>
      <span>
        <p> {title} </p>
      </span>
    </div>
  );
};

export default ArrowTitleHolder;
