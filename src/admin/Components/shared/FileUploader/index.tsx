import React from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  onFileAccepted: (files: File[]) => void; // Callback when files are accepted
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileAccepted }) => {
  // Dropzone setup with accepted file types
  const { getRootProps, getInputProps } = useDropzone({
    // accept: ".pdf, .doc, .docx", // Only accept PDF and DOC files
    onDrop: (acceptedFiles) => {
      onFileAccepted(acceptedFiles); // Handle the accepted files
    },
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed gray",
        padding: "20px",
        width: "300px",
        textAlign: "center",
      }}
    >
      <input {...getInputProps()} />
      <p>Drag & drop PDF or DOC files here, or click to select files</p>
    </div>
  );
};

export default FileUploader;
