import React, { useState } from "react";
import "./App.css";


export default function UploadFile() {
    const [file, setFile] = useState(null);
    function handleDragOver(event) {
        event.preventDefault();
    }
    
    async function encrypt(file, password) {
        // const iv = crypto.randomBytes(16);
        // const key = crypto.pbkdf2Sync(password, iv, 10000, 32, 'sha256');
        // const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        // const encryptedData = Buffer.concat([cipher.update(file), cipher.final()]);
        // const outputData = Buffer.concat([iv, encryptedData]);
        return file
    }
  
    
    async function uploadToServer(file) {
        // send to server which messages the other party and uploads it to permaweb
        const url = 'http://weavetransfer.pythonanywhere.com/file-upload';

        fetch(url, {
          method: 'POST',
          body: file
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          // Handle response data here
        })
        .catch(error => console.error(error));

        return file
    }


    function upload(file) {
        const password = document.getElementById('')
        const encrypted_file = encrypt(file, password)
        uploadToServer(encrypted_file)
    }


    function handleFileUpload(event) {
        setFile(event.target.files[0]);
        console.log(event.target.files[0])
        const file = event.target.files[0]
        upload(file)
    }

    function handleDrop(event) {
        event.preventDefault();
        setFile(event.dataTransfer.files[0]);
        console.log(event.target.files[0])
        const file = event.target.files[0]
        upload(file)
    }




  return (
    <div className="file-upload"
         onDragOver={handleDragOver}
         onDrop={handleDrop}>
      <label htmlFor="file-input">
        <span className="upload-icon">&#128452;</span>
        <span className="upload-text">Choose a file or drag it here</span>
      </label>
      <input id="file-input" type="file" onChange={handleFileUpload} />
    </div>
  );
}
