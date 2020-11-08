import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, addons, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import wordd from '../word.json'

var vocablist =[];//คำศัพท์รวมถ้่าถูก

export default function Play() {
    const [anwser, setAnwser] = useState("");
    const [hpmonster, setHpmonster] = useState(100)
    const [round, setround] = useState(1)
    const [alphabet, setAlphabet] = useState(String.fromCharCode(Math.floor(Math.random() * 26) + 97))


    const Check =()=>{
        if (anwser[0] == alphabet  && vocablist.every((item) => item !== anwser)){
            if (anwser in wordd == true){
                vocablist.push(anwser);
                setHpmonster(hpmonster-(anwser.length*10))
                setAnwser('')//รีtextinput
                console.log(vocablist);
            }else{
                setAnwser('')//รีtextinput
                console.log('ผิด');
            }
        }else{
            setAnwser('')//รีtextinput
            console.log('ซ่ำ')
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

    return(
        <View style={styles.container}>
            <Text>Play Screen</Text>
            <Text>round : {round}</Text>
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