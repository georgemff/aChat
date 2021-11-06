import React from 'react';
import {
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  Text,
  StyleSheet,
} from 'react-native';

const User = ({userItem, chooseTarget, navigateToChat}: any) => {
  return (
    <TouchableNativeFeedback
      onPress={() => {
        chooseTarget(userItem.id);
        navigateToChat();
      }}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.firstLetter}>{userItem.nickname[0]}</Text>
          </View>
        </View>
        <View style={styles.metaContainer}>
          <Text style={styles.nickname}>{userItem.nickname}</Text>
        </View>
        <View></View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstLetter: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: 22,
    textTransform: 'uppercase',
  },
  metaContainer: {
    flex: 1,
    height: '100%',
    paddingLeft: 5,
    paddingTop: 10,
  },
  nickname: {
    fontSize: 16,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
});

export default User;
