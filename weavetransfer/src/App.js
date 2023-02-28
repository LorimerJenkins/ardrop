import React, { useEffect, useState } from "react";
import UploadFile from "./uploadFile.js";
import backgroundImage from "./images/arbackground.png";
import loading_gif from './images/loading.gif'
import share_link from './images/share_link.png'

const MALE = 'MALE'
const FEMALE = 'FEMALE'

function App() {


  const path = window.location.pathname.substring(1)
  console.log(path)
  if (path != '') {
    
    window.open(`https://arweave.net/${path}`);
  }



  const [visible, setVisible] = useState(null)
  const isMale = visible === MALE
  const isFemale = visible === FEMALE

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const [loading, setLoading] = useState(false);

  const [transaction_id, setTransactionId] = useState("");

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

    setLoading(true); // Set loading to true when the upload button is clicked

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
          'file_name': file_name,
          'file_type': file_type
        },
      })
        .then((response) => response.text())
        .then((responseText) => {
          console.log(responseText);
          setLoading(false); // Set loading back to false once the response is received
          setTransactionId(JSON.parse(responseText).transactionId); // Set the transaction ID state value
          setFileName(""); // Clear the file name
          setFile(null); // Clear the file object
        })
        .catch((error) => {
          console.error(error);
          setLoading(false); // Set loading back to false if there is an error
        });
    };

    reader.readAsText(file);
  }

  const downloadLink = transaction_id ? `/${transaction_id}` : '';

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
                <form onSubmit={handleSubmit}>
                {loading ? (
                  <div className="spinner-container">
                      <p className="spinner-text">Uploading</p>
                      <img className="spinner_gif" src={loading_gif} />
                  </div>
                ) : (
                  <>
                    <UploadFile onChange={handleFileUpload} fileName={fileName} />

                    {transaction_id && (
                <div className="download-link">
                  <p className="success-text">Success: </p>
                  <a className="download-link-a" target='_blank' href={`/${transaction_id}`}>
                    <img src={share_link} className='share-icon' />
                    <p className="download-p">weavetransfer.com/{transaction_id}</p>
                  </a>
              </div>
              )}

              <button className="transfer" type="submit">Upload</button>
            </>
          )}
          </form>
        </div>
        )}
        {
          isFemale && (
            <div className="download-box">
              <input className="download-input" 
                placeholder="Transaction ID: "
                value={transaction_id}
                onChange={(event) => setTransactionId(event.target.value)}
              ></input>
              <a href={downloadLink} className="download-button" target="_blank" rel="noreferrer">Download</a>
            </div>
          )
        }
      </div>
    </div>
  </div>
);
}

export default App;