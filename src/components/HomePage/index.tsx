import React from "react";
import styles from "./styles.module.scss";
import MainPhoto from "../../assets/GirlDancing.png";
import ArrowRight from "../../assets/ArrowRight.png";
import ArrowLeft from "../../assets/ArrowLeft.png";
import OrangeDance from "../../assets/Dance1Orange.png";
import Ballet from "../../assets/Ballet.png";
import HipHop from "../../assets/HipHop.png";
import JazzDance from "../../assets/JazzDance.png";
import { TextImageHolder } from "../shared/ImageWithTextHolder";
import { quote } from "../../const/global";

export const HomePage: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainPhoto}>
        <img src={MainPhoto} alt="main-photo" />
      </div>
      {/* Upcoming event */}
      <div className={styles.upcomingEvent}>
        <div className={styles.arrowHolder}>
          <img src={ArrowRight} alt="arrow" />
          <img src={ArrowRight} alt="arrow" />
        </div>
        <span>
          <h1> UPCOMING EVENT </h1>
        </span>
      </div>
      {/*  info */}
      <TextImageHolder
        src={OrangeDance}
        alt={"Odance"}
        position="up"
        label="Info"
        margin
      />
      {/* Quote */}
      <div className={styles.quote}>
        <div>
          <span>"{quote.q1}" </span>
          <br />
          <span className={styles.writer}> - {quote.q1w}</span>
        </div>
      </div>
      {/* Image Slider */}
      <div className={styles.slideHolder}>
        <div>
          <img src={ArrowLeft} alt="arrow" />
        </div>
        <div className={styles.imageHolder}>
          <TextImageHolder
            src={Ballet}
            alt={"danceStyle"}
            position="center"
            uppercase={true}
            label="Ballet"
            margin
          />
          <TextImageHolder
            src={JazzDance}
            alt={"danceStyle"}
            position="center"
            uppercase={true}
            label="Jazz Dance"
            margin
          />
          <TextImageHolder
            src={HipHop}
            alt={"danceStyle"}
            position="center"
            label="Hip - hop"
            uppercase={true}
            margin
          />
        </div>
        <div>
          <img src={ArrowRight} alt="arrow" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
