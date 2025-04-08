import { EventData, Month } from "../../../../../utils/datatype";
import { Modal } from "../../../../../components/shared/Modal";
import ImageUploader from "../../ImageUpload";
import styles from "./styles.module.scss";
import { useState } from "react";

type AddEventProps = {
  isOpen: boolean;
  onCancelClick: () => void;
};

const AddEvent: React.FC<AddEventProps> = ({ isOpen, onCancelClick }) => {
  const [testData, setTestData] = useState<EventData>({
    about: "",
    date: {
      days: "",
      month: Month.January,
      year: 0,
    },
    address: "",
    city: "",
    name: "",
    pdfUploaded: false,
  });

  // Removed duplicate handleOnSave declaration

  const handleOnChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    console.log("EVENT: ", event);
    setTestData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };
  const handleOnChangeNestedInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    nestedField: keyof EventData["date"]
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
    console.log("TEST DATA: ", testData);

    const formData = new FormData();
    formData.append("name", testData.name);
    formData.append("about", testData.about);
    formData.append("address", testData.address);
    formData.append("city", testData.city);
    formData.append("date", JSON.stringify(testData.date)); // You might need to serialize date if necessary
    formData.append("pdfUploaded", String(false));

    if (file) {
      formData.append("image", file); // Append the image file
    }

    // Make the API call to upload the data
    try {
      const response = await fetch("http://127.0.0.1:3000/addEvent", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("File uploaded successfully:", result);
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onCancelClick={onCancelClick}>
      <div>
        <div>
          <div> Name: </div>
          <div>
            <input
              type="text"
              placeholder="name"
              value={testData.name}
              onChange={(event) => handleOnChangeInput(event, "name")}
            />
          </div>
        </div>
        <div>
          <div> Address: </div>
          <div>
            <input
              type="text"
              placeholder="address"
              onChange={(event) => handleOnChangeInput(event, "address")}
              value={testData.address}
            />
          </div>
        </div>
        <div>
          <div> City: </div>
          <div>
            <input
              type="text"
              value={testData.city}
              onChange={(event) => handleOnChangeInput(event, "city")}
            />
          </div>
        </div>
        <div>
          <div> Date: </div>
          <div>
            <input
              type="text"
              value={testData.date.days}
              onChange={(event) => handleOnChangeNestedInput(event, "days")}
            />
            <select value={testData.date.month}>
              {Object.values(Month).map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <input
              type="number"
              onChange={(event) => handleOnChangeNestedInput(event, "year")}
            />
          </div>
        </div>
        <div>
          <div> About: </div>
          <div>
            <textarea
              value={testData.about}
              onChange={(event) => handleOnChangeInput(event, "about")}
            />
          </div>
        </div>
        <div>
          <ImageUploader onImageUpload={handleImageUpload} />
        </div>
        <div className={styles.buttonWrapper}>
          <button onClick={handleOnSave}> Save </button>
          <button> Cancel </button>
        </div>
      </div>
    </Modal>
  );
};
export default AddEvent;
