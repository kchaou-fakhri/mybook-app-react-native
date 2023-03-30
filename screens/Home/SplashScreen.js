import React, {useEffect, useRef, Component} from 'react';
import {
  Animated,
  Button,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config/ConfigWs';

function SplashScreen({navigation}) {
  const progress = useRef(new Animated.Value(0.5)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 0.5,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),

        Animated.timing(progress, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),

        Animated.timing(scale, {
          toValue: 11,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),

      Animated.sequence([]),
    ]).start();
  }, []);

  const getData = async () => {
    try {
      console.log('start verify token if valid');

      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        const response = await fetch(
          config.BaseUrl + 'authenticate/validate_token',

          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: token,
          },
        );
        const isToken = response.headers.get('check_token');
        console.log('token : ' + token);
        console.log('token : ' + token.length);
        console.log('check token: ' + isToken);
        if (response != null) {
          if (response.status == 200 && isToken === 'true') {
            setTimeout(() => {
              navigation.navigate('Login'); //this.props.navigation.navigate('Login')
            }, 6000);
          } else {
            setTimeout(() => {
              navigation.navigate('BottomNavigation'); //this.props.navigation.navigate('Home')
            }, 6000);
          }
        }
      } else {
        setTimeout(() => {
          navigation.navigate('Login'); //this.props.navigation.navigate('Login')
        }, 6000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <View onLayout={getData}>
        <Animated.View
          style={[
            styles.square,
            {
              borderRadius: progress.interpolate({
                inputRange: [0.7, 1],
                outputRange: [SIZE / 4, SIZE / 2],
              }),
              opacity: progress,
              transform: [
                {scale},
                {
                  rotate: progress.interpolate({
                    inputRange: [0.5, 1],
                    outputRange: [`${Math.PI}rad`, `${2 * Math.PI}rad`],
                  }),
                },
              ],
            },
          ]}>
          <Text style={[styles.text]}>MyBook</Text>
          <Text style={[styles.smallText]}>Another World !</Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

export default SplashScreen;

const SIZE = 150;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  image: {
    width: '50%',
    height: '30%',
    resizeMode: 'stretch',
  },
  logoLabelConatiner: {
    flexDirection: 'row',
  },

  logoLabelLast: {
    fontSize: 30,
    color: colors.primary,
    fontStyle: 'normal',
    fontFamily: 'Quicksand-light',
  },
  logoLabelBook: {
    fontSize: 30,
    color: colors.white,
    fontStyle: 'normal',
    fontFamily: 'Quicksand-light',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: colors.primary,
    bottom: -100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    // transform: [{ rotate: '180deg'}],
    fontSize: 5,
    fontFamily: 'Quicksand-Light',
  },
  smallText: {
    color: colors.white,
    // transform: [{ rotate: '180deg'}],
    fontSize: 1.2,
    fontFamily: 'Quicksand-Light',
  },
});
