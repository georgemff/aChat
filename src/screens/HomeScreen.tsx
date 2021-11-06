import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Button, FlatList} from 'react-native';
import {connect, useStore} from 'react-redux';

import {CHOOSE_TARGET, TARGET_USERS} from '../redux/types';
import store from '../redux/store';
import User from '../components/User';

const HomeScreen = (props: any) => {
  const navigateToChat = () => {
    props.navigation.navigate('Chat');
  };

  return (
    <View style={styles.main}>
      <FlatList
        data={store.getState().targetUsers}
        renderItem={item => (
          <User
            userItem={item.item}
            navigateToChat={navigateToChat}
            chooseTarget={props.chooseTarget}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
});

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
    target: state.target,
    targetUsers: state.targetUsers,
  };
};

const mapToChooseTarget = (dispatch: any) => ({
  chooseTarget: (targetId: string) =>
    dispatch({type: CHOOSE_TARGET, payload: targetId}),
  loadTargets: (targets: any[]) =>
    dispatch({type: TARGET_USERS, payload: targets}),
});

export default connect(mapStateToProps, mapToChooseTarget)(HomeScreen);
