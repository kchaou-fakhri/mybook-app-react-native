import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {Modal} from 'react-native-paper';
import {LinesLoader} from 'react-native-indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../utils/colors';
import Rest_API from '../../config/ConfigWs';
import styles from './assets/LoginStyles';

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
    var allIsTrue = true;

    if (username != '') {
      console.log(checkSymboleUsername());

      if (checkSymboleUsername()) {
        setCheckUsername(false);
        setCheckPassword(false);
      } else {
        setTextErrorUsername('Username must contain only letters and numbers ');
        setCheckUsername(true);
        allIsTrue = false;
      }
    } else {
      setTextErrorUsername('Username is requierd');
      setCheckUsername(true);
      allIsTrue = false;
    }
    if (password == '') {
      setTextErrorPassword('Password is required');
      setCheckPassword(true);
      allIsTrue = false;
    }
    if (password != '') {
      if (password.length < 8) {
        setTextErrorPassword('Password must be at least 8 characters');
        setCheckPassword(true);
        allIsTrue = false;
      } else {
        setCheckPassword(false);
      }
    }

    if (allIsTrue == true) {
      setVisibleLoading(true);
      callApi();
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
      Rest_API.BaseUrl + 'authenticate',

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
      <View style={{flex: 1}}>
        <View style={styles.titleContainer}>
          <View
            style={{
              width: 400,
              height: 400,
              borderRadius: 400,
              top: -150,
              left: -130,

              position: 'absolute',
              backgroundColor: colors.primary_400,
            }}></View>
          <View
            style={{
              width: 300,
              height: 300,
              borderRadius: 300,
              top: -150,
              left: -150,

              position: 'absolute',
              backgroundColor: colors.primary_200,
            }}></View>

          <Text style={styles.title}>Sign in to your</Text>
          <Text style={styles.title}>Account</Text>
        </View>
        <StatusBar barStyle={'dark-content'} translucent />
        <View style={{flex: 1}}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}>
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
                    {color: visibleLoading ? colors.secandry : colors.primary},
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
                <LinesLoader
                  barNumber={4}
                  barHeight={30}
                  color={colors.white}
                />
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
      </View>
    </SafeAreaView>
  );
}
