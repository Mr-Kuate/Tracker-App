import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Pressable, Image, SafeAreaView} from 'react-native';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import ButtonP from '../components/ButtonP';


SplashScreen.preventAutoHideAsync();
     
export default function LandingPage(props) {
  const [fontsLoaded, fontError] = useFonts({
    'Platypi': require('../assets/fonts/Platypi-Bold.ttf'),
    'PlatypiLight': require('../assets/fonts/Platypi-Light.ttf')
  });
  
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handlePress = (arg)=> {
    props.navigation.push(arg)
  }
  return (
    <SafeAreaView className='flex-1'>
    <View className='flex-1 bg-blue-500'>
        <View className='h-3/5 justify-center items-center'>
            <Text style={{ fontFamily: 'Platypi'}} className='text-white text-5xl'>SAFE-KID</Text>
        </View>
        <View className='h-2/5 bg-white rounded-tr-3xl rounded-tl-3xl flex-col pt-10 items-center space-y-4'>
            <Text style={{ fontFamily: 'Platypi'}} className='text-3xl font-semibold'>Bienvenue</Text>
            <Text className='text-lg font-light'>Prise en main de votre compte</Text>
            <View className='flex-1 w-full items-center space-y-0'>
                <Pressable onPress={()=> handlePress('SignUp')}
                className='flex-1 w-full items-center mt-4'>
                    <ButtonP Nom={"S'inscrire"}/>
                </Pressable>
                <Pressable onPress={()=> handlePress('Login')}
                className='flex-1 w-full items-center'>
                    <ButtonP Nom={"Connexion"}/>
                </Pressable>
            </View>
        </View>
    </View>
    </SafeAreaView>
  )
}
