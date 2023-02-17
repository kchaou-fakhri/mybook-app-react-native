import React from 'react';
import SplashScreen from './screens/Home/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register'
import BottomNavigation from './screens/Home/BottomNavigation';
import Details from "./screens/Book/Details";
import BookList from "./screens/Book/BookList";

const Stack = createNativeStackNavigator();


function App() {
  return (
  

    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen  options={{ headerShown: false}} name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" options={{ headerShown: false}} component={Login} />
        <Stack.Screen name="Register" options={{ headerShown: false}} component={Register} />
        <Stack.Screen name='BottomNavigation' options={{headerShown : false}} component={BottomNavigation}/>
        <Stack.Screen name='Details' options={{headerShown : false}} component={Details}/>
        <Stack.Screen name='BookList' options={{headerShown : false}} component={BookList}/>

      </Stack.Navigator>
  </NavigationContainer>

  );
}

export default App;
