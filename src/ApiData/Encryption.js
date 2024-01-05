import { AES, enc } from "crypto-js";

export const encrypt = (key, value)=>{
    localStorage.setItem(key, (AES.encrypt(JSON.stringify(value),'SHIKSHAKPRO@2023ADMIN')).toString());  
}
export const decrypt = (key)=>{
    if (localStorage.getItem(key)) {
        const decrypted = AES.decrypt(localStorage.getItem(key), 'SHIKSHAKPRO@2023ADMIN');
        const decryptedObject = decrypted.toString(enc.Utf8);
        const decryptedData = JSON.parse(decryptedObject);
        return decryptedData;
      }else{
        return null;
      }
}