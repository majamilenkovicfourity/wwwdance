import React, { FC, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { quote } from '../../const/global';
import ArrowTitleHolder from '../shared/ArrowTitleHolder';
import EventByMonth from '../Competitions/components/EventByMonth';
import Slider from './Slider';

import { EventData } from '@utils/datatype';
import { getEventsSubase } from '../../service/supabase/events';
import { Loader } from '../shared/Loader';
import { getNext3Events } from '@utils/dateHelpers';

export const HomePage: FC = () => {
  const [competitions, setCompetitions] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const events = await getEventsSubase();
      if (events) {
        setCompetitions(getNext3Events(events));
        setIsLoading(false);
      } else {
        setCompetitions([]);
        setIsLoading(true);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainPhoto}>
        <video
          autoPlay
          loop
          muted
          controls
          playsInline
          className={styles.mainVideo}
        >
          <source src='/assets/homepagevideo2.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Upcoming events */}
      <ArrowTitleHolder title='Upcoming events' />

      {isLoading ? <Loader /> : <EventByMonth events={competitions} />}
      {/* Quote */}
      <div className={styles.quoteWrapper}>
        <div className={styles.quote}>"{quote.q1}" </div>
        <div className={styles.writer}> - {quote.q1w}</div>
      </div>
      {/* Image Slider */}
      <Slider />
    </div>
  );
};

export default HomePage;
