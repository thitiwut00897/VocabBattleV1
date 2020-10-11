import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Login from './screen/componant/login';
import auth from './screen/firebase';
import FirstScreen from './screen/main';

export default function App() {
  
  const [session, setSession] = useState({
    isLoggedIn: false,
    currentUser: null,
    errorMessage: null
  });
  useEffect(() => {
    const handleAuth = auth.onAuthStateChanged(user => {
      if (user) {
        setSession({
          isLoggedIn:true,
          currentUser: user,
          errorMessage:null
        });
      }
    });

    return () => {
      handleAuth();
    }
  }, [])
  return (
    <View style={styles.container}>
      {session.isLoggedIn ? 
          <FirstScreen settt={setSession}/>
         : <Login session={setSession}/>
      } 
    </View>
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
