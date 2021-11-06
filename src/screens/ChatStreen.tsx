import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  BackHandler,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {getMessages, sendMessage} from '../api/chat.api';
import {NewMessage} from '../interfaces/interfaces';
import store from '../redux/store';
import {CHOOSE_TARGET} from '../redux/types';

const ChatScreen = (props: any) => {
  let ref: FlatList<any> | null = {} as FlatList<any>;
  const initialMessagesValue: any[] = [];
  const currentMessages = useRef(initialMessagesValue);
  const [messages, setMessages] = useState(initialMessagesValue);
  const [messageText, setMessageText] = useState('');
  const [inputHeight, setInputHeight] = useState(40);
  const flatListRef = useRef(ref)

  useEffect(() => {
    getMessages(props.target)
      .then((r: any[]) => {
        r.reverse();
        setMessages(r);
        currentMessages.current = r;
      })
      .catch(e => {
        console.log(e);
      });

    const sub = store.subscribe(() => {
      const {newMessage} = store.getState();
      let m = [newMessage, ...currentMessages.current];

      setMessages(m);
    });

    return () => {
      console.log('CleanUp');
      sub();
      store.dispatch({type: CHOOSE_TARGET, payload: ''});
    };
  }, []);

  const scrollToBottom = () => flatListRef.current?.scrollToEnd();


  BackHandler.addEventListener('hardwareBackPress', () => {
    console.log('Back');
    return true;
  });

  const sendNewMessage = () => {
    const body: NewMessage = {
      message: messageText,
      target: props.target,
    };
    setMessageText('');
    sendMessage(body)
      .then(r => console.log(r))
      .catch(e => console.log(e));
  };

  const leftRow = (item: any) => (
    <View style={[styles.messageRow, styles.row]}>
      <View style={[styles.messageAvatar, styles.mR]}>
        <Text style={styles.avatarText}>T</Text>
      </View>
      <View style={styles.message}>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
    </View>
  );

  const rightRow = (item: any) => (
    <View style={[styles.messageRow, styles.rowReverse]}>
      <View style={styles.message}>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
    </View>
  );

  const renderTextInput = () => (
    <View style={styles.textInput}>
      <TextInput
        style={[styles.input, {height: inputHeight}]}
        value={messageText}
        onChangeText={text => setMessageText(text)}
        onContentSizeChange={event => {
          inputChange(event);
        }}
        multiline={true}
      />
      <TouchableWithoutFeedback onPress={sendNewMessage}>
        <View style={styles.send}>
          <Icon name="send" color="#0084FF" size={22} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  const inputChange = (event: any) => {
    let currentHeight = event.nativeEvent.contentSize.height;
    currentHeight = currentHeight < 40 ? 40 : currentHeight;
    if (currentHeight <= 142) {
      setInputHeight(currentHeight);
    }
  };

  return (
    <View style={styles.main}>
      <View style={{flex: 1}}>
      <FlatList
        ref={flatListRef}
        data={messages}
        inverted={true}
        renderItem={item =>
          item.item.sender == props.target
            ? leftRow(item.item)
            : rightRow(item.item)
        }
        keyExtractor={item => item._id}
      />
      </View>
      <View style={{paddingTop: 5}}>
        {renderTextInput()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 5,
  },
  messageRow: {
    width: '100%',
    height: 40,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  messageAvatar: {
    width: 30,
    height: 30,
    backgroundColor: 'red',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mR: {marginRight: 10},
  mL: {marginLeft: 10},
  avatarText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  message: {
    backgroundColor: '#0084FF',
    minHeight: 30,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  messageText: {
    color: '#FFFFFF',
  },
  textInput: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    backgroundColor: '#3a3b3c',
    borderRadius: 20,
    paddingHorizontal: 15,
    color: '#FFFFFF',
  },
  send: {
    width: 30,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
    target: state.target,
  };
};

export default connect(mapStateToProps)(ChatScreen);
