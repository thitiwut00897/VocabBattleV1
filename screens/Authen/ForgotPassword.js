import React from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import * as firebase from 'firebase'
import * as Animatable from 'react-native-animatable'

export default function ForgotPassword(props) {
    return (
        <View style={styles.container}>
            <Text>forgot password screen</Text>
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