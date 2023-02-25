import React, { useState } from "react";
import "./App.css";

export default function UploadFile() {
  const [file, setFile] = useState(null);

  function handleDragOver(event) {
    event.preventDefault();
  }


  function handleFileUpload(event) {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);

    const reader = new FileReader();

    reader.onload = () => {
      const fileContents = reader.result;
      



      const payload = { 'contents': fileContents };
      
      fetch('https://auth-arweave-server.herokuapp.com/upload', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }// add files names and shit here
      })
      .then(response => response.text())
      .then(responseText => {
        console.log(responseText);
      })
      .catch(error => {
        console.error(error);
      });
    };






    reader.readAsText(event.target.files[0]);
  }






  function handleDrop(event) {
    // event.preventDefault();
    // setFile(event.dataTransfer.files[0]);
    // console.log(event.target.files[0])
    // const file = event.target.files[0]
    // upload(file)
  }

  return (
    <div
      className="file-upload"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label htmlFor="file-input">
        <span className="upload-icon">&#128452;</span>
        <span className="upload-text">Choose a file or drag it here</span>
      </label>
      <input id="file-input" type="file" onChange={handleFileUpload} />
    </div>
  );
}
