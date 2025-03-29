import React, { useState } from "react";
import styles from "./styles.module.scss";

const LogIn: React.FC = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formContainer}>
        <div className={styles.ownerPart}>
          <div className={styles.title}> Impulse </div>
          <div className={styles.subtitle}> Dance Studio </div>
        </div>

        <div className={styles.formWrap}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formPart}>
              <div className={styles.inputGroup}>
                <label htmlFor="username" className={styles.label}>
                  USERNAME
                </label>
                <div className={styles.inputWrap}>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>
                  PASSWORD
                </label>

                <div className={styles.inputWrap}>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.submitButton}>
                <button type="submit">Log In</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
