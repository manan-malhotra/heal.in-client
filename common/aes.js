import CryptoJS from "react-native-crypto-js";

const Encrypt = (text) => {
  const key = process.env.SECRET_KEY;
  const encrypted = CryptoJS.AES.encrypt(text, key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

const Decrypt = (text) => {
  const key = process.env.SECRET_KEY;
  const bytes = CryptoJS.AES.decrypt(text, key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return bytes.toString(CryptoJS.enc.Utf8);
};
export { Encrypt, Decrypt };
