import { FC, useEffect, useRef, useState } from "react";
import cx from "clsx";
import ArrowRight from "../../../assets/ArrowRight.png";
import ArrowLeft from "../../../assets/ArrowLeft.png";
import Ballet from "../../../assets/Ballet.png";
import JazzDance from "../../../assets/JazzDance.png";
import HipHop from "../../../assets/HipHop.png";

// import { TextImageHolder } from "../../shared/ImageWithTextHolder";
import styles from "./styles.module.scss";

const sliderContent = [
  {
    src: Ballet,
    alt: "danceStyle",
    title: "Ballet",
    href: "",
  },
  {
    src: HipHop,
    alt: "danceStyle",
    title: "Hip-Hop",
    href: "",
  },
  {
    src: JazzDance,
    alt: "danceStyle",
    title: "Jazz Dance",
    href: "",
  },
  {
    src: HipHop,
    alt: "danceStyle",
    title: "Hip-Hop 3",
    href: "",
  },
];

const Slider: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const slidesPerView = 3; // Number of images visible at once (for desktop)

  // Adjust slide width when the window is resized
  const updateSlideWidth = () => {
    if (slidesRef.current) {
      const slideWidth =
        slidesRef.current?.children[0]?.getBoundingClientRect().width || 0;
      setSlideWidth(slideWidth);
    }
  };

  // Hook to update slide width on mount and when the window resizes
  useEffect(() => {
    updateSlideWidth(); // Initial slide width calculation
    window.addEventListener("resize", updateSlideWidth); // Recalculate on resize
    return () => window.removeEventListener("resize", updateSlideWidth); // Clean up the event listener
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + slidesPerView) % sliderContent.length; // Move by `slidesPerView` (3 images on desktop)
      if (slidesRef.current) {
        slidesRef.current.scrollTo({
          left: nextIndex * slideWidth,
          behavior: "smooth",
        });
      }
      return nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexLoop =
        prevIndex < slidesPerView
          ? sliderContent.length - slidesPerView
          : prevIndex - slidesPerView; // Go backward by `slidesPerView`
      if (slidesRef.current) {
        slidesRef.current.scrollTo({
          left: prevIndexLoop * slideWidth,
          behavior: "smooth",
        });
      }
      return prevIndexLoop;
    });
  };

  // Effect to scroll to the current index
  useEffect(() => {
    if (slidesRef.current) {
      slidesRef.current.scrollTo({
        left: currentIndex * slideWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex, slideWidth]);

  return (
    <div className={styles.slideHolder}>
      <button
        onClick={prevSlide}
        className={cx(styles.arrowButton, styles.left)}
      >
        <img src={ArrowLeft} alt="arrow left" />
      </button>
      <div className={styles.imageHolder} ref={slidesRef}>
        {sliderContent.map((item, index) => (
          <div key={item.title + "-" + index} className={styles.slide}>
            <img src={item.src} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
      <button
        onClick={nextSlide}
        className={cx(styles.arrowButton, styles.right)}
      >
        <img src={ArrowRight} alt="arrow right" />
      </button>
    </div>
  );
};

export default Slider;
