import React, { useEffect, useState } from "react";
import UploadFile from "./uploadFile.js";
import backgroundImage from "./images/arbackground.png";
import loading_gif from './images/loading.gif'


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
  const [requestStatus, setRequestStatus] = useState("");
  const [transaction_id, setTransactionId] = useState("");
  const [message, setMessage] = useState("")





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
  
    setLoading(true);
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("file_name", file.name);
    formData.append("file_type", file.type);
    formData.append("message", message);
  
    fetch('https://server.weavetransfer.com/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setTransactionId(data.transactionId);
        setFileName("");
        setFile(null);
        if (data.success === true) {
          setRequestStatus('success');
        } else {
          setRequestStatus('failed');
        }
      })
      .catch((error) => {
        console.error(error);
        setRequestStatus('failed');
        setLoading(false);
      });
  

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
          Permanent public on-chain storage file transfer system using the Arweave permaweb and Authy walletless protocol.
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

                    <input className="message-input" 
                    placeholder="Message (optional)" 
                    value={message} onChange={(event) => setMessage(event.target.value)} />

                    {transaction_id && requestStatus === 'success' && (
                      <div>
                          <div className="download-link">
                            <p className="success-text">File ID: </p>
                            <a className="download-link-a" target='_blank' href={`https://arweave.net/${transaction_id}`}>
                              <p className="download-p">weavetransfer.com/{transaction_id}</p>
                            </a>
                          </div>
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