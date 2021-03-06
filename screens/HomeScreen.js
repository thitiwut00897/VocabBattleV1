import React, { useEffect, useState} from 'react'
import { View, StyleSheet, ImageBackground, Button, Text } from 'react-native'
import * as firebase from 'firebase'
import Status from '../components/status'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
import {Audio} from "expo-av"
import { Component } from 'react'
export default function HomeScreen(props) {
    const [bg, setBg] = useState(require('../assets/img/spacegif2.gif'))
    const [email, setEmail] = useState('')
    const [displayName, setDisplayName] = useState('')
    const stretch = true
    
    async function componentWillMount() {
        const backgroundMusic = new Audio.Sound();
        try {
          await backgroundMusic.loadAsync(
            require("../assets/img/bggg.mp3")
          );
          await backgroundMusic.setIsLoopingAsync(true);
          await backgroundMusic.playAsync();
        } catch (error) {
            console.log('wait!!')
        }
    }
    componentWillMount()
    // const willmount = componentWillMount();
    useEffect(() => {
        try {
            const {email, displayName} = firebase.auth().currentUser
            setEmail(email)
            setDisplayName(displayName)
        }
        catch {
            const {email, displayName} = firebase.auth()
            setEmail(email)
            setDisplayName(displayName)
        }
    })

    const signOutUser = () => {
        firebase.auth().signOut()
        
    }

    const Menu = (title, naviName) => {
        return (
            <AwesomeButtonRick type="secondary"
                stretch={stretch}
                backgroundDarker="#9d65c9"
                borderColor="#9d65c9"
                backgroundActive="#ffffff"
                textColor="#5d54a4"
                onPress={() => {
                    naviName == 'signOutUser' ? signOutUser() : props.navigation.navigate(naviName)
                }}>{title}
            
            </AwesomeButtonRick>
        )
    }

    return(
        <ImageBackground source={bg} style={styles.container} >
            <Status/>
            <Text style={styles.greeting}>Vocab Battle</Text>
            <View style={styles.btn}>
                {Menu('Play', 'Play')}
            </View>
            <View style={styles.btn}>
                {Menu('How To Play', 'Howto')}
            </View>
            <View style={styles.btn}>
                {Menu('Profile', 'Profile')}
            </View>
            <View style={styles.btn}>
                {Menu('Log OUt', 'signOutUser')}
            </View>
            
        </ImageBackground>
    )
}

HomeScreen.navigationOptions = {
    headerShown: false
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: "cover",
    },
    btn: {
        width: '40%',
        margin: 10
    },
    greeting: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'Chalkboard SE',
    }
})