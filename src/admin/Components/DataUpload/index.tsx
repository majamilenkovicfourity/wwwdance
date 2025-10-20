import React, { useEffect, useState } from 'react';
import AddEvent from '../shared/FileUploader/AddEvent';
import { EventData, Month } from '@utils/datatype';
import styles from './styles.module.scss';
import { getEventsSubase } from '../../../service/supabase/events';
import clsx from 'clsx';

const DataUpload: React.FC = () => {
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
  const testData: EventData = {
    id: '',
    about: '',
    date: {
      days: '',
      month: Month.December,
      year: 0,
    },
    address: '',
    location: '',
    image: '',
    name: '',
    isPdfUploaded: false,
  };

  const [selectedEvent, setSelectedEvent] = useState<EventData>(testData);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  // console.log("Competitions: ", competitions);

  const onCancelClick = () => {
    setIsOpen(false);
  };

  const handleSelectEvent = (id: string) => {
    const findEvent = competitions.find((competition) => competition.id === id);
    console.log('FIND EVENT: ', findEvent);
    if (findEvent) {
      setSelectedEvent(findEvent as EventData);
    }
  };

  const handleAddEvent = () => {
    setIsOpen(true);
  };

  const handlePing = async () => {
    try {
      const res = await fetch('http://127.0.0.1:3000/ping');
      const data = await res.json();
      setResponse(data.message); // This will be 'Pong'
    } catch (error) {
      console.error('Error pinging server:', error);
    }
  };

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileAccepted = (files: File[]) => {
    // setUploadedFiles(files);
    handlePing();
    console.log('Accepted files:', files);
  };

  return (
    <>
      <div className={styles.dataContainer}>
        <div className={styles.title}>
          <p> Event Database </p>
        </div>
        <div className={styles.addEvent}>
          <button onClick={handleAddEvent}> + Add Event </button>
        </div>

        <div className={styles.tableWrapper}>
          <table>
            <thead className={styles.header}>
              <th> Num. </th>
              <th> Name </th>
              <th> Location </th>
              <th> Date </th>
              <th> About </th>
              <th> PDF </th>
            </thead>
            <tbody>
              {(competitions as EventData[]).map((competition, index) => {
                return (
                  <tr
                    key={competition.id}
                    className={clsx(styles.rowWrapper, [
                      selectedEvent.id === competition.id
                        ? styles.selected
                        : undefined,
                    ])}
                    onClick={() => handleSelectEvent(competition.id as string)}
                  >
                    <td> {index + 1}. </td>
                    <td> {competition.name}</td>
                    <td>
                      {competition.address}, {competition.location}
                    </td>
                    <td>
                      {competition.date.days} {competition.date.month}
                      {competition.date.year}
                    </td>
                    <td> {competition.about}</td>
                    {/* <td>
                      {competition.pdfUploaded ? (
                        <CheckTwoToneIcon color='success' />
                      ) : (
                        <ClearIcon color='error' />
                      )}
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* <FileUploader onFileAccepted={handleFileAccepted} />
      <div style={{ marginTop: "20px" }}>
      <h3>Uploaded Files:</h3>
      <ul>
      {uploadedFiles.map((file, index) => (
        <li key={index}>
        {file.name} - {file.size} bytes
        </li>
        ))}
        </ul>
        </div>
        <button onClick={handlePing} className={styles.buttonUpload}>
        {" "}
        TEST{" "}
        </button> */}
          {selectedEvent.id !== '' && (
            <div className={styles.buttonWrapper}>
              <button> Edit </button>
              <button> Delete </button>
              <button> Upload PDF</button>
            </div>
          )}
        </div>
      </div>

      <AddEvent isOpen={isOpen} onCancelClick={() => onCancelClick()} />
    </>
  );
};

export default DataUpload;
