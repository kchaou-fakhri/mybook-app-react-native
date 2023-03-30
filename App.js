{
  /*import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {Review, Chip} from 'dev0kch-review';
import colors from './screens/utils/colors';
import Icon from 'react-native-vector-icons/dist/Ionicons';

export default function App() {
  return (
    <View>
      <View
        backgroundColor={'#d7e0fa'}
        style={{flexDirection: 'row', paddingTop: 10, height: 50}}>
        <Icon
          name="arrow-back-outline"
          size={30}
          style={{paddingLeft: 5}}
          color={colors.textColor}
        />
        <Text
          style={{
            fontSize: 20,
            paddingLeft: 10,
            fontWeight: '500',
            color: colors.textColor,
          }}>
          Chip
        </Text>
      </View>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#d7e0fa'} />
      <View style={{padding: 10, top: 20}}>
        <Text
          style={{
            fontSize: 15,
            bottom: 10,
            fontWeight: '500',
            color: colors.textColor,
          }}>
          Chip Fill
        </Text>
        {/*      <View style={{flexDirection: 'row'}}>
         <Chip type="fill" />
          <Chip
            type="fill"
            style={{marginLeft: 10}}
            textColor={colors.primary}
            borderColor={colors.primary}
            text={'Welcome'}
            color={colors.primary}
          />

          <Chip
            style={{
              marginLeft: 10,
              paddingLeft: 30,
              paddingRight: 30,
            }}
            color={colors.primary}
            type="fill"
            textColor={colors.primary}
            borderColor={colors.primary}
            text={'Outline Chip'}
          />
        </View>
        <Chip
          style={{
            top: 10,
          }}
          type={'fill'}
          color={colors.green}
          textColor={colors.primary}
          borderColor={colors.white}
          text={'Outline Chip with custom padding'}
        />
        <Text
          style={{
            fontSize: 15,
            bottom: 10,
            top: 40,
            fontWeight: '500',
            color: colors.textColor,
          }}>
          Chip Fill With Icon
        </Text>
        <Chip
          iconColor={colors.white}
          type={'fill'}
          color={colors.green}
          style={{
            top: 50,
            marginLeft: 10,
            paddingLeft: 30,
            paddingRight: 30,
          }}
          icon={'ios-camera-outline'}
          textColor={colors.primary}
          borderColor={colors.primary}
          text={'Outline Chip'}
        />

        <Chip
          type={'fill'}
          color={colors.red}
          iconColor={colors.white}
          style={{
            top: 60,
            borderRadius: 20,
            marginLeft: 10,
          }}
          icon={'checkmark-circle-sharp'}
          textColor={colors.primary}
          borderColor={colors.primary}
          text={'Outline Chip'}
        />

        <Chip
          type={'fill'}
          color={colors.black_200}
          iconColor={colors.white}
          style={{
            top: 70,
            borderRadius: 20,
            marginLeft: 10,
            width: '50%',
          }}
          icon={'checkmark-circle-sharp'}
          textColor={colors.primary}
          borderColor={colors.primary}
          text={'Outline Chip'}
        />
        <Chip
          style={{
            top: 80,
            marginLeft: 10,
            paddingLeft: 20,
            paddingRight: 20,
          }}
          icon={'checkmark-circle-sharp'}
          textColor={colors.primary}
          borderColor={colors.primary}
          color={colors.primary}
          text={' '}
        />

        */
}

{
  /* <Review></Review>
        <Review color={colors.primary} review={3.5}></Review>
        <Review color={colors.primary} size={30} review={2.5}></Review>
        <Review
          color={colors.primary}
          nbStart={7}
          size={20}
          review={5}></Review>
        <Review nbStart={10} size={20} review={10}></Review>
       
      </View>
    </View>
  );
}
*/
}

import React from 'react';
import SplashScreen from './screens/Home/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import BottomNavigation from './screens/Home/BottomNavigation';
import Details from './screens/Book/Details';
import BookListSeeMore from './screens/Book/BookListSeeMore';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="SplashScreen"
          component={SplashScreen}
        />
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={Login}
        />
        <Stack.Screen
          name="Register"
          options={{headerShown: false}}
          component={Register}
        />
        <Stack.Screen
          name="BottomNavigation"
          options={{headerShown: false}}
          component={BottomNavigation}
        />
        <Stack.Screen
          name="Details"
          options={{headerShown: false}}
          component={Details}
        />
        <Stack.Screen
          name="BookListSeeMore"
          options={{headerShown: false}}
          component={BookListSeeMore}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
