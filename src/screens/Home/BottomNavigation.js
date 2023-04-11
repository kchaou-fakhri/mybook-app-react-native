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
import AllBooks from '../Book/AllBooks';
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
        tabBarStyle: {
          display: 'flex',
          position: 'absolute',
          bottom: 10,
          left: 20,
          right: 20,
          elevation: 5,
          backgroundColor: colors.primary,
          borderRadius: 30,
          height: 55,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: Platform.OS === 'ios' ? 10 : 0,
              }}>
              <Icon
                name="ios-list-outline"
                size={30}
                color={focused ? colors.secandry : colors.white}
              />
            </View>
          ),
        }}
        component={Home}
      />

      <Tab.Screen
        name="All"
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: Platform.OS === 'ios' ? 10 : 0,
              }}>
              <Icon
                name="grid"
                size={30}
                color={focused ? colors.secandry : colors.white}
              />
            </View>
          ),
        }}
        component={AllBooks}
      />

      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: Platform.OS === 'ios' ? -10 : -20,
                width: Platform.OS === 'ios' ? 50 : 60,
                height: Platform.OS === 'ios' ? 50 : 60,
                borderRadius: Platform.OS === 'ios' ? 25 : 30,
                backgroundColor: colors.secandry,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="md-book-outline"
                size={Platform.OS === 'ios' ? 30 : 40}
                color={focused ? colors.white : colors.black}
              />
            </View>
          ),
          tabBarIconStyle: {},
        }}
        component={Profile}
      />

      <Tab.Screen
        name="MyBook"
        options={{
          headerShown: false,
          tabBarLabel: 'My Book',
          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: Platform.OS === 'ios' ? 10 : 0,
              }}>
              <Icon
                name="md-person"
                size={30}
                color={focused ? colors.secandry : colors.white}
              />
            </View>
          ),
        }}
        component={MyBook}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Settings',

          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: Platform.OS === 'ios' ? 10 : 0,
              }}>
              <Icon
                name="settings-outline"
                size={30}
                color={focused ? colors.secandry : colors.white}
              />
            </View>
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
