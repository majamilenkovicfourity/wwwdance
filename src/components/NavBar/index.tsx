import React, { useState } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { NavLink, useNavigate } from "react-router-dom";
import { breakpoints, navItems } from "../../const/global";
import { useScreenWidth } from "../../hooks/useScreenWidth";

export const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const screenWidth = useScreenWidth();
  const navigate = useNavigate();

  return (
    <div className={styles.navBar}>
      <div className={styles.navItemHolder}>
        <button className={styles.mainLogoWidth} onClick={() => navigate("/")}>
          <img src="/assets/LogoWWW.svg" alt="logo" />
        </button>
        {screenWidth <= 960 && (
          <button onClick={() => setIsOpen(!isOpen)}>
            <div className={styles.hamburger}>
              <img src="/assets/fi_menu.svg" alt="meni" />
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
            onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
          >
            <span className={styles.text}>{navItems.Contact}</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
