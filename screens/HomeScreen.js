import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import * as firebase from 'firebase'

export default function HomeScreen(props) {
    const [email, setEmail] = useState('')
    const [displayName, setDisplayName] = useState('')

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

    return(
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.myButton}
                onPress={() => {
                    props.navigation.navigate('Play')
                }}>
                <Text>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.myButton}
                onPress={() => {
                    props.navigation.navigate('Howto')
                }}>
                <Text>How to Play</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.myButton}
                onPress={() => {
                    props.navigation.navigate('Profile')
                }}>
                <Text>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.myButton}
                onPress={signOutUser}>
                <Text>Log Out</Text>
            </TouchableOpacity>
        </View>
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
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
      },
    myButton: {
        marginTop: 20,
        height: 52,
        width: '40%',
        backgroundColor: '#84a9ac',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    }
})