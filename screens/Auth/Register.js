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
      <ImageBackground
        style={[
          styles.conatiner,
          {justifyContent: 'center', width: '100%', height: '100%'},
        ]}
        source={require('../../assets/background.png')}>
        <StatusBar barStyle={'dark-content'} translucent />
        <View
          style={{
            flex: 1,
            top: '5%',
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
                  {color: visibleLoading ? colors.primary : colors.white},
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
              <LinesLoader barNumber={4} barHeight={30} color={colors.white} />
            </View>
          </View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
        </KeyboardAvoidingView>

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
    top: '5%',
    left: 15,
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
    top: '5%',
    color: colors.textColor,
    textAlign: 'center',
    marginBottom: 30,
    left: 15,
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
    fontFamily: 'Quicksand-bold',
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
    fontFamily: 'Quicksand-bold',
    fontWeight: 'bold',
    fontSize: 14,
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

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,

    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
  },
});
