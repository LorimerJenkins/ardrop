import { AES, enc } from "crypto-js";

const encryptDecrypt = (data, password, action) => {
  if (action === "encrypt") {
    return AES.encrypt(data, password).toString();
  } else if (action === "decrypt") {
    return AES.decrypt(data, password).toString(enc.Utf8);
  }
};


console.log(encryptDecrypt('lorimer', 'password', 'encrypt'))