import { FC } from "react";
import styles from "./styles.module.scss";

interface EventByMonthProps {
  month?: string;
  events: string[];
}

const NO_EVENTS_MESSAGE = "No Events for this month, yet...";

const EventByMonth: FC<EventByMonthProps> = ({ month, events }) => {
  return (
    <div className={styles.monthHolder}>
      {month && <div className={styles.monthTitle}> {month} </div>}

      <div className={styles.events}>
        {events.length === 0 && (
          <div className={styles.noEvents}>{NO_EVENTS_MESSAGE}</div>
        )}
        {events.map((item) => (
          <div key={item} className={styles.eventImg}>
            <img src={item} alt={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventByMonth;
