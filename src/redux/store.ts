import {createStore, combineReducers} from 'redux';

import {userReducer, targetReducer, targetUsersReducer, newMessageReducer} from './reducers';

const reducer = combineReducers(
    {
        user: userReducer,
        target: targetReducer,
        targetUsers: targetUsersReducer,
        newMessage: newMessageReducer
    }
)


const rootReducer = (state: any, action: any) => {
  if (action.type === 'LOG_OUT') {
    state = {}
  }

  return reducer(state, action)
}

const store = createStore(rootReducer);

export default store;