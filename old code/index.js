
// first user uploads file from UI and now we upload to arweave and encrypt or decerypt it, we return a email to both users and also where to retrive the file
// UI params
const file = 'boys.jpg'
const password = '1234'
const send_to_email = 'lj@communitylabs.com'
const send_from_email = 'lorimerjenkins1@gmail.com'
const public_private = 'private'


// backend API
// encrypt file
// import { encrypt } from './encryption/encrypt.js'
// const encrypted_file = await encrypt(file, password)
// // upload to arweave
// import { upload } from './arweave/upload.js'
// const transaction_id = await upload(encrypted_file)


// // front end retrieval
// // download from arweave
// import { download } from './arweave/download.js'
// await download(transaction_id)
// // decrypt downloaded file
import { decrypt } from './encryption/decrypt.js'
await decrypt(password)


