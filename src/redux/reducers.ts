import {CHOOSE_TARGET, LOAD_USER, NEW_MESSAGE, TARGET_USERS} from './types';
import {IUserStore} from '../interfaces/interfaces';
import {useScrollToTop} from '@react-navigation/native';

interface IAction {
  type: string;
  payload: any;
}

const initialUserState: IUserStore = {
  id: '',
  nickname: '',
};

export const userReducer = (state = initialUserState, action: IAction) => {
  switch (action.type) {
    case LOAD_USER:
      return {...state, ...action.payload};
    default:
      return state;
  }
};

const initialTargetid: string = '';

export const targetReducer = (state = initialTargetid, action: IAction) => {
  switch (action.type) {
    case CHOOSE_TARGET:
      return action.payload;
    default:
      return state;
  }
};

const initialTargetUsers: IUserStore[] = [];
export const targetUsersReducer = (
  state = initialTargetUsers,
  action: IAction,
) => {
  switch (action.type) {
    case TARGET_USERS:
      return action.payload;
    default:
      return state;
  }
};

const initialNewMessage: any = {};
export const newMessageReducer = (
  state = initialNewMessage,
  action: IAction,
) => {
  switch (action.type) {
    case NEW_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};
