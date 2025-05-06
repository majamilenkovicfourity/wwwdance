import { FC } from "react";
import { Modal } from "../../../shared/Modal";
import styles from "./styles.module.scss";
import { EventData } from "@utils/datatype";
import client from "../../../../../backend/pb_hooks/main";

interface EventInfoProps {
  isOpen: boolean;
  onCancelClick: () => void;
  selectedEvent: EventData;
}
export const EventInfo: FC<EventInfoProps> = ({
  isOpen,
  onCancelClick,
  selectedEvent,
}) => {
  const handleDownload = () => {
    const file = client.files.getURL(
      selectedEvent,
      selectedEvent?.document as unknown as string
    );
    const link = document.createElement("a");
    link.href = file;
    link.download = selectedEvent.document as unknown as string;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Modal isOpen={isOpen} onCancelClick={onCancelClick}>
      <div className={styles.eventInfo}>
        <div className={styles.title}>{selectedEvent?.name}</div>

        <img src={selectedEvent?.image as string} alt="selectedEvent-image" />
        <div className={styles.info}>
          <div className={styles.subTitleWrap}>
            <span className={styles.subtitle}>Location</span>
            <span>
              {selectedEvent?.address} - {selectedEvent?.city}
            </span>
          </div>

          <div className={styles.subTitleWrap}>
            <span className={styles.subtitle}>Date</span>
            <span>
              {selectedEvent?.date?.days.toString()}{" "}
              {selectedEvent?.date?.month} {selectedEvent?.date?.year}{" "}
            </span>
          </div>

          {selectedEvent?.about && (
            <div className={styles.subTitleWrap}>
              <span className={styles.subtitle}>About</span>
              <div dangerouslySetInnerHTML={{ __html: selectedEvent.about }} />
            </div>
          )}
          {selectedEvent.isPdfUploaded && selectedEvent?.document && (
            <div>
              <div className={styles.subTitleWrap}>
                <span className={styles.subtitle}>File</span>
                <button onClick={handleDownload}>
                  <div className={styles.fileDownload}>
                    <span>{JSON.stringify(selectedEvent?.document)}</span>
                    <img src="/assets/fileDownload.png" alt="Download" />
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
