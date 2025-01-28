import { FC } from "react";
import ArrowRight from "../../../assets/ArrowRight.png";
import styles from "./styles.module.scss";

interface ArrowTitleHolderProp {
  title: string;
}

const ArrowTitleHolder: FC<ArrowTitleHolderProp> = ({ title }) => {
  return (
    <div className={styles.upcomingEvent}>
      <div className={styles.arrowHolder}>
        <img src={ArrowRight} alt="arrow" />
        <img src={ArrowRight} alt="arrow" />
      </div>
      <span>
        <p> {title} </p>
      </span>
    </div>
  );
};

export default ArrowTitleHolder;
