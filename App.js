import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Easing} from 'react-native';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgetPassword from './pages/ForgetPassword';
import Welcome from './pages/Welcome';

const Stack = createNativeStackNavigator()

// const openConfig = {
//   animation: 'spring',
//   config: {
//     stiffness: 1000,
//     damping: 60,
//     mass: 3,
//     overshootClamping: true,
//     restDisplacementThreshold: 0.01,
//     restSpeedThreshold: 0.01
//   },
// }
// const closeConfig = {
//   animation: 'timing',
//   config: {
//     duration: 900,
//     easing: Easing.ease
//   },
// }

export default function App() {
  const [count, setCount] = useState(100)
  
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        gestureDirection:'vertical-inverted',
        gestureEnabled: true,
        // transitionSpec: {
        //   open: openConfig,
        //   close: closeConfig
        // },
      }}
      >
        <Stack.Screen name='LandingPage' component={LandingPage} options={{headerShown: false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='SignUp' component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name='ForgetPassword' component={ForgetPassword} options={{headerShown: false}}/>
        <Stack.Screen name='Welcome' component={Welcome} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
