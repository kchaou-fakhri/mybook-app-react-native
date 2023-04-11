import React from 'react';
import SplashScreen from './src/screens/Home/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/Auth/Login';
import Register from './src/screens/Auth/Register';
import BottomNavigation from './src/screens/Home/BottomNavigation';
import Details from './src/screens/Book/Details';
import BookListSeeMore from './src/screens/Book/BookListSeeMore';
import Reader from './src/screens/PdfReader/Reader';

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
        <Stack.Screen
          name="Reader"
          options={{headerShown: false}}
          component={Reader}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
