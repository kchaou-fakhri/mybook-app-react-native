import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  StatusBar,
  ImageBackground,
  TouchableHighlight,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from 'react-native';

import colors from '../utils/colors';
import Rest_API from '../../config/ConfigWs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Modal} from 'react-native-paper';
import {LinesLoader} from 'react-native-indicator';
import styles from './assets/RegisterStyles';

export default function Register({navigation}) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');

  const [checkEmail, setCheckEmail] = useState(false);
  const [checkUsername, setCheckUsername] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);

  const [textErrorEmail, setTextErrorEmail] = useState('');
  const [textErrorUsername, setTextErrorUsername] = useState('');
  const [textErrorPassword, setTextErrorPassword] = useState('');
  const [visible, setVisible] = React.useState(false);
  const [isRegister, setIsRegister] = React.useState(false);
  const [visibleLoading, setVisibleLoading] = React.useState(false);

  function handleChangeUserName(enteredText) {
    setUsername(enteredText);
  }
  function handleChangePassword(enteredText) {
    setpassword(enteredText);
  }

  function handleChangeEmail(enteredText) {
    setEmail(enteredText);
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

  function emailTextError(ifError) {
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

  function register() {
    var verify = {
      username: false,
      email: false,
      password: false,
    };

    if (username != '') {
      if (checkSymboleUsername()) {
        setCheckUsername(false);
        verify.username = true;
      } else {
        setTextErrorUsername('Username must contain only letters and numbers ');
        setCheckUsername(true);
      }
    } else {
      setTextErrorUsername('Username is requierd');
      setCheckUsername(true);
    }

    if (password != '') {
      if (password.length < 8) {
        setTextErrorPassword('Password must be at least 8 characters');
        setCheckPassword(true);
      } else {
        setCheckPassword(false);
        verify.password = true;
      }
    } else {
      setTextErrorPassword('Password is required');
      setCheckPassword(true);
    }

    if (email != '') {
      if (!validateEmail()) {
        setTextErrorEmail('Invalid email');
        setCheckEmail(true);
      } else {
        setCheckEmail(false);
        verify.email = true;
      }
    } else {
      setTextErrorEmail('Email is required');
      setCheckEmail(true);
    }

    if (
      verify.email === true &&
      verify.username === true &&
      verify.password === true
    ) {
      setVisibleLoading(true);
      callApi();
    }
  }

  async function callApi() {
    const response = await fetch(
      Rest_API.BaseUrl + 'authenticate/register',

      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
        }),
      },
    );

    if (response.status == 200) {
      setVisibleLoading(false);

      setIsRegister(true);
      setTimeout(() => {
        navigation.navigate('Login'); //this.props.navigation.navigate('Login')
      }, 3000);
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

  function validateEmail() {
    if (email.includes('.') && email.includes('@') && !email.includes(' ')) {
      return true;
    } else {
      return false;
    }
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

          <Text style={styles.title}>Create your</Text>
          <Text style={styles.title}>Account</Text>
        </View>
        <StatusBar barStyle={'dark-content'} translucent />
        <View style={{flex: 1}}>
          <View
            style={{
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
                placeholder="e-mail"
                onChangeText={handleChangeEmail}
                style={styles.input}
              />
              <Text style={emailTextError(checkEmail)}>{textErrorEmail}</Text>
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
            <View>
              <TouchableHighlight style={styles.touchableHighlight}>
                <Text
                  style={[
                    styles.loginBoutton,
                    {color: visibleLoading ? colors.secandry : colors.primary},
                  ]}
                  onPress={register}>
                  Register
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
            </View>
          </View>

          <View style={styles.containerGoToSinup}>
            <Text style={styles.textGoToSinup}>
              already have an accoun?{' '}
              <Text
                style={{color: colors.primary}}
                onPress={() => navigation.navigate('Login')}>
                login!
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

                <Text style={styles.textStyle}>username is already exist</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        <Modal animationType="slide" transparent={true} visible={isRegister}>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  source={require('../../assets/img/check.png')}
                  resizeMode={'stretch'}
                  style={{width: '60%', height: '73%', top: '5%'}}
                />
                <Text style={[{top: '25%'}, styles.modalText]}>
                  Register successfully
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
