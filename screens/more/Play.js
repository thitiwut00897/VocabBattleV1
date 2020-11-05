import React, { useState } from 'react'
import { View, StyleSheet, Text, addons, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
// import wordd from '../words_dictionary.json'
import wordd from '../word.json'
export default function Play() {
    const [anwser, setAnwser] = useState("");
    const [hpmonster, setHpmonster] = useState(100)
    const [round, setround] = useState(1)


    const Check =()=>{
        if (anwser in wordd == true){
            setHpmonster(hpmonster-(anwser.length*10))
        }else{
            console.log(hpmonster);
        }
        if (hpmonster <= 0){
            setHpmonster(100)
            setround(round+1)
        }
    }
    const Checklog =()=>{
        if (hpmonster <= 0){
            setHpmonster((Math.floor(Math.random()*4)+1)*50)
            setround(round+1)
        }
        return (<Text>hp monster is {hpmonster}</Text>);
    }
    return(
        <View style={styles.container}>
            <Checklog/>
            <Text>Play Screen</Text>
            <Text>round : {round}</Text>
            {/* <Text>hp monster is {hpmonster}</Text> */}
            {/* <Check value="a"/> */}
            <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={(text)=>{setAnwser(text)}}></TextInput>
            <TouchableOpacity
                onPress={() => {Check()}}><Text>submit</Text></TouchableOpacity>
            
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