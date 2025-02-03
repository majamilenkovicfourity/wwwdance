import { FC, PropsWithChildren } from "react";
import styles from "./styles.module.scss";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onCancelClick: () => void;
}

export const Modal: FC<ModalProps> = ({ isOpen, children, onCancelClick }) => {
  return (
    isOpen && (
      <div className={styles.overlay} onClick={onCancelClick}>
        <div
          className={styles.modalContainer}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.closeButton} onClick={onCancelClick}>
            &times;
          </button>
          {children}
        </div>
      </div>
    )
  );
};
