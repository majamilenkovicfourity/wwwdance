import { useState } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

interface ImageUploaderProps {
  onImageUpload: (file: File) => void; // Change to handle the file upload
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file: File | null) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only .jpg and .png images are allowed.");
      return;
    }

    const validExtensions = ["image/jpeg", "image/png"];
    if (!validExtensions.includes(file.type)) {
      setError("Invalid file type. Please upload a .jpg or .png file.");
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const imageSrc = reader.result as string;
      setImage(imageSrc); // Update the local state
      onImageUpload(file); // Call the parent function to upload the file
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className={styles.imageUploader}>
      {/* Drag & Drop Area */}
      <div
        className={clsx(styles.dropArea, image ? styles.hasImage : undefined)}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {image ? (
          <img src={image} alt="Uploaded" className={styles.preview} />
        ) : (
          <p>Drag & drop an image or click to upload</p>
        )}
      </div>

      {/* File Input */}
      <input
        type="file"
        accept=".jpg, .png"
        onChange={handleFileInput}
        id="fileInput"
        hidden
      />
      <label htmlFor="fileInput" className={styles.uploadBtn}>
        Select Image
      </label>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ImageUploader;
