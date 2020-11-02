import React, { useState } from 'react'
import { View, StyleSheet, Text, addons, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import wordd from '../words_dictionary.json'
export default function Play() {
    const [anwser, setAnwser] = useState("");


    const Check =()=>{
        const fill = wordd.filter(x=>x.name == anwser);
        console.log(anwser)
        console.log(fill)
        console.log("หาเจอใน file json = "+fill.length)
        // console.log('**************');
        // console.log(value.value)
        if (fill.length != 0){
            // ดูในlogถ้าเจอ > 1 ถูก 
        }else{
            // ดูในlogถ้า = 0 ผิด
        }
    }
    return(
        <View style={styles.container}>
            <Text>Play Screen</Text>
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