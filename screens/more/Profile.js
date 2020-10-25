import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import * as firebase from 'firebase'

export default function Profile() {
    const user = firebase.auth().currentUser
    return(
        <View style={styles.container}>
            <Text>{user.displayName}'s Profile Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})