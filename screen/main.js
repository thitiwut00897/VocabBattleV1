import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import React from 'react';
// import { auth, firebaase } from 'firebase';
import auth from './firebase';


const firstScreen = ({settt}) => {

    return(
      <View>
          <Text>Vocabbattle </Text>
          <TouchableOpacity style={styles.button} title='dddd'></TouchableOpacity>
          <TouchableOpacity style={styles.button} title='dddd'></TouchableOpacity>
          <TouchableOpacity style={styles.button} title='dddd'></TouchableOpacity>
          <Button onPress={() => {auth.signOut().then(response =>{
              settt({
                isLoggedIn: false,
                currentUser: null,
              })
          })}} title='Logout'></Button>
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
    button:{
        width:50,
        height:25,
        borderRadius:15,
        backgroundColor: 'green',
        color:'#FFFFFF',
    }
  });
export default firstScreen;