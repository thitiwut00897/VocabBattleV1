import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import * as firebase from 'firebase'
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
// import Status from '.../components/status';

export default function RegisterScreen(props) {
    const [bg, setBg] = useState(require('../../assets/img/spacegif6.gif'))
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [msg, setMsg] = useState()
    

    const handleSignUp = () => {
        if(confirmPassword == password){
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(userCredentails => {
                writeUserData(firebase.auth().currentUser)
                return userCredentails.user.updateProfile({
                    displayName: name
                })
            })
            .catch(error => setMsg(error.message))
        } else {
            setMsg('Passwords do not math :(')
        }
    }

    const writeUserData = (user) => {
        firebase.database().ref('user/' + user.uid).set({
            email: email,
            displayName: name,
            highScore: 0,
            coins: 0,
            title1: 'MyBirthdy',
            have1: false,
            title2: 'i-c truck',
            have2: false,
            title3: 'ciao !',
            have3: false,
            title4: 'Hi Fuji',
            have4: false,
            title5: 'Merry Christmas',
            have5: false,
            title6: 'holiday beach',
            have6: false,
            title7: 'COVID19',
            have7: false,
            title8: 'coffee & chill',
            have8: false,
            title9: 'y u leave me !',
            have9: false,
            // moments: {
            //     moment1: {
            //         title: 'My Birthday',
            //         have: false
            //     },
            //     moment2: {
            //         title: 'Ice-cream Truck',
            //         have: false
            //     },
            //     moment3: {
            //         title: 'ciao !',
            //         have: false
            //     },
            //     moment4: {
            //         title: 'Hi Fuji',
            //         have: false
            //     },
            //     moment5: {
            //         title: 'Merry Christmas',
            //         have: false
            //     },
            //     moment6: {
            //         title: 'holiday beach',
            //         have: false
            //     },
            //     moment7: {
            //         title: 'COVID 19',
            //         have: false
            //     },
            //     moment8: {
            //         title: 'coffee & chill',
            //         have: false
            //     },
            //     moment9: {
            //         title: 'y u leave me alone',
            //         have: false
            //     }

            // }
        })
    }

    return(
        <ImageBackground source={bg} style={styles.container}>
            {/* <Status/> */}
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
        fontSize: 24,
        fontWeight: '400',
        textAlign: 'center',
        color: 'white',
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
        color: 'white',
        textTransform: 'uppercase',
        marginBottom: 10
    },
    myInput: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        color: 'green',
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