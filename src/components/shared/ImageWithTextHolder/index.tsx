import React from "react";
import styles from "./styles.module.scss";
import cx from "clsx";
interface TextImageHolderProsp {
  position: "up" | "center";
  label: string;
  uppercase?: boolean;
  margin?: boolean;
  src: string;
  alt: string;
}

export const TextImageHolder: React.FC<TextImageHolderProsp> = ({
  position,
  uppercase,
  label,
  src,
  alt,
  margin,
}) => {
  return (
    <>
      <div className={cx(margin && styles.margin, styles.imageHolder)}>
        <img src={src} alt={alt} />
        <div
          className={
            position === "up" ? styles.infoTextUp : styles.infoTextCenter
          }
        >
          {uppercase ? label.toUpperCase() : label}
        </div>
      </div>
    </>
  );
};
