import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, TextInputBase, Image, Pressable, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Svg, { Path, LinearGradient, Stop, Defs } from 'react-native-svg'
import { Ionicons } from '@expo/vector-icons';
import { sendPasswordResetEmail as passwordReset } from 'firebase/auth'
import { auth } from '../firebaseConfigg'

export default function ForgetPassword(props) {
  const [activate, setActivate] = useState(false)
  const [displayBtn, setDisplayBtn] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (email != '') {
      setDisplayBtn(true)
    }
    else {
      setDisplayBtn(false)
    }
  }, [email])

  const handlePress = () => {
    activate ? setActivate(false) : setActivate(true)
  }

  const handleSubmit = () => {
    passwordReset(auth, email)
      .then(() => {
        Alert.alert("Consultez votre boite mail pour changer votre mot de passe")
        setEmail("")
        setTimeout(() => {
          props.navigation.navigate('Login')
        }, 5000);
      })
      .catch(error => {
        if (error.code === 'auth/network-request-failed') {
          Alert.alert("Veuillez vous connecter à internet")
        }
        if (error.code === 'auth/invalid-email') {
          Alert.alert("Votre adresse email est invalide")
          setEmail('')
        }
      })
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className='flex-1 bg-white'>
        <View className='flex-1'>
          <View className='absolute -right-32 top-[10px] h-[450px] w-full rotate-45'>
            <SvgDeux />
          </View>
          <View className='absolute -right-24 top-[20px] h-[450px] rotate-45 w-full'>
            <SvgUn />
          </View>
          <View className='mt-[300px] flex-1'>
            <Text style={{ fontFamily: 'PlatypiLight' }} className='font-bold text-center text-6xl'>Hello</Text>
            <Text style={{ fontFamily: 'PlatypiLight' }} className='text-center font-extralight text-xl'>Récupérez votre compte</Text>
            <View className='mt-4 ml-4 space-y-5'>
              <View style={styles.inputContainer}>
                <Image
                  style={styles.icon}
                  source={require('../assets/email.jpg')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={email => setEmail(email)}
                />
              </View>
            </View>

            <View className='items-center justify-center mr-0 space-x-1 flex-row mt-20'>
              <Text style={{ fontFamily: 'PlatypiLight' }} className='text-2xl font-thin'>Valider</Text>

              {
                displayBtn && <Pressable onPress={handleSubmit}>
                  <View className='rounded-full items-center justify-center bg-orange-400 h-[55px] w-[75px]'>
                    <Ionicons name="arrow-forward" size={40} color="white" />
                  </View>
                </Pressable>
              }

            </View>
            <View className='flex-row mt-[60px] justify-center space-x-1'>
              <Text className='font-extralight'>Vous n'avez pas encore de compte ?</Text>
              <Pressable onPress={() => props.navigation.push('SignUp')}><Text className='font text-base underline -mt-1'>Créez-en </Text></Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const SvgUn = () => {
  return (
    <Svg id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <Defs>
        <LinearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
        </LinearGradient>
      </Defs>
      <Path fill="rgba(248, 117, 55, 0.6)" d="M20.3,-13.6C27,-7.9,33.4,0.6,30.4,4.2C27.4,7.8,15,6.6,6,10C-3,13.3,-8.6,21.4,-11.4,21C-14.3,20.7,-14.5,12,-18.5,2C-22.6,-8,-30.5,-19.3,-28.1,-24.1C-25.6,-28.9,-12.8,-27.2,-3,-24.9C6.8,-22.5,13.7,-19.4,20.3,-13.6Z" width="100%" height="100%" transform="translate(50 50)" stroke-width="0" style="transition: all 0.3s ease 0s;"></Path>
    </Svg>
  )
}

const SvgDeux = () => {
  return (
    <Svg id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <Defs>
        <LinearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
        </LinearGradient>
      </Defs>
      <Path fill="rgba(248, 117, 55, 1)" d="M20.3,-13.6C27,-7.9,33.4,0.6,30.4,4.2C27.4,7.8,15,6.6,6,10C-3,13.3,-8.6,21.4,-11.4,21C-14.3,20.7,-14.5,12,-18.5,2C-22.6,-8,-30.5,-19.3,-28.1,-24.1C-25.6,-28.9,-12.8,-27.2,-3,-24.9C6.8,-22.5,13.7,-19.4,20.3,-13.6Z" width="100%" height="100%" transform="translate(50 50)" stroke-width="0" style="transition: all 0.3s ease 0s;"></Path>
    </Svg>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 1,
    width: 370
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 60,
    paddingHorizontal: 10,
  },
});