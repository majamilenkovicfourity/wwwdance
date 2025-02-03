import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { EventInfo } from "../EventInfo";

interface EventByMonthProps {
  month?: string;
  events: string[];
}

const NO_EVENTS_MESSAGE = "No Events for this month, yet...";

const EventByMonth: FC<EventByMonthProps> = ({ month, events }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");

  return (
    <>
      <div className={styles.monthHolder}>
        {month && <div className={styles.monthTitle}> {month} </div>}

        <div className={styles.events}>
          {events.length === 0 && (
            <div className={styles.noEvents}>{NO_EVENTS_MESSAGE}</div>
          )}
          {events.map((item, index) => (
            <div key={item} className={styles.eventImg}>
              <img src={item} alt={"Competition " + (index + 1)} />
              <button
                className={styles.overlay}
                onClick={() => {
                  setIsOpen(true);
                  setSelectedEvent(item);
                }}
              >
                <p className={styles.readMore}>Read More</p>
              </button>
            </div>
          ))}
        </div>
      </div>
      {isOpen && (
        <EventInfo
          isOpen={isOpen}
          onCancelClick={() => setIsOpen(false)}
          selectedEvent={selectedEvent}
        />
      )}
    </>
  );
};

export default EventByMonth;
