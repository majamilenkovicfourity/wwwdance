import { FC } from 'react';
import styles from './styles.module.scss';

export const Loader: FC = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinner} role='status' aria-label='Loading' />
    </div>
  );
};
