import React from "react";
import styles from "./styles.module.scss";
import MainPhoto from "../../assets/GirlDancing.png";
import { quote } from "../../const/global";
import ArrowTitleHolder from "../shared/ArrowTitleHolder";
import EventByMonth from "../Competitions/components/EventByMonth";
import SpringFest from "../../assets/UpcomingEventsAssets/SpringFestival17.5.2025.png";
import DanceFest from "../../assets/UpcomingEventsAssets/13.plesni-festival.png";
import Slider from "./Slider";

export const HomePage: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainPhoto}>
        <img src={MainPhoto} alt="main-photo" />
      </div>
      {/* Upcoming event */}
      <ArrowTitleHolder title="Upcoming event" />
      <EventByMonth events={[DanceFest, SpringFest]} />

      {/* Quote */}
      <div className={styles.quote}>
        <div>
          <span>"{quote.q1}" </span>
          <br />
          <span className={styles.writer}> - {quote.q1w}</span>
        </div>
      </div>
      {/* Image Slider */}
      <Slider />
    </div>
  );
};

export default HomePage;
