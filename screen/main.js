import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
// import { auth, firebaase } from 'firebase';
import auth from './firebase';


const firstScreen = ({settt}) => {

    return(
      <View style={styles.container}>
          <Text style={styles.title}>Vocabbattle </Text>
          <View>
            <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Play</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>How to Play</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Friend List</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Profile</Text></TouchableOpacity>
          </View>
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
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold'
    },
    button: {
      alignItems: 'center',
      borderRadius: 15,
      backgroundColor: '#9ab3f5',
      flex: 1,
      margin: 10,
      padding: 5
    },
    buttonText: {
      color:'white'
    }
  });
export default firstScreen;