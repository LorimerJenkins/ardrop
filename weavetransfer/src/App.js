import React, { useEffect, useState } from "react";
import UploadFile from "./uploadFile.js";
import backgroundImage from "./images/arbackground.png";
import loading_gif from './images/loading.gif'
import share_link from './images/share_link.png'

const MALE = 'MALE'
const FEMALE = 'FEMALE'

function App() {


  const path = window.location.pathname.substring(1)
  if (path !== '') {
    window.open(`https://arweave.net/${path}`);
    console.log('open')
  }



  const [visible, setVisible] = useState(null)
  const isMale = visible === MALE
  const isFemale = visible === FEMALE

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const [loading, setLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState('');

  const [transaction_id, setTransactionId] = useState("");

  function handleFileUpload(event) {
    const file = event.target.files[0];
    setFile(file);
    setFileName(file.name);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!file) {
      alert("No file selected to upload");
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
          const response_json = JSON.parse(responseText)
          setLoading(false); // Set loading back to false once the response is received
          setTransactionId(response_json.transactionId); // Set the transaction ID state value
          setFileName(""); // Clear the file name
          setFile(null); // Clear the file object
          if (response_json.success == true) {
            setRequestStatus('success');
          } else {setRequestStatus('failed');}
        })
        .catch((error) => {
          console.error(error);
          setLoading(false); // Set loading back to false if there is an error
          setRequestStatus('failed'); // Set the request status to failed
        });
    };

    reader.readAsText(file);
  }

  const downloadLink = transaction_id ? `https://arweave.net/${transaction_id}` : '';

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

                    {transaction_id && requestStatus === 'success' && (
                <div className="download-link">
                  <p className="success-text">Success: </p>
                  <a className="download-link-a" target='_blank' href={`https://arweave.net/${transaction_id}`}>
                    <img src={share_link} className='share-icon' />
                    <p className="download-p">weavetransfer.com/{transaction_id}</p>
                  </a>
              </div>
              )}
              
              {requestStatus === 'failed' && (
                      <p className="error-text">Failed to upload!</p>
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