import React, {useState} from 'react';
import { Text, View, TextInput, Button, Alert, TouchableOpacity, StyleSheet} from 'react-native';
import auth from '../firebase';

const Login = ({session}) => {
    const [email, setUsername]= useState('');
    const [password, setPassword]= useState('');

    const handleLogin = async ()=>{
        // try {
            const response = await auth.signInWithEmailAndPassword(
                email,
                password
            );
            const { user } = response;
            session({
                isLoggedIn: true,
                currentUser: user,

            });
        // } 
        // catch (error) {
        //     session({
        //         isLoggedIn: false,
        //         currentUser: null,
        //     });
        //     Alert.alert('ใส่ให้ถูก');
        // }
    };

    const handleUsername = event =>{
        setUsername(event.target.value);
    };

    const handlePassword = event =>{
        setPassword(event.target.value);
    };

    const handleregister = async ()=>{
        
        const response = await auth.createUserWithEmailAndPassword(
            email,
            password
        );
        const { user } = response;
        session({
            isLoggedIn: true,
            currentUser: user,
        });
        
        
    };

    return(
        <View style={styles.container}>
            <View style={styles.soon}>
                <View style={{padding:10,}}>
                    <Text>Username</Text>
                    <TextInput placeholder='E-Mail' onChange={handleUsername} style={{borderColor:'black', borderWidth:1, borderRadius:5, padding:5,weight:'50%'}}></TextInput>
                </View>
                <View style={{padding:10,}}>
                    <Text>Password</Text>
                    <TextInput secureTextEntry={true} placeholder='password' onChange={handlePassword} style={{borderColor:'black', borderWidth:1, borderRadius:5,padding:5,weight:'50%'}}></TextInput>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleLogin}><Text>Login</Text></TouchableOpacity>
            </View>
            
            <View style={{flexDirection:'row',flex:1,padding:10,}}>
                <Text>Don't have an acccount?</Text>
                <Text style={styles.signup} onPress={handleregister}>Sign Up</Text>
            </View>
        </View>
        
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
    },
    soon:{
        flex:1,
        justifyContent:'flex-end',
    },
    signup:{
        color: 'blue',
    },
    button:{
        backgroundColor:'#06F7F7',
        color: '#FFFFFF',
        alignItems:'center',
        padding:10,
        borderRadius:10,
        
    }
});
export default Login;