import React from 'react';
import SplashScreen from './screens/Home/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register'
import Home from './screens/Home/Home';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();


function App(props) {
  return (
  

    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen  options={{ headerShown: false}} name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" options={{ headerShown: false}} component={Login} />
        <Stack.Screen name="Register" options={{ headerShown: false}} component={Register} />
        <Stack.Screen name='Home' options={{headerShown : false}} component={Home}/>
      </Stack.Navigator>
  </NavigationContainer>

  );
}

export default App;
