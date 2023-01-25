import React from 'react';
import {
  StyleSheet,
  StatusBar,
  Dimensions,
  View,
  Text,
  ScrollView,
  ScrollViewBase,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from '../settings/Settings.js';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import Home from '../Home/Home.js';
import Search from '../Search/Search.js';
import Profile from '../Profile/Profile.js';
import MyBook from '../MyBook/MyBook.js';
import colors from '../utils/colors.js';
import {SafeAreaView} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <View
      style={{
        height: 50,
        flexDirection: 'row',
        width: width - 20,
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        alignItems: 'center',
      }}>
      <StatusBar barStyle={'dark-content'}></StatusBar>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.textLogoMy}>My</Text>
        <Text style={styles.textLogoBook}>Book</Text>
      </View>

      <View style={{flexDirection: 'row', right: 20}}>
        <Icon color={colors.primary} name="notifications-outline" size={30} />
        <Text style={styles.numberNotif}>3</Text>
      </View>
    </View>
  );
}

Dimensions.addEventListener('change', () => {
  width = Dimensions.get('window').width;
});

export default function BottomNavigation(props) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {height: 90},
        headerTitle: props => <LogoTitle {...props} />,
        tabBarStyle: {height: 60, paddingBottom: 3},
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
        component={Home}
      />

      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
        component={Profile}
      />

      <Tab.Screen
        name="MyBook"
        options={{
          tabBarLabel: 'My Book',
          tabBarIcon: ({color, size}) => (
            <Icon name="book-outline" color={color} size={size} />
          ),
        }}
        component={MyBook}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => (
            <Icon name="settings-outline" color={color} size={size} />
          ),
        }}
        name="Settings"
        component={Settings}
      />
    </Tab.Navigator>
  );
}

var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  textLogoMy: {
    color: colors.primary,
    fontFamily: 'Quicksand-Bold',
    fontSize: 30,
    paddingLeft: 15,
  },
  textLogoBook: {
    color: colors.secandry,
    fontFamily: 'Quicksand-Bold',
    fontSize: 15,
    top: 25,
  },
  numberNotif: {
    top: 5,
    left: -15,
    height: 12,
    width: 12,
    borderRadius: 50,
    fontSize: 7,
    textAlign: 'center',
    color: colors.white,
    backgroundColor: colors.red,
  },
});
