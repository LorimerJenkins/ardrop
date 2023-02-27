import React, { useState } from "react";
import UploadFile from "./uploadFile.js";
import backgroundImage from "./images/arbackground.png";
import google from "./images/google.png";
import downloadFile from "./downloadFile.js";


const MALE = 'MALE'
const FEMALE = 'FEMALE'

function App() {

  const [visible, setVisible] = useState(null)
  const isMale = visible === MALE
  const isFemale = visible === FEMALE



  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  function handleFileUpload(event) {
    const file = event.target.files[0];
    setFile(file);
    setFileName(file.name);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!file) {
      console.log("No file selected");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const fileContents = reader.result;

      const payload = { contents: fileContents };
      const file_name = file.name;
      const file_type = file.type;

      fetch("https://auth-arweave-server.herokuapp.com/upload", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          file_name,
          file_type,
        },
      })
        .then((response) => response.text())
        .then((responseText) => {
          console.log(responseText);
          console.log('Refresh file and also now enable viewing on view block')
        })
        .catch((error) => {
          console.error(error);
        });
    };

    reader.readAsText(file);
  }


  // get download txn ID 
  const [transaction_id, setTxValue] = useState('');
  const handleTxChange = (event) => {
    setTxValue(event.target.value);
  }
  const downloadLink = `https://arweave.net/${transaction_id}/data`;



  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div className="transfer-container">
        <span className="logo-container">
          <h1 className="title">Weave Transfer</h1>
        </span>
        <p className="description">
          Permanent file transfer and storage using the Arweave permaweb and Authy walletless protocol.
        </p>

        <div className="toggle-option">
          <button className="upload" onClick={() => setVisible(MALE)}>Upload</button>
          <button className="download" onClick={() => setVisible(FEMALE)}>Download</button>
        </div>


        <div className="row">
          {
            isMale && (
              <div className="upload-box">
              {/* <img src={google} className="google" alt="Google logo" /> */}
              <form onSubmit={handleSubmit}>
                <UploadFile onChange={handleFileUpload} fileName={fileName} />
                <button className="transfer" type="submit">Upload</button>
              </form>
            </div>
            )
          }
          {
            isFemale && (
              <div className="download-box">
              <input className="download-input" 
              placeholder="Transaction ID: "
              value={transaction_id}
              onChange={handleTxChange}
              ></input>
              <a href={downloadLink} className="download-button" target="_blank">Download</a>
            </div>
            )
          }
      </div>
        
        

        


      </div>
    </div>
  );
}

export default App;
