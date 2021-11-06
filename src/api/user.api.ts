import AsyncStorage from '@react-native-community/async-storage';
import {IUserStore} from '../interfaces/interfaces';

const BASE_URL = 'http://192.168.56.1:8080/';

export const getUserInfoApi = (): Promise<IUserStore> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = BASE_URL + 'user-info';
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

export const getTargetUsers = () => {
  return new Promise(async(resolve, reject) => {
    try {
      const url = BASE_URL + 'all-messages-targets';
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
      reject(e)
    }
  });
};
