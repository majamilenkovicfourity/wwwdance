import { EventData } from '@utils/datatype';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { getEventsSubase } from '../../../service/supabase/events';
import styles from './styles.module.scss';
import { Card } from '../Card';
import { Loader } from '../../../components/shared/Loader';
import { AddEdit } from '../AddEdit';

export const EventView: FC = () => {
  const [competitions, setCompetitions] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EventData>({});

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const onCancelClick = () => {
    setIsOpen(false);
  };

  const handleAddEditModal = (isEdit: boolean) => {
    setIsEdit(isEdit);
    setIsOpen(true);
  };

  const select = (id: string) => {
    setSelectedCardId(id);
    const selected = filteredEvents.find(
      (event) => event.id === selectedCardId
    );
    if (selected) {
      setSelectedEvent(selected);
    }
  };

  const filteredEvents = competitions.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

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
    <div className={styles.cardWrap}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.title}>Events data</div>
          <div className={styles.filterHolder}>
            <div className={styles.button}>
              <button onClick={() => handleAddEditModal(false)}>
                {' '}
                + Add event{' '}
              </button>
            </div>
            <div className={styles.input}>
              <input
                onChange={(e) => setSearch(e.target.value)}
                type='text'
                value={search}
                placeholder='Search event name...'
              />
            </div>
          </div>
          <div className={styles.cards}>
            {filteredEvents.length === 0 && <> No results found... </>}
            {filteredEvents.map((competition) => {
              return (
                <Card
                  competition={competition}
                  selected={competition.id === selectedCardId}
                  onSelect={select}
                  setCompetitions={setCompetitions}
                  handleEdit={handleAddEditModal}
                />
              );
            })}
          </div>
          {isOpen && (
            <AddEdit
              setCompetitions={setCompetitions}
              selectedEvent={selectedEvent}
              isOpen={isOpen}
              isEdit={isEdit}
              onCancelClick={onCancelClick}
            />
          )}
        </>
      )}
    </div>
  );
};
