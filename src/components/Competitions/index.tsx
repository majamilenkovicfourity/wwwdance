import ArrowTitleHolder from "../shared/ArrowTitleHolder";
import React, { useEffect, useState } from "react";
import { getEvents } from "../../service/Events/eventService";
import styles from "./styles.module.scss";
import { EventData } from "@utils/datatype";
import EventByMonth from "./components/EventByMonth";

const Competitions: React.FC = () => {
  const [competitions, setCompetitions] = useState<EventData[]>([]);

  const fetchEvents = async () => {
    const events = await getEvents();
    setCompetitions(events);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className={styles.competitionsHolder}>
      <ArrowTitleHolder title="Upcoming events" />
      <EventByMonth isByMonth events={competitions} />
    </div>
  );
};

export default Competitions;
