import React, { useEffect } from 'react'
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import * as firebase from 'firebase'

export default function LoadingScreen(props) {
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            props.navigation.navigate(user ? 'App' : 'Auth')
        })
    })

    return(
        <View style={styles.container}>
            <Text>Loading..,</Text>
            <ActivityIndicator size='large'></ActivityIndicator>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})