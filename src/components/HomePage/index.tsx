import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { quote } from "../../const/global";
import ArrowTitleHolder from "../shared/ArrowTitleHolder";
import EventByMonth from "../Competitions/components/EventByMonth";
import Slider from "./Slider";

import { EventData } from "@utils/datatype";
import { getEvents } from "../../service/Events/eventService";
import { monthNameToNumber } from "@utils/dateHelpers";

export const HomePage: React.FC = () => {
  const [competitions, setCompetitions] = React.useState<EventData[]>([]);

  const fetchEvents = async () => {
    const events = (await getEvents()).filter((event) => {
      return (
        event.date.year > new Date().getFullYear() ||
        (event.date.year === new Date().getFullYear() &&
          monthNameToNumber(event.date.month) >= new Date().getMonth())
      );
    });

    setCompetitions(events);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainPhoto}>
        <video
          autoPlay
          loop
          muted
          controls
          playsInline
          className={styles.mainVideo}
        >
          <source src="/assets/homepagevideo2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Upcoming events */}
      <ArrowTitleHolder title="Upcoming events" />
      <EventByMonth events={competitions} />

      {/* Quote */}
      <div className={styles.quoteWrapper}>
        <div className={styles.quote}>"{quote.q1}" </div>
        <div className={styles.writer}> - {quote.q1w}</div>
      </div>
      {/* Image Slider */}
      <Slider />
    </div>
  );
};

export default HomePage;
