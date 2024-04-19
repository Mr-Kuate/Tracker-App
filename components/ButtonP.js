import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Pressable} from 'react-native';

export default function ButtonP({Nom, Route, navigation}) {
    return (
       <Text style={{ fontFamily: 'PlatypiLight'}} className='text-base rounded-xl bg-slate-100 p-3 w-11/12 text-center font-light'>{Nom}</Text>
    )
  }
  