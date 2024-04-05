/**
 * The above functions use CryptoJS library to encrypt and decrypt text using AES algorithm with a
 * specified secret key.
 * @param text - The `text` parameter in the `Encrypt` and `Decrypt` functions represents the data that
 * you want to encrypt or decrypt using the AES encryption algorithm. This data can be a string, such
 * as a message, a password, or any other sensitive information that you want to protect.
 * @returns The `Encrypt` function returns the encrypted text as a string, while the `Decrypt` function
 * returns the decrypted text as a string.
 */
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
