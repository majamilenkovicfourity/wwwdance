import React from 'react';

import { footerElement } from '../../const/global';
import styles from './styles.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.textWrapper}>
        <div className={styles.emailImage}>
          <img src='/assets/envelope.png' alt='mail' />
        </div>
        <div className={styles.emailText}>
          <div className={styles.envelopeForDesktop}>
            <img src={'/assets/emailIcon.svg'} alt='Email Icon' />
          </div>
          <span>{footerElement.Email}</span>
        </div>
        <div className={styles.copyright}>
          <span> {footerElement.Copyrights} </span>
        </div>
      </div>
      {/* </div> */}
    </footer>
  );
};

export default Footer;
