// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyNavigator from './navigation/myNavigator'
import * as firebase from 'firebase'
import firebaseConfig from './firebase/config'

export default function App() {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  return (
    <MyNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
