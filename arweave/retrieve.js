const fs = require('fs');
const Arweave = require('arweave/node');
const arweave = Arweave.init({
  host: 'arweave.net',
  protocol: 'https',
  port: 443,
});

async function downloadFromArweave(transactionId) {
  const data = await arweave.transactions.getData(transactionId, {decode: true});
  fs.writeFileSync('downloaded_file.txt', data);
}

// Usage:
downloadFromArweave('5UY559kcMkn8QL0ahoMClWrS69C9IRsg9enlGsOoQFI')
  .then(() => {
    console.log('Data downloaded successfully');
  })
  .catch(error => {
    console.error(error);
  });
