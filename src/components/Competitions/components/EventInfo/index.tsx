import { FC } from 'react';
import { Modal } from '../../../shared/Modal';
import styles from './styles.module.scss';
import { EventData } from '@utils/datatype';

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
  return (
    <Modal isOpen={isOpen} onCancelClick={onCancelClick}>
      <div className={styles.eventInfo}>
        <div className={styles.title}>{selectedEvent?.name}</div>

        <img src={selectedEvent?.image as string} alt='selectedEvent-image' />
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
              {selectedEvent?.date?.days.toString()}{' '}
              {selectedEvent?.date?.month} {selectedEvent?.date?.year}{' '}
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
                <button
                  onClick={() =>
                    console.log('This option is still not available. Sorry!')
                  }
                >
                  <div className={styles.fileDownload}>
                    <span>{JSON.stringify(selectedEvent?.document)}</span>
                    <img src='/assets/fileDownload.png' alt='Download' />
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
