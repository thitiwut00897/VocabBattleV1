import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import * as firebase from 'firebase'
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable'

export default function ForgotPassword(props) {
    const [bg, setBg] = useState(require('../../assets/img/spacegif7.gif'))
    const [email, setEmail] = useState('')
    const [msg, setMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState()

    const handleforgetpass = () => {    
        firebase.auth().sendPasswordResetEmail(email)
        .then(msg => setMsg("Successfully Sent"))
        .catch(error => setErrorMsg(error.message))
    }

    return (
        <ImageBackground source={bg} style={styles.container}>
            <Animatable.Text animation="bounce" style={styles.greeting}>Forgot Password?</Animatable.Text>
            <View style={styles.myForm}>
                <View style={{marginTop: 32}}>
                    <Text style={styles.inputTitle}>Email</Text>
                    <TextInput
                        style={styles.myInput}
                        autoCapitalize="none"
                        onChangeText={email => setEmail(email)}>
                    </TextInput>
                </View>
                {msg ? <Text style={styles.msg}>{msg}</Text> : null}
                {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
                <TouchableOpacity onPress={handleforgetpass}>
                    <LinearGradient
                        colors={['#0278ae', '#51adcf']}
                        style={styles.myButton}>
                        <Text style={{color: 'white', fontWeight: '500'}}>Send Email</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: "cover",
    },
    greeting: {
        color: 'white',
        fontSize: 24,
        fontWeight: '400',
        textAlign: 'center'
    },
    errorMsg: {
        marginTop: 15,
        color: '#B83B5E'
    },
    msg: {
        marginTop: 15,
        color: '#3bb143'
    },
    myForm: {
        width: '85%',
        marginTop: 10,
        padding: 20
    },
    inputTitle: {
        color: 'white',
        textTransform: 'uppercase',
        marginBottom: 10
    },
    myInput: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        color: '#394867',
        fontSize: 16,
        padding: 2
    },
    myButton: {
        marginTop: 20,
        height: 52,
        // backgroundColor: '#51adcf',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})