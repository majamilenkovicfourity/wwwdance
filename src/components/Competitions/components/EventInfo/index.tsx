import { FC, useMemo } from "react";
import { Modal } from "../../../shared/Modal";
import { competitions } from "../../../../data/competitionsData.json";
import styles from "./styles.module.scss";

interface EventInfoProps {
  isOpen: boolean;
  onCancelClick: () => void;
  selectedEvent: string;
}
export const EventInfo: FC<EventInfoProps> = ({
  isOpen,
  onCancelClick,
  selectedEvent,
}) => {
  const event = useMemo(() => {
    return competitions.find((event) => event.imgSrc === selectedEvent);
  }, [selectedEvent]);

  return (
    <Modal isOpen={isOpen} onCancelClick={onCancelClick}>
      <div className={styles.eventInfo}>
        <div className={styles.title}>{event?.name}</div>
        {/* <div className={styles.line} /> */}
        <img src={event?.imgSrc} alt="event-image" />
        <div className={styles.info}>
          <div className={styles.subTitleWrap}>
            <span className={styles.subtitle}>Location</span>
            <span>
              {event?.address} - {event?.city}
            </span>
          </div>

          <div className={styles.subTitleWrap}>
            <span className={styles.subtitle}>Date</span>
            <span>{event?.date}</span>
          </div>

          <div className={styles.subTitleWrap}>
            <span className={styles.subtitle}>About</span>
            <span>{event?.about}</span>
          </div>
        </div>
        {/* <div className={styles.line} /> */}
      </div>
    </Modal>
  );
};
