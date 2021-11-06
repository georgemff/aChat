import AsyncStorage from '@react-native-community/async-storage';
import {NewMessage} from '../interfaces/interfaces';

const BASE_URL = 'http://192.168.56.1:8080/';

export const getMessages = (targetId: string): Promise<any[]> => {
  const url = BASE_URL + `target/${targetId}`;
  return new Promise(async (resolve, reject) => {
    try {
      const jwt: string = (await AsyncStorage.getItem('jwt')) || '';
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': jwt,
        },
      });

      let responseJson = await response.json();
      resolve(responseJson);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

export const sendMessage = (body: NewMessage) => {
  const url = BASE_URL + 'send-message';
  return new Promise(async (resolve, reject) => {
    try {
      const jwt: string = (await AsyncStorage.getItem('jwt')) || '';
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': jwt,
        },
        body: JSON.stringify(body),
      });

      let responseJson = response.json();
      resolve(responseJson);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};
