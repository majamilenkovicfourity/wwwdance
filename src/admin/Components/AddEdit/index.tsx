import { EventData, Month } from '@utils/datatype';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Modal } from '../../../components/shared/Modal';
import styles from './styles.module.scss';
import { monthNames } from '@utils/dateHelpers';
import { supabase } from '../../../service/supabase/client';
import { initData } from '@utils/dataInit';

type AddEditProps = {
  isOpen: boolean;
  onCancelClick: () => void;
  selectedEvent?: EventData;
  isEdit: boolean;
  setCompetitions: (events: EventData[]) => void;
};

export const AddEdit: FC<AddEditProps> = ({
  isOpen,
  onCancelClick,
  selectedEvent,
  setCompetitions,
  isEdit,
}) => {
  const [formData, setFormData] = useState<EventData>({
    name: '',
    address: '',
    location: '',
    date: { days: '', month: Month.January, year: 0 },
    about: '',
    isPdfUploaded: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    console.log('NAME: ', name);
    console.log('VALUE: ', value);

    if (name.startsWith('date.')) {
      const dateField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        date: {
          ...prev.date,
          [dateField]: dateField === 'year' ? Number(value) : value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .update({
          name: formData.name,
          address: formData.address,
          location: formData.location,
          date: formData.date,
          about: formData.about,
        })
        .eq('id', formData.id)
        .select('*'); // important

      if (error) {
        console.error('Update error:', error.message);
      } else {
        const updatedEvent = data[0] as EventData;

        setCompetitions((prev: EventData[]) =>
          prev.map((comp: EventData) =>
            comp.id === updatedEvent.id ? { ...comp, ...updatedEvent } : comp
          )
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      onCancelClick();
    }
  };

  useEffect(() => {
    if (isEdit) {
      setFormData(initData);
    }
    if (selectedEvent) {
      setFormData(selectedEvent);
    }
  }, [selectedEvent, isEdit]);

  return (
    <Modal isOpen={isOpen} onCancelClick={onCancelClick}>
      <div className={styles.inputHolder}>
        <div className={styles.inputStyle}>
          <label> Name: </label>
          <input
            onChange={handleChange}
            aria-label='name'
            name='name'
            type='text'
            value={formData.name}
          />
        </div>
        <div className={styles.inputStyle}>
          <label> Address: </label>
          <input
            onChange={handleChange}
            aria-label='address'
            name='address'
            type='text'
            value={formData.address}
          />
        </div>
        <div className={styles.inputStyle}>
          <label> Location/City: </label>
          <input
            onChange={handleChange}
            name='location'
            type='text'
            value={formData.location}
          />
        </div>
        <div>
          <label> Date </label>
          <div className={styles.inputStyle}>
            <label>Day/Days:</label>
            <input
              onChange={handleChange}
              name='date.days'
              type='text'
              value={formData.date.days}
            />
          </div>
          <div className={styles.inputStyle}>
            <label>Month</label>
            <select
              value={formData.date.month}
              onChange={handleChange}
              name='date.month'
              aria-label='month'
            >
              {monthNames.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputStyle}>
            <label>Year:</label>
            <input
              onChange={handleChange}
              aria-label='name'
              name='date.year'
              type='text'
              value={formData.date.year}
            />
          </div>
        </div>

        <div className={styles.textAreaStyle}>
          <label> About: </label>
          <textarea
            onChange={handleChange}
            aria-label='name'
            name='about'
            value={formData.about}
          />
        </div>
      </div>
      <div>
        <div className={styles.buttonWrap}>
          <button onClick={async () => await handleSave()}> Save </button>
          <button onClick={() => onCancelClick()}> Cancel </button>
        </div>
      </div>
    </Modal>
  );
};
