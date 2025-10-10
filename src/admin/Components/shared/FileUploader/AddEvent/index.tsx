import { EventData, Month } from '../../../../../utils/datatype';
import { Modal } from '../../../../../components/shared/Modal';
import ImageUploader from '../../ImageUpload';
import styles from './styles.module.scss';
import { ChangeEvent, useState } from 'react';
import ToasterMessage, { ToasterMessageProps } from '../../ToasterMessage';

type AddEventProps = {
  isOpen: boolean;
  onCancelClick: () => void;
};

const AddEvent: React.FC<AddEventProps> = ({ isOpen, onCancelClick }) => {
  const [toasterMessage, setToasterMessage] = useState<ToasterMessageProps>({
    message: '',
    type: 'success',
  });
  const [testData, setTestData] = useState<EventData>({
    about: '',
    date: {
      days: '',
      month: Month.January,
      year: 0,
    },
    address: '',
    city: '',
    name: '',
    isPdfUploaded: false,
  });

  // Removed duplicate handleOnSave declaration

  const handleOnChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setTestData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };
  const handleOnChangeNestedInput = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    nestedField: keyof EventData['date']
  ) => {
    setTestData((prev) => ({
      ...prev,
      date: {
        ...prev.date,
        [nestedField]: event.target.value, // Updating nested field
      },
    }));
  };

  const handleImageUpload = (file: File) => {
    setFile(file); // Update the file state with the uploaded image
  };

  const [file, setFile] = useState<File | null>(null); // To store the image file

  const handleOnSave = async () => {
    const formData = new FormData();
    formData.append('name', testData.name);
    formData.append('about', testData.about);
    formData.append('address', testData.address);
    formData.append('city', testData.city);
    formData.append('date', JSON.stringify(testData.date)); // You might need to serialize date if necessary
    formData.append('pdfUploaded', String(false));

    if (file) {
      formData.append('image', file); // Append the image file
    }

    // Make the API call to upload the data
    try {
      const response = await fetch('http://127.0.0.1:3000/addEvent', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log('File uploaded successfully:', result);

      if (result.error) {
        setToasterMessage({ message: result.error, type: 'error' });
        return;
      }

      setToasterMessage({
        message: 'Event successfully added!',
        type: 'success',
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onCancelClick={onCancelClick}>
        <div className={styles.addEventContainer}>
          <h1> New event </h1>
          <div className={styles.inputWrapper}>
            <div className={styles.inputsContainer}>
              <div>
                <div>
                  <p> Name </p>
                  <input
                    type='text'
                    value={testData.name}
                    onChange={(event) => handleOnChangeInput(event, 'name')}
                  />
                </div>
                <div>
                  <p> Address </p>

                  <input
                    type='text'
                    onChange={(event) => handleOnChangeInput(event, 'address')}
                    value={testData.address}
                  />
                </div>
                <div>
                  <p> City </p>

                  <input
                    type='text'
                    value={testData.location}
                    onChange={(event) => handleOnChangeInput(event, 'city')}
                  />
                </div>
              </div>

              <div className={styles.dateContainer}>
                <p> Date </p>
                <input
                  type='text'
                  value={testData.date.days}
                  onChange={(event) => handleOnChangeNestedInput(event, 'days')}
                />
                <p> Month </p>

                <select
                  value={testData.date.month}
                  onChange={(event) =>
                    handleOnChangeNestedInput(event, 'month')
                  }
                >
                  {Object.values(Month).map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>

                <p> Year </p>

                <input
                  type='number'
                  onChange={(event) => handleOnChangeNestedInput(event, 'year')}
                />
              </div>
            </div>
            <div className={styles.textAreaContainer}>
              <span> About </span>
              <textarea
                value={testData.about}
                onChange={(event) => handleOnChangeInput(event, 'about')}
              />
            </div>

            <div className={styles.imageUploadContainer}>
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>
          </div>

          <div className={styles.buttonWrapper}>
            <button onClick={async () => await handleOnSave()}> Save </button>
            <button> Cancel </button>
          </div>
        </div>
      </Modal>
      <ToasterMessage
        message={toasterMessage.message}
        type={toasterMessage.type}
      />
    </>
  );
};
export default AddEvent;
