import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, addons, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
// import wordd from '../words_dictionary.json'
import wordd from '../word.json'
export default function Play() {
    const [anwser, setAnwser] = useState("");
    const [hpmonster, setHpmonster] = useState(100)
    const [round, setround] = useState(1)
    const [alphabet, setAlphabet] = useState(String.fromCharCode(Math.floor(Math.random() * 26) + 97))


    const Check =()=>{
        if (anwser[0] == alphabet){
            if (anwser in wordd == true){
                setHpmonster(hpmonster-(anwser.length*10))
                setAnwser('')
            }else{
                setAnwser('')
                console.log('ผิด');
            }
        }
        
    }

    useEffect(()=>{
        if (hpmonster <= 0){
            // show status monster animation
            setHpmonster((Math.floor(Math.random()*4)+1)*50)
            setround(round+1)
            setAlphabet(String.fromCharCode(Math.floor(Math.random() * 26) + 97))
        }
    })

    // const Checklog =()=>{
    //     // if (hpmonster <= 0){
    //     //     // show status monster animation
    //     //     setHpmonster((Math.floor(Math.random()*4)+1)*50)
    //     //     setround(round+1)
    //     //     setAlphabet(String.fromCharCode(Math.floor(Math.random() * 26) + 97))
    //     // }
    //     return (<Text>hp monster is {hpmonster}</Text>);
    // }
    return(
        <View style={styles.container}>
            <Text>Play Screen</Text>
            <Text>round : {round}</Text>
            {/* <Checklog/> */}
            <Text>hp monster is {hpmonster}</Text>
            <Text>type : {alphabet}</Text>
            <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} autoCapitalize = 'none' onfocus="" onChangeText={(text)=>{setAnwser(text.toLowerCase())}}>{anwser}</TextInput>
            <TouchableOpacity onPress={() => {Check()}}><Text>submit</Text></TouchableOpacity> 
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