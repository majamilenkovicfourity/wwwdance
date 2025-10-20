import { EventData } from '@utils/datatype';
import styles from './styles.module.scss';
import { FC, useState } from 'react';
import clsx from 'clsx';
import { AddEdit } from '../AddEdit';

type CardProps = {
  competition: EventData;
  selected: boolean;
  onSelect: (id: string) => void;
  setCompetitions: (events: EventData[]) => void;
  handleEdit: (isEdit: boolean) => void;
};
export const Card: FC<CardProps> = ({
  competition,
  selected,
  onSelect,
  handleEdit,
}) => {
  return (
    <>
      <div
        className={clsx(
          [styles.cardHolder],
          selected ? styles.selected : undefined
        )}
        onClick={() => onSelect(competition.id ?? '')}
      >
        <div className={styles.text1}>
          <div className={styles.eventInfo}>
            <div className={styles.subTitle}> Event name: </div>
            <div> {competition.name}</div>
            <div className={styles.subTitle}> Address: </div>
            <div> {competition.address}</div>
            <div className={styles.subTitle}> Location: </div>
            <div> {competition.location}</div>
            <div className={styles.subTitle}> Date: </div>
            <div>
              {' '}
              {competition.date.days} {competition.date.month}{' '}
              {competition.date.year}
            </div>
          </div>
          <div>
            {/* image holder */}
            <div className={styles.imageWrap}>
              <img src={competition?.image?.toString()}></img>
            </div>
          </div>
        </div>

        <div className={styles.aboutWrap}>
          <div className={styles.subTitle}> About </div>
          <div> {competition.about}</div>
        </div>

        <div className={styles.editButton}>
          {selected && <button onClick={() => handleEdit(true)}> Edit </button>}
        </div>
      </div>
    </>
  );
};
