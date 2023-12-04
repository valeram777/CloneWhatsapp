
import { box, randomBytes, setPRNG } from 'tweetnacl';
import { LogBox } from "react-native"
import { decode as decodeUTF8, encode as encodeUTF8 } from "@stablelib/utf8";
import {decode as decodeBase64,encode as encodeBase64} from "@stablelib/base64";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Random from 'expo-random';
import * as Crypto from 'expo-crypto';

export const PRIVATE_KEY = "PRIVATE_KEY";
LogBox.ignoreAllLogs(true)
setPRNG((x, n) => {
  const randomBytes = Crypto.getRandomBytes(n);
  for (let i = 0; i < n; i++) {
    x[i] = randomBytes[i];
  }
});
//console.log(Random.getRandomBytes(box.nonceLength))
const newNonce = () => Crypto.getRandomBytes(box.nonceLength);

//Генерирует 2 ключа для юзера который зарегился в приложении
export const generateKeyPair = () => box.keyPair();

export const encrypt = (secretOrSharedKey, json, key) => {
  const nonce = newNonce();
  const messageUint8 = encodeUTF8(JSON.stringify(json));
  const encrypted = key
    ? box(messageUint8, nonce, key, secretOrSharedKey)
    : box.after(messageUint8, nonce, secretOrSharedKey);

  const fullMessage = new Uint8Array(nonce.length + encrypted.length);
  fullMessage.set(nonce);
  fullMessage.set(encrypted, nonce.length);

  const base64FullMessage = encodeBase64(fullMessage);
  return base64FullMessage;
};

export const decrypt = (secretOrSharedKey, messageWithNonce, key) => {
  const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce);
  const nonce = messageWithNonceAsUint8Array.slice(0, box.nonceLength);
  const message = messageWithNonceAsUint8Array.slice(
    box.nonceLength,
    messageWithNonce.length
  );

  const decrypted = key
    ? box.open(message, nonce, key, secretOrSharedKey)
    : box.open.after(message, nonce, secretOrSharedKey);

  if (!decrypted) {
    throw new Error("Could not decrypt message");
  }

  const base64DecryptedMessage = decodeUTF8(decrypted);
  return JSON.parse(base64DecryptedMessage);
};

export const stringToUint8Array = (content) =>
  Uint8Array.from(content.split(",").map((str) => parseInt(str)));

export const getMySecretKey = async () => {
  const keyString = await AsyncStorage.getItem("secretKey");
  if (!keyString) {
    Alert.alert(
      "You haven't set your keypair yet",
      "Go to settings, and generate a new keypair",
      [
        {
          text: "Open setting",
          onPress: () => navigation.navigate("Settings"),
        },
      ]
    );
    return;
  }

  return stringToUint8Array(keyString);
};
export const getMyPublicKey = async () => {
  const keyString = await AsyncStorage.getItem("secretKey");
  if (!keyString) {
    Alert.alert(
      "You haven't set your keypair yet",
      "Go to settings, and generate a new keypair",
      [
        {
          text: "Open setting",
          onPress: () => navigation.navigate("Settings"),
        },
      ]
    );
    return;
  }

  return stringToUint8Array(keyString);
};

export const setStringValue = async (value) => {
  try {
    await AsyncStorage.setItem('key', value)
  } catch(e) {
    // save error
  }

  return
}
