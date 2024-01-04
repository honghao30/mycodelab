import CryptoJS from 'crypto-js';

// 암호화
export const encryptData = (data) => {
    const key = import.meta.env.VITE_SOME_KEY; 
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    return encrypted;
};

// 복호화
export const decryptData = (data) => {
    const key = import.meta.env.VITE_SOME_KEY; 
    const decrypted = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted); 
};

  
export default {
  encryptData,
  decryptData
};