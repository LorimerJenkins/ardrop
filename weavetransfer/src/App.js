import UploadFile from './uploadFile.js'
import backgroundImage from './images/arbackground.png'
import google from './images/google.png'
import file from './images/file.png'

// // first user uploads file from UI and now we upload to arweave and encrypt or decerypt it, we return a email to both users and also where to retrive the file
// // UI params
// const file = 'boys.jpg'
// const password = '1234'
// const send_to_email = 'lj@communitylabs.com'
// const send_from_email = 'lorimerjenkins1@gmail.com'
// const public_private = 'private'


// // backend API
// // encrypt file
// // import { encrypt } from './encryption/encrypt.js'
// // const encrypted_file = await encrypt(file, password)
// // // upload to arweave
// // import { upload } from './arweave/upload.js'
// // const transaction_id = await upload(encrypted_file)


// // // front end retrieval
// // // download from arweave
// // import { download } from './arweave/download.js'
// // await download(transaction_id)
// // // decrypt downloaded file
// import { decrypt } from './encryption/decrypt.js'
// await decrypt(password)



function App() {
  return (
    <div className="App"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      height: '100vh',
    }}
  >
      <div className='transfer-container'>
        <span className='logo-container'>
          <h1 className='title'>Weave Transfer</h1>
          <img className='file-logo ' src={file}/>
        </span>
        <p className='description'>A permanent decentralized encrypted file transfer protocol, based on the Arweave permaweb using the Authy walletless protocol.</p>
        <img src={google} className='google' />
        <input className='text-inputs' placeholder='Email to (leave blank for transfer link)'></input>
        <input className='text-inputs' placeholder='Encrypt password (leave blank for public file)'></input>
        <input className='text-inputs' placeholder='Message (optional)'></input>
        <UploadFile />
        <button className='transfer'>Transfer</button>
      </div>
    </div>
  );
}

export default App;

