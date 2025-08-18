import { FC, useEffect, useMemo, useState } from "react";
import cx from "clsx";

import styles from "./styles.module.scss";

const Slider: FC = () => {
  const sliderContent = useMemo(() => {
    return [
      {
        src: "/assets/BalletDance.png",
        alt: "danceStyle",
        title: "Ballet",
        text: "Classical ballet is the most traditional and structured form of ballet, characterized by its graceful movements, precise techniques and it requires immense dedication, strength, and flexibility.",
        href: "",
        color: "pink",
      },
      {
        src: "/assets/HipHopDance.png",
        alt: "danceStyle",
        title: "Hip-Hop",
        text: "Hip-hop dance is a vibrant and energetic street dance style that originated in the 1970s in the Bronx, New York City. It has grown into a global phenomenon, influencing everything from music videos to competitive dance battles.",
        href: "",
        color: "purple",
      },
      {
        src: "/assets/JazzDance.png",
        alt: "danceStyle",
        title: "Jazz Dance",
        text: "Jazz dance is an energetic and expressive dance style that blends African-American rhythms and movements with elements of ballet, modern dance and gimnastics. It emerged in the early 20th century in the United States and has evolved into various styles.",
        href: "",
        color: "orange",
      },
      {
        src: "/assets/BellyDance.png",
        alt: "Belly Dance",
        title: "Belly Dance",
        text: "Belly dance has origins in the ME and NA. It is characterized by hip movements, undulating torso isolations, and arm gestures. It has evolved into various styles and is now practiced worldwide for performance, fitness, and cultural expression.",
        href: "",
        color: "pink",
      },
      {
        src: "/assets/BreakDance.png",
        alt: "Break Dance",
        title: "Break Dance",
        text: "Breaking is a dynamic, freestyle dance and includes footwork, power moves, freezes, .... It is often performed in battles, where dancers compete to showcase their skills, creativity, and musicality. It has grown into a global phenomenon, influencing everything from music videos to competitive dance battles.",
        href: "",
        color: "purple",
      },
      {
        src: "/assets/ModernDance.png",
        alt: "Modern Dance",
        title: "Modern Dance",
        text: "A highly expressive and freeform dance style that emerged in the early 20th century as a rebellion against the strict rules of classical ballet. It focuses on natural movement, emotions, and individuality, allowing dancers to explore innovative techniques and storytelling methods.",
        href: "",
        color: "orange",
      },
    ];
  }, []);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Number of visible items based on screen width
  const getVisibleItems = () => (window.innerWidth < 1070 ? 1 : 3);
  const [visibleItems, setVisibleItems] = useState(getVisibleItems());

  useEffect(() => {
    const handleResize = () => setVisibleItems(getVisibleItems());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = sliderContent.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % totalSlides; // Always move one step forward
      if (newIndex === 0) {
        // If we're at the last item, we want to show the first item for mobile
        return 0; // For mobile, show the first item after reaching the last one
      }
      return newIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + totalSlides) % totalSlides; // Always move one step backward
      if (newIndex === totalSlides - 1) {
        // If we're at the start, we want to show the last item for mobile
        return totalSlides - 1; // For mobile, show the last item before wrapping to the first
      }
      return newIndex;
    });
  };

  return (
    <div className={styles.slideHolder}>
      <button
        onClick={handlePrev}
        className={cx(styles.arrowButton, styles.left)}
      >
        <img src="/assets/ArrowLeftWhite.png" alt="arrow left" />
      </button>

      <div className={styles.categoryHolder}>
        {sliderContent
          .slice(currentIndex, currentIndex + visibleItems)
          .concat(
            sliderContent.slice(
              0,
              Math.max(0, visibleItems - (totalSlides - currentIndex))
            )
          )
          .map((item) => (
            <div
              key={item.title}
              className={cx(styles.category, styles[item.color])}
            >
              <div className={styles.danceCategoryImage}>
                <img src={item.src} alt={item.title} />
                <div className={styles.categoryInfo}>
                  <div className={styles.textTitle}>{item.title}</div>
                  <div className={styles.textCategory}>{item.text}</div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <button
        onClick={handleNext}
        className={cx(styles.arrowButton, styles.right)}
      >
        <img src="/assets/ArrowRightWhite.png" alt="arrow right" />
      </button>
    </div>
  );
};

export default Slider;
