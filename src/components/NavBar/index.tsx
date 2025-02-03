import React, { useState } from "react";
import WWWDanceLogo from "../../assets/LogoWWW.svg";
import Hamburger from "../../assets/fi_menu.svg";
import { useScreenWidth } from "../../hooks/useScreenWidth";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { breakpoints, navItems } from "../../const/global";

export const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const screenWidth = useScreenWidth();

  return (
    <div className={styles.navBar}>
      <div className={styles.navItemHolder}>
        <div className={styles.mainLogoWidth}>
          <img src={WWWDanceLogo} alt="logo" />
        </div>
        {screenWidth <= 960 && (
          <button onClick={() => setIsOpen(!isOpen)}>
            <div className={styles.hamburger}>
              <img src={Hamburger} alt="meni" />
            </div>
          </button>
        )}
      </div>

      <div
        className={
          screenWidth >= Number(breakpoints.laptops)
            ? styles.overlayMenuOpen
            : clsx(styles.overlayMenu, {
                [styles.active]: isOpen,
              })
        }
      >
        <div className={styles.navItem}>
          <NavLink
            to="/"
            relative={"path"}
            viewTransition
            className={({ isActive }) =>
              isActive ? `${styles.linkItem} ${styles.active}` : styles.linkItem
            }
          >
            <span className={styles.text}>{navItems.Home}</span>
          </NavLink>
          <NavLink
            to="/aboutus"
            relative={"path"}
            viewTransition
            className={({ isActive }) =>
              isActive ? `${styles.linkItem} ${styles.active}` : styles.linkItem
            }
          >
            <span className={styles.text}>{navItems.AboutUs}</span>
          </NavLink>
          <NavLink
            to="/competitions"
            relative={"path"}
            viewTransition
            className={({ isActive }) =>
              isActive ? `${styles.linkItem} ${styles.active}` : styles.linkItem
            }
          >
            <span className={styles.text}>{navItems.Competitions}</span>
          </NavLink>
          <NavLink
            to="/dancewear"
            relative={"path"}
            viewTransition
            className={({ isActive }) =>
              isActive ? `${styles.linkItem} ${styles.active}` : styles.linkItem
            }
          >
            <span className={styles.text}>{navItems.DanceWear}</span>
          </NavLink>
          <NavLink
            to="/contact"
            relative={"path"}
            viewTransition
            className={({ isActive }) =>
              isActive ? `${styles.linkItem} ${styles.active}` : styles.linkItem
            }
          >
            <span className={styles.text}>{navItems.Contact}</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
