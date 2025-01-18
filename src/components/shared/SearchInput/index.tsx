import React from "react";
import styles from "./styles.module.scss";
import IconSearch from "../../../assets/fi_search.svg";
export const SearchInput: React.FC = () => {
  return (
    <div className={styles.searchWrapper}>
      <input type="text" className={styles.searchInput}></input>
      <img
        src={IconSearch}
        alt="seach"
        className={styles.searchIcon}
        width={20}
      ></img>
    </div>
  );
};
