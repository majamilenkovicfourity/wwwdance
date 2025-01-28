import ArrowTitleHolder from "../shared/ArrowTitleHolder";
import styles from "./styles.module.scss";
import DanceFest from "../../assets/UpcomingEventsAssets/13.plesni-festival.png";
import SpringFest from "../../assets/UpcomingEventsAssets/SpringFestival17.5.2025.png";
import EventByMonth from "./components/EventByMonth";

const Competitions: React.FC = () => {
  return (
    <div className={styles.competitionsHolder}>
      <ArrowTitleHolder title="Upcoming events" />
      <EventByMonth month="March" events={[DanceFest, SpringFest]} />
      <EventByMonth month="April" events={[]} />
    </div>
  );
};

export default Competitions;
