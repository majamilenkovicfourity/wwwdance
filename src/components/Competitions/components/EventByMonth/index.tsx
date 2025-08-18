import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { EventInfo } from "../EventInfo";
import { EventData } from "@utils/datatype";
import { monthNameToNumber } from "@utils/dateHelpers";

interface EventByMonthProps {
  events: EventData[];
  isByMonth?: boolean;
}
const NO_EVENTS_MESSAGE = "No Events for this month, yet...";

const groupByYearAndMonth = (events: EventData[]) => {
  const groupedEvents: { [key: string]: EventData[] } = {};

  events.forEach((event) => {
    const yearMonth = `${event.date.month} ${event.date.year}`;
    if (!groupedEvents[yearMonth]) {
      groupedEvents[yearMonth] = [];
    }
    groupedEvents[yearMonth].push(event);
  });

  return Object.entries(groupedEvents)
    .sort(([a], [b]) => {
      const [monthA, yearA] = a.split(" ");
      const [monthB, yearB] = b.split(" ");

      const dateA = new Date(Number(yearA), monthNameToNumber(monthA));
      const dateB = new Date(Number(yearB), monthNameToNumber(monthB));

      return dateB.getTime() - dateA.getTime();
    })
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as { [key: string]: EventData[] });
};

const EventByMonth: FC<EventByMonthProps> = ({ events, isByMonth = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData>(
    {} as EventData
  );

  const groupedEvents = groupByYearAndMonth(events);
  return (
    <>
      <div className={styles.monthHolder}>
        {isByMonth &&
          Object.keys(groupedEvents).map((title) => (
            <span key={title}>
              <div className={styles.monthTitle}>{title}</div>
              <div className={styles.events}>
                {groupedEvents[title].map((event, index) => (
                  <div key={event.id} className={styles.eventImg}>
                    {typeof event.image === "string" && (
                      <img src={event.image} alt={"Competition " + index} />
                    )}
                    <button
                      className={styles.overlay}
                      onClick={() => {
                        setIsOpen(true);
                        setSelectedEvent(event);
                      }}
                    >
                      <p className={styles.readMore}>Read More</p>
                    </button>
                  </div>
                ))}
              </div>
            </span>
          ))}

        {!isByMonth && (
          <div className={styles.events}>
            {events.length === 0 && (
              <div className={styles.noEvents}>{NO_EVENTS_MESSAGE}</div>
            )}
            {events.map((item, index) => (
              <div key={item.id} className={styles.eventImg}>
                {typeof item.image === "string" && (
                  <img src={item.image} alt={"Competition " + index} />
                )}
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
        )}
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
