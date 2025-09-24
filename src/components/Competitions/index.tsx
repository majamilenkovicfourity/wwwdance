import ArrowTitleHolder from '../shared/ArrowTitleHolder';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { EventData } from '@utils/datatype';
import EventByMonth from './components/EventByMonth';
import { getEventsSubase } from '../../service/supabase/events';

const Competitions: React.FC = () => {
  const [competitions, setCompetitions] = useState<EventData[]>([]);

  const fetchEvents = async () => {
    const events = await getEventsSubase();
    setCompetitions(events);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className={styles.competitionsHolder}>
      <ArrowTitleHolder title='Upcoming events' />
      <EventByMonth isByMonth events={competitions} />
    </div>
  );
};

export default Competitions;
