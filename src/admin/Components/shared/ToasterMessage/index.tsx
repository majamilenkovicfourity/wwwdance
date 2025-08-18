import React, { FC, useState, useEffect } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

export type ToasterMessageProps = {
  message: string;
  type: "success" | "error";
};

export const ToasterMessage: FC<ToasterMessageProps> = ({
  message,
  type = "success",
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setErrorMessage(message);
    if (message === "") setVisible(false);
    else setVisible(true);
  }, [message]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={clsx(styles.toasterContainer, styles[type])}>
      {errorMessage}
    </div>
  );
};

export default ToasterMessage;
