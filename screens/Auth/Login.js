import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  Pressable,
  Image,
  ImageBackground,
} from 'react-native';
import {Modal} from 'react-native-paper';
import {LinesLoader} from 'react-native-indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../utils/colors';
import Rest_API from "../../config/Rest_API";

export default function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');
  const [checkUsername, setCheckUsername] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [textErrorUsername, setTextErrorUsername] = useState('');
  const [textErrorPassword, setTextErrorPassword] = useState('');
  const [visible, setVisible] = React.useState(false);
  const [visibleLoading, setVisibleLoading] = React.useState(false);

  function handleChangeUserName(enteredText) {
    setUsername(enteredText);
  }
  function handleChangePassword(enteredText) {
    setpassword(enteredText);
  }

  function usernameTextError(ifError) {
    if (ifError) {
      return {
        marginLeft: 12,
        marginTop: -10,
        color: colors.red,
        fontSize: 12,
        display: 'flex',
      };
    } else {
      return {
        display: 'none',
      };
    }
  }

  function passwordTextError(ifError) {
    if (ifError) {
      return {
        marginLeft: 12,
        marginTop: -10,
        color: colors.red,
        fontSize: 12,
        display: 'flex',
      };
    } else {
      return {
        display: 'none',
      };
    }
  }

  function login() {
    if (username != '') {
      console.log(checkSymboleUsername());

      if (checkSymboleUsername()) {
        setVisibleLoading(true);
        setCheckUsername(false);
        setCheckPassword(false);

        callApi();
      } else {
        setTextErrorUsername('Username must contain only letters and numbers ');
        setCheckUsername(true);
      }
    } else {
      setTextErrorUsername('Username is requierd');
      setCheckUsername(true);
    }
    if (password == '') {
      setTextErrorPassword('Password is required');
      setCheckPassword(true);
    }
    if (password != '') {
      if (password.length < 8) {
        setTextErrorPassword('Password must be at least 8 characters');
        setCheckPassword(true);
      } else {
        setCheckPassword(false);
      }
    }

    // setCheckPassword(true)
    //   console.log(username)
    //    console.log(password)
  }

  function checkSymboleUsername() {
    const sym = [
      ' ',
      '+',
      '-',
      '*',
      '/',
      '.',
      '=',
      '}',
      ')',
      ']',
      ',',
      '@',
      '"',
      '`',
      '|',
      '[',
      "'",
      '{',
      '#',
      '~',
      '&',
      '²',
      ';',
      ':',
      '!',
      '%',
      '$',
      '£',
    ];
    var check = true;
    var index = 0;
    while (check && index < sym.length) {
      if (username.includes(sym[index])) {
        check = false;
      }

      index++;
    }

    return check;
  }

  async function callApi() {
    const response = await fetch(
      Rest_API.BaseUrl+"authenticate",

      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      },
    );

    if (response.status == 200) {
      setVisibleLoading(false);

      console.log('Token : ' + response.headers.get('authorization'));
      storeData(response.headers.get('authorization'));
      navigation.navigate('BottomNavigation');
    } else {
      setVisibleLoading(false);

      showAlert();
    }

    async function storeData(value) {
      try {
        await AsyncStorage.setItem('token', value);
      } catch (e) {
        // saving error
      }
    }
  }

  function showAlert() {
    setVisible(true);
  }

  return (
    <SafeAreaView style={styles.conatiner}>
      <ImageBackground
        style={[
          styles.conatiner,
          {justifyContent: 'center', width: '100%', height: '100%'},
        ]}
        source={require('../../assets/back.png')}>
        <StatusBar barStyle={'dark-content'} translucent />
        <View
          style={{
            flex: 1,

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.square}>
            <Text style={styles.textLogo}>My Book</Text>
          </View>
          <View>
            <Text style={styles.textWelecome}>Welcome to MyBook!</Text>
            <Text style={styles.textKeepYourMind}>Keep your mind</Text>
          </View>

          <View>
            <TextInput
              placeholder="username"
              onChangeText={handleChangeUserName}
              style={styles.input}
            />
            <Text style={usernameTextError(checkUsername)}>
              {textErrorUsername}
            </Text>
          </View>

          <View>
            <TextInput
              placeholder="Password"
              onChangeText={handleChangePassword}
              style={styles.input}
            />
            <Text style={passwordTextError(checkPassword)}>
              {textErrorPassword}
            </Text>
          </View>
          <View style={styles.touchableHighlight}>
            <TouchableHighlight style={styles.touchableHighlight}>
              <Text
                style={[
                  styles.loginBoutton,
                  {color: visibleLoading ? colors.primary : colors.white},
                ]}
                onPress={login}>
                Login
              </Text>
            </TouchableHighlight>

            <View
              style={{
                justifyContent: 'center',
                display: visibleLoading ? 'flex' : 'none',
                bottom: 10,
                alignItems: 'center',
              }}>
              <LinesLoader barNumber={4} barHeight={30} color={colors.white} />
            </View>

            <Text style={styles.forgotpassword}>Forgot Password?</Text>
          </View>
        </View>
        <View style={styles.containerGoToSinup}>
          <Text style={styles.textGoToSinup}>
            Don't have an account?{' '}
            <Text
              onPress={() => navigation.navigate('Register')}
              style={{color: colors.primary}}>
              Register!
            </Text>{' '}
          </Text>
        </View>

        <Modal animationType="slide" transparent={true} visible={visible}>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text onPress={() => setVisible(false)} style={styles.closeBtn}>
                  ✕
                </Text>
                <Text style={styles.modalText}>Oops !</Text>

                <Text style={styles.textStyle}>
                  username or password is incorrect
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
}

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderBottomRightRadius: 0,
    marginBottom: 10,
  },
  textLogo: {
    color: colors.white,
    // transform: [{ rotate: '180deg'}],
    fontSize: 20,
    fontFamily: 'Quicksand-Regular',
  },
  textWelecome: {
    color: colors.primary,
    // transform: [{ rotate: '180deg'}],
    fontSize: 20,

    color: colors.textColor,
    textAlign: 'center',
  },
  textKeepYourMind: {
    color: colors.primary,
    // transform: [{ rotate: '180deg'}],
    fontSize: 13,

    color: colors.textColor,
    textAlign: 'center',
    marginBottom: 40,
  },
  loginBoutton: {
    backgroundColor: colors.primary,
    color: colors.white,
    flex: 1,
    borderRadius: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  input: {
    height: 55,
    width: width - 50,
    margin: 12,
    borderWidth: 1.3,
    borderRadius: 5,
    padding: 10,

    borderColor: colors.gray,
  },
  touchableHighlight: {
    height: 50,
    width: width - 50,
    top: 30,
  },

  forgotpassword: {
    color: colors.primary,
    fontFamily: 'Quicksand-Bold',
    fontWeight: 'bold',
    fontSize: 14,
    top: 55,
    textAlign: 'center',
  },
  containerGoToSinup: {
    justifyContent: 'center',
    bottom: 20,
  },
  textGoToSinup: {
    fontFamily: 'Quicksand-Bold',
    fontWeight: 'bold',
    color: colors.gray,
    fontSize: 14,
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,

    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    textAlign: 'center',
    fontSize: 13,
  },
  modalText: {
    marginTop: -10,
    marginBottom: 15,
    textAlign: 'center',
    color: colors.textColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeBtn: {alignSelf: 'flex-end', fontSize: 20, color: colors.red, top: -10},
});
