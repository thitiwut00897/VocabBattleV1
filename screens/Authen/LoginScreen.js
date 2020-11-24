import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import * as firebase from 'firebase'
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
// import Status from '.../components/status';

export default function LoginScreen(props) {
    const [bg, setBg] = useState(require('../../assets/img/spacegif5.gif'))
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState()

    const handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => setErrorMsg(error.message))
    }

    return(
        <ImageBackground source={bg} style={styles.container}>
            <Animatable.Text animation="bounceIn" style={styles.greeting}>Vocab Battle</Animatable.Text>
            <View style={styles.myForm}>
                <View style={{marginTop: 32}}>
                    <Text style={styles.inputTitle}><AntDesign name="user" size={24} color="#8A8F9E" />Email</Text>
                    <TextInput
                        style={styles.myInput}
                        autoCapitalize="none"
                        onChangeText={email => setEmail(email)}>
                    </TextInput>
                </View>
                <View style={{marginTop: 32}}>
                    <Text style={styles.inputTitle}><AntDesign name="lock" size={24} color="#8A8F9E" />Password</Text>
                    <TextInput
                        style={styles.myInput}
                        secureTextEntry={true}
                        onChangeText={password => setPassword(password)}>
                        </TextInput>
                </View>
                <View style={{marginTop: 10}}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('ForgotPass')}>
                        <Text style={{color: '#51adcf', textTransform: 'uppercase'}}> Forgot Password</Text>
                    </TouchableOpacity>
                </View>
                {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
                <TouchableOpacity onPress={handleLogin}>
                    <LinearGradient
                        colors={['#0278ae', '#51adcf']}
                        style={styles.myButton}>
                        <Text style={{color: 'white', fontWeight: '500'}}>Sign In</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#8A8F9E'}}>
                    Don't have an account ?
                </Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
                    <Text style={{color: '#51adcf'}}> Sign Up Here !</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

LoginScreen.navigationOptions = {
    headerShown: false
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: "cover",
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    greeting: {
        fontSize: 24,
        fontFamily: 'Chalkboard SE',
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    errorMsg: {
        marginTop: 10,
        color: '#B83B5E',
        fontWeight: 'bold',
        //backgroundColor: 'white',
        padding: 2
    },
    myForm: {
        width: '85%',
        marginTop: 10,
        padding: 20
    },
    inputTitle: {
        // color: '#8A8F9E',
        color: 'white',
        textTransform: 'uppercase',
        marginBottom: 10
    },
    myInput: {
        //borderBottomColor: '#8A8F9E',
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        // color: '#394867',
        color: 'white',
        fontSize: 16,
        padding: 5
    },
    myButton: {
        marginTop: 20,
        height: 52,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})