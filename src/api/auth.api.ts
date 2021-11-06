import { AuthResponse, IAuthData } from "../interfaces/interfaces";

const BASE_URL = 'http://192.168.56.1:8080/';

export const authOrRegister = (body: IAuthData): Promise<AuthResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = BASE_URL + 'login-or-register';
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      });

      let responseJson: AuthResponse = await response.json();

      resolve(responseJson);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};
