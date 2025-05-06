import React from "react";
import styles from "./styles.module.scss";
import ArrowTitleHolder from "../shared/ArrowTitleHolder";

export const Contact: React.FC = () => {
  return (
    <div className={styles.contactPageWrapper}>
      <div className={styles.titleContact}>
        <ArrowTitleHolder title="Get in touch" />
      </div>
      <div className={styles.infoHolder}>
        <div className={styles.phone}>
          <div className={styles.fiPhone}>
            <img src="/assets/fi_phone_orange.svg" alt="phone" />
          </div>
          <div>
            <p> If you want to get in touch with us, contact us via phone: </p>
            <p className={styles.phoneInfo}> +38166400755 </p>
          </div>
        </div>
        <div className={styles.email}>
          <div>
            <p>
              If you have any suggestions or you would like your
              competition/dance school to stand out on our site, you can send us
              an email.
            </p>
          </div>
          <div className={styles.contactButton}>
            <img
              src="/assets/envelope.png"
              alt="envelope"
              width={10}
              height={10}
            />
            <span>CONTACT US</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
