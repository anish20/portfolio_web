import { AES, enc } from "crypto-js";

export const crypt = (salt, text) => {
  console.log("text", text);
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};

export const decrypt = (salt, encoded) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
};
export const encryptData = (name, data) => {
  const encrypted = AES.encrypt(
    JSON.stringify(data),
    process.env.SALT
  ).toString();
  localStorage.setItem(name, encrypted);
};
export const decryptData = (name) => {
  const encrypted = localStorage.getItem(name);
  console.log("encrypted in decryptdata", encrypted);
  if (encrypted) {
    const decrypted = AES.decrypt(encrypted, process.env.SALT).toString(
      enc.Utf8
    );
    return JSON.parse(decrypted);
  } else {
    return encrypted;
  }
};
