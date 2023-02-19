const fs = require('fs');
const Arweave = require('arweave/node');
const arweave = Arweave.init({
  host: 'arweave.net',
  protocol: 'https',
  port: 443,
});

// Function to upload an encrypted file to Arweave
async function uploadToArweave(file_name) {
  // Read the encrypted file data
  const data = fs.readFileSync('../encryption/encrypt_output/' + file_name);

  // Read the Arweave wallet file
  const wallet = JSON.parse(fs.readFileSync('wallet.json'));

  // Create a Transaction object with the file data and metadata
  const transaction = await arweave.createTransaction({ data }, wallet);

  // Set the transaction tags with the metadata
  transaction.addTag('app', 'ArDrop'),
  transaction.addTag('file_name', 'text.txt'),
  transaction.addTag('contentType', 'text/plain')

  // Sign the transaction with the wallet
  await arweave.transactions.sign(transaction, wallet);

  // Broadcast the transaction to the network
  const response = await arweave.transactions.post(transaction);

  console.log(`Transaction ID: ${transaction.id}`);
  console.log(`Arweave response: ${response.status} ${response.statusText}`);
  console.log(transaction)
}


uploadToArweave('boys.txt')
