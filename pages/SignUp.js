import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, SafeAreaView, TextInputBase, Image, Pressable, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Svg, { Path, LinearGradient, Stop, Defs } from 'react-native-svg'
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// import firebase from '@react-native-firebase/app';
// import auth from '@react-native-firebase/auth';


const SignUp = (props) => {
  const [activate, setActivate] = useState(false)
  const [displayBtn, setDisplayBtn] = useState(false)
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    createUserWithEmailAndPassword(auth, email, password).then(userCredentials => {
      const user = userCredentials.user
      console.log(user.email)
    }).then(() => {
      console.log('Envoi du formulaire')
      props.navigation.push('Welcome')
    }).catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        setEmail('')
        setPassword('')
        setPhone('')
        setNom('')
        Alert.alert("L'email est déjà utilisé")
      }
      if (error.code === 'auth/invalid-email') {
        Alert.alert("Votre addresse Email est invalide")
      }
      setError(error.message)
      setDisplayBtn(false)
    })

  }

  useEffect(() => {
    if (email != '' && password != '' && password.length >= 5 && nom != '' && phone != null) {
      setDisplayBtn(true)
    }
    else {
      setDisplayBtn(false)
    }
  }, [email, password])

  const handlePress = () => {
    activate ? setActivate(false) : setActivate(true)
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className='flex-1'>
        <View className='flex-1'>
          <View className='absolute -right-32 -top-[80px] rotate-6 -z-10 h-[350px] w-full'>
            <SvgUn />
          </View>
          <View className='absolute -left-40 top-[250px] -rotate-12 -z-10 h-[400px] w-full'>
            <SvgDeux />
          </View>
          <View className='flex-1 mt-[200px]'>
            <Text style={{ fontFamily: 'PlatypiLight' }} className='text-4xl text-center'>Créez votre compte</Text>
            <View className='mt-4 ml-4 space-y-5'>
              <View style={styles.inputContainer}>
                <Image
                  style={styles.icon}
                  source={require('../assets/user.png')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Noms et prénoms"
                  keyboardType='default'
                  value={nom}
                  onChangeText={nom => setNom(nom)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Image
                  style={styles.icon}
                  source={require('../assets/phone.png')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Téléphone"
                  keyboardType="numeric"
                  value={phone}
                  onChangeText={phone => setPhone(phone)}
                />
              </View>

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

              <View style={styles.inputContainer}>
                <Image
                  style={styles.icon}
                  source={require('../assets/password.png')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Mot de passe"
                  keyboardType='default'
                  secureTextEntry={!activate}
                  value={password}
                  onChangeText={password => setPassword(password)}
                />
                {
                  activate ? (<Pressable onPress={handlePress}>
                    <Image
                      style={styles.icon}
                      source={require('../assets/oeil.png')}
                    />
                  </Pressable>) :
                    (<Pressable onPress={handlePress}>
                      <Image
                        style={styles.icon}
                        source={require('../assets/barre.jpg')}
                      />
                    </Pressable>)
                }
              </View>
            </View>

            <View className='items-end mr-10 mt-0'>
              {
                error && <Text className='text-base text-red-400'>{error}</Text>
              }

            </View>
            <View className='items-center justify-center mr-0 space-x-1 flex-row mt-20'>
              <Text style={{ fontFamily: 'PlatypiLight' }} className='text-2xl font-thin'>Créer le compte</Text>
              {
                displayBtn && <Pressable onPress={handleSubmit}>
                  <View className='rounded-full items-center justify-center bg-orange-400 h-[55px] w-[75px]'>
                    <Ionicons name="arrow-forward" size={40} color="white" />
                  </View>
                </Pressable>
              }
            </View>
            <View className='flex-row mt-[60px] justify-center space-x-1'>
              <Text className='font-extralight'>Vous avez déjà un compte ?</Text>
              <Pressable onPress={() => props.navigation.push('Login')}><Text className='font text-base underline -mt-1'>Connectez-vous </Text></Pressable>
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
      <Path fill="rgba(251, 168, 31, 1)" d="M19.3,-11.9C26,-6.9,33.2,1.2,32.9,9.5C32.6,17.9,24.8,26.6,14.5,32.4C4.2,38.3,-8.5,41.2,-16.3,36.5C-24,31.7,-26.7,19.2,-25.3,10.2C-23.8,1.2,-18.1,-4.3,-13.1,-8.9C-8.2,-13.5,-4.1,-17.1,1.1,-18C6.3,-18.8,12.5,-16.9,19.3,-11.9Z" width="100%" height="100%" transform="translate(50 50)" stroke-width="0" style="transition: all 0.3s ease 0s;"></Path>
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
      <Path fill="rgba(25.095, 173.356, 99.608, 1)" d="M25.3,-28.1C30.5,-20.1,30.9,-10,27.4,-3.5C24,3.1,16.7,6.3,11.5,8.7C6.3,11.2,3.1,12.9,-3.7,16.6C-10.6,20.4,-21.1,26,-24.7,23.6C-28.2,21.1,-24.7,10.6,-22.9,1.8C-21.1,-7,-21.1,-14,-17.5,-22.1C-14,-30.2,-7,-39.3,1.5,-40.8C10,-42.3,20.1,-36.2,25.3,-28.1Z" width="100%" height="100%" transform="translate(50 50)" stroke-width="0" style="transition: all 0.3s ease 0s;"></Path>
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


export default SignUp
