import ArrowTitleHolder from '../shared/ArrowTitleHolder';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { EventData } from '@utils/datatype';
import EventByMonth from './components/EventByMonth';
import { getEventsSubase } from '../../service/supabase/events';
import { Loader } from '../shared/Loader';

const Competitions: React.FC = () => {
  const [competitions, setCompetitions] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const events = await getEventsSubase();
      if (events) {
        setCompetitions(events);
        setIsLoading(false);
      } else {
        setCompetitions([]);
        setIsLoading(true);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.competitionsHolder}>
      <ArrowTitleHolder title='Upcoming events' />
      {isLoading ? (
        <Loader />
      ) : (
        <EventByMonth isByMonth events={competitions} />
      )}
    </div>
  );
};

export default Competitions;
