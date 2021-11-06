import store from '../redux/store';
import { NEW_MESSAGE } from '../redux/types';

const BASE_URL = '192.168.56.1:8080';

export const openChatConnection = () => {
  console.log('Open Chat')
  const echoSocketUrl = `ws://${BASE_URL}/get-new-message/`;
  const socket = new WebSocket(echoSocketUrl);

  socket.onopen = () => {
    const {user} = store.getState();
    socket.send(JSON.stringify({id: user.id}));
  };

  socket.onmessage = e => {
    try {
      const {user, target} = store.getState();
      const data = JSON.parse(e.data);
      const targetId = data.sender === target ? data.target : data.sender;
      if (target) {
        console.log("NewMessage: ", data)
        store.dispatch({type: NEW_MESSAGE, payload: data})
        // loadMessages(data);
        if (!data.seenByTarget && data.target === user.id) {
          // markMessagesAsSeen();
        }
      } else {
        // addRedCircleToElement(target);
      }
      return false;
    } catch (e) {
      console.error(e);
    }
  };
  socket.onerror = e => console.log(e);

  socket.onclose = e => {
    console.log('Closed!', e, e.message);
  };
  // addSocketToStore(socket);
};

export const openActiveUsersConnection = () => {
  const echoSocketUrl = `ws://${BASE_URL}/get-active-users/`;

  const socket = new WebSocket(echoSocketUrl);

  socket.onopen = () => {
    console.log('Connected To Active Users!');
    const {user} = store.getState();
    socket.send(JSON.stringify({id: user.id}));
    // showActiveUsers();
  };

  socket.onerror = e => {
    console.log(e);
  };

  socket.onmessage = () => {
    console.log('There Are Some New Users!^^');
    // showActiveUsers();
  };
  // addSocketToStore(socket);
}
