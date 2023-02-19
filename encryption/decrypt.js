// decrypt file

const fs = require('fs');
const crypto = require('crypto');


// Function to decrypt a JPEG image with a password using AES algorithm
function decrypt(inputFile, outputFile, password) {
  // Read the encrypted file data
  const inputBuffer = fs.readFileSync('encryption/encrypt_output/' + inputFile + '.enc');

  // Get the initialization vector (IV) from the beginning of the file
  const iv = inputBuffer.slice(0, 16);

  // Derive a key from the password using PBKDF2 algorithm with 10000 iterations and 32 bytes length
  const key = crypto.pbkdf2Sync(password, iv, 10000, 32, 'sha256');

  // Create a Decipher object with AES-256-CBC algorithm and the derived key and IV
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  // Decrypt the file data with the Decipher object
  const decryptedData = Buffer.concat([decipher.update(inputBuffer.slice(16)), decipher.final()]);

  // Write the decrypted data to the output file
  fs.writeFileSync('encryption/decrypt_output/' + outputFile, decryptedData);
}




decrypt('boys', 'boys.jpg', '1234')