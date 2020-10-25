import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import * as firebase from 'firebase'
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

export default function RegisterScreen(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [msg, setMsg] = useState()
    

    const handleSignUp = () => {
        if(confirmPassword == password){
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(userCredentails => {
                return userCredentails.user.updateProfile({
                    displayName: name
                })
            })
            .catch(error => setMsg(error.message))
        } else {
            setMsg('Passwords do not math :(')
        }
    }
    return(
        <View style={styles.container}>
            <Animatable.Text animation="bounce" style={styles.greeting}>Sign up to get started</Animatable.Text>
            <View style={styles.myForm}>
                <View style={{marginTop: 32}}>
                    <Text style={styles.inputTitle}>Email</Text>
                    <TextInput
                        style={styles.myInput}
                        autoCapitalize="none"
                        onChangeText={email => setEmail(email)}>
                    </TextInput>
                </View>
                <View style={{marginTop: 32}}>
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput
                        style={styles.myInput}
                        secureTextEntry={true}
                        onChangeText={password => setPassword(password)}>
                        </TextInput>
                </View>
                <View style={{marginTop: 32}}>
                    <Text style={styles.inputTitle}>Confirm Password</Text>
                    <TextInput
                        style={styles.myInput}
                        secureTextEntry={true}
                        onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}>
                        </TextInput>
                </View>
                <View style={{marginTop: 32}}>
                    <Text style={styles.inputTitle}>Name</Text>
                    <TextInput
                        style={styles.myInput}
                        autoCapitalize="none"
                        onChangeText={name => setName(name)}>
                    </TextInput>
                </View>

                {msg ? <Text style={styles.errorMsg}>{msg}</Text> : null}

                {/* <TouchableOpacity style={styles.myButton}
                    onPress={handleSignUp}>
                    <Text style={{color: 'white', fontWeight: '500'}}>Sign Up</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={handleSignUp}>
                    <LinearGradient
                        colors={['#0278ae', '#51adcf']}
                        style={styles.myButton}>
                        <Text style={{color: 'white', fontWeight: '500'}}>Sign Up</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    greeting: {
        fontSize: 24,
        fontWeight: '400',
        textAlign: 'center'
    },
    errorMsg: {
        marginTop: 15,
        color: '#B83B5E'
    },
    success: {
        marginTop: 15,
        color: '#41aea9'
    },
    myForm: {
        width: '85%',
        marginTop: 10,
        padding: 20
    },
    inputTitle: {
        color: '#8A8F9E',
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