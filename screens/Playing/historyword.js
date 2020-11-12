import React from 'react'
import { View, StyleSheet, ImageBackground, Text } from 'react-native'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
import Play from './Play'

export default function history(vocablist) {
    const hiss = vocablist.navigation.state.params.map(word =>{return(<Text key={word} >{word}</Text>)})
    // console.log(vocablist.navigation.state.params)
    return(
    <View>
        <Text>Eng Gane</Text>
        {hiss}
        <AwesomeButtonRick type="secondary"
                        backgroundDarker="#9d65c9"
                        borderColor="#9d65c9"
                        backgroundActive="#ffffff"
                        textColor="#5d54a4"
                        onPress={() => vocablist.navigation.navigate("Play")}
                    >play agin
        </AwesomeButtonRick>
    </View>
    )
}

