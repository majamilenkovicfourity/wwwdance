import React from "react";
import styles from "./styles.module.scss";
import { useScreenWidth } from "../../hooks/useScreenWidth";
import { breakpoints } from "../../const/global";
import { useNavigate } from "react-router-dom";

const AboutUs: React.FC = () => {
  const screenWidth = useScreenWidth();
  const navigate = useNavigate();

  return (
    <div className={styles.backgroundImage}>
      <div className={styles.pageTitle}>
        <div className={styles.arrowHolder}>
          <img src="/assets/ArrowRight.png" alt="arrow" />
        </div>
        <span className={styles.pageTitleText}>
          Something <span className={styles.pinkText}> About Us</span>...
        </span>
      </div>
      <div className={styles.textHolder}>
        <div className={styles.textWrapper}>
          <p className={styles.subTitle}>How did we start?</p>
          <div className={styles.text}>
            The desire for this website, as well as for dance, came
            spontaneously! We are all brought together by the love of dance, and
            from there the need for a site that would be all about it!
          </div>
          <div className={styles.text}>
            Here you can find explanations for some dance styles, as well as
            planned events for them. Dance events are posted for the whole year,
            for all styles and categories. So that we don't just end there, as
            the love and desire are growing, we would like you to find practical{" "}
            <button
              className={styles.pinkText}
              onClick={() => navigate("/dancewear")}
            >
              #dancewear
            </button>{" "}
            for your sport on this site!
          </div>

          <div className={styles.text}>
            If you have any suggestions or you would like your competition/dance
            school to stand out on our site, you can send us an email.
          </div>
        </div>
      </div>

      {screenWidth <= breakpoints.laptops && (
        <img src="/assets/aboutusStandingMan.png" alt="danceMove" />
      )}
    </div>
  );
};

export default AboutUs;
