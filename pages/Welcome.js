import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, StyleSheet, Text, TextInput, View, ScrollView, SafeAreaView, Pressable, Alert} from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import MapView from 'react-native-maps';

const Tab = createBottomTabNavigator()

export default function Welcome(props) {
    return (
      <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
            height: 80
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor:'black',
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: {
            marginBottom: 9,
            paddingBottom: 12,
            paddingTop: 0
        }
      }}
      >
        <Tab.Screen name='Maps' component={MapPage} 
        options={{
            headerShown: false,
            tabBarLabel:'Maps',
            tabBarIcon: ({size, color})=> <Fontisto name="map-marker-alt" size={size} color={color}/>
        }}
            />
        <Tab.Screen name='Users' component={Users} 
        options={{
            headerShown: false,
            tabBarLabel:'Users',
            tabBarIcon: ({size, color})=> <Entypo name="users" size={size} color={color} />
            }}/>
      </Tab.Navigator>
    )
  }

  
const Users = (props)=> {
    
    const handleSignout = () => {
        signOut(auth)
        .then(() => {
            // Déconnexion réussie
            console.log('Utilisateur déconnecté');
            props.navigation.push('Login')
        })
        .catch((error) => {
            // Gestion des erreurs
            Alert.alert(error.code)
        });
    }
    return (
        <SafeAreaView className='flex-1 mt-[40px]'>
            <View className='flex-1 items-center'>
                <Pressable onPress={handleSignout}>
                    <Text className=" border-1 text-red-400 text-xl w-[150px] text-center">Se deconnecter</Text>
                </Pressable>
                <ScrollView className='flex-1'>
                
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const MapPage = ()=> {
    const regionInfos={
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }

    return (
        <View className='flex-1 justify-end items-center'>
           <MapView
                className='flex-1'
                region={regionInfos}
           />
        </View>
    )
}