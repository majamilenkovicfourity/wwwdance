import React from "react";
import styles from "./styles.module.scss";
import ArrowRight from "../../assets/ArrowRight.png";
import Telephone from "../../assets/fi_phone.png";
import Envelope from "../../assets/envelope.png";

export const Contact: React.FC = () => {
  return (
    <div className={styles.contactPageWrapper}>
      <div className={styles.titleContact}>
        <div>
          <img src={ArrowRight} alt="arrowRight" />
        </div>
        <h1> GET IN TOUCH </h1>
      </div>
      <div className={styles.infoHolder}>
        <div className={styles.phone}>
          <div>
            <img src={Telephone} alt="phone" />
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
            <img src={Envelope} alt="envelope" width={10} height={10} />
            <span>CONTACT US</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
