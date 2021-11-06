import AsyncStorage from '@react-native-community/async-storage';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {AuthResponse, IAuthData, IContext} from '../interfaces/interfaces';
import HomeNavigation from '../navigation/HomeNavigation';
import LoginNavigation from '../navigation/LoginNavigation';
import {authOrRegister} from '../api/auth.api';
import {connect} from 'react-redux';
import {LOAD_USER, TARGET_USERS} from '../redux/types';
import {getTargetUsers, getUserInfoApi} from '../api/user.api';
import {openActiveUsersConnection, openChatConnection} from '../api/websocket';
import store from '../redux/store';
const initialValue = {} as IContext;
export const Context = createContext(initialValue);

const AuthContext = (props: any) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    checkAuth();
  }, []);

  const context: IContext = {
    async signIn(data: IAuthData) {
      const response: AuthResponse = await authOrRegister(data);
      AsyncStorage.setItem('jwt', response.user.jwt);
      props.loadUser({id: response.user.id, nickname: response.user.nickname});
      checkAuth();
    },

    signOut() {
      AsyncStorage.clear();
      props.logOut();
      setIsSignedIn(false);
    },
  };

  const checkAuth = async () => {
    console.log('Checking User')
    const jwt = await AsyncStorage.getItem('jwt');
    if (jwt) {
      getUserInfoApi()
        .then(r => {
          props.loadUser({id: r.id, nickname: r.nickname});
          setIsSignedIn(true);
          openChatConnection();
          // openActiveUsersConnection();
          getTargetUsers()
            .then(r => {
              props.loadTargets(r);
            })
            .catch(e => console.log(e));
        })
        .catch(err => {
          AsyncStorage.removeItem('jwt');
          console.log(err);
        });
    }
  };

  return (
    <Context.Provider value={context}>
      {isSignedIn ? (
        <>
          <HomeNavigation />
        </>
      ) : (
        <>
          <LoginNavigation />
        </>
      )}
    </Context.Provider>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
    target: state.target,
    targetUsers: state.targetUsers,
  };
};

const mapToChooseTarget = (dispatch: any) => ({
  loadUser: (user: any) => dispatch({type: LOAD_USER, payload: user}),
  logOut: () => dispatch({type: 'LOG_OUT'}),
  loadTargets: (targets: any[]) =>
    dispatch({type: TARGET_USERS, payload: targets}),
});

export default connect(mapStateToProps, mapToChooseTarget)(AuthContext);
