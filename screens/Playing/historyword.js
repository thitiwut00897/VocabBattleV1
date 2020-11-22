import React, {useState} from 'react'
import { View, StyleSheet, ImageBackground, Text, ScrollView } from 'react-native'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
import Play from './Play'

// export default function history(vocablist) {
export default function history(passtohis) {
    const [bg, setBG] = useState(require('../../assets/img/space.jpg'))
    console.log(passtohis.navigation.state.params[1])
    const round = passtohis.navigation.state.params[1]
    const hiss = passtohis.navigation.state.params[0].map(word => {return(<Text key={word} style={{fontSize: 18}} >{word}</Text>)})
    const playAgain = ()=>{ //ทำให้ย้อนไปหน้าhome ไม่ไปhistory
        passtohis.navigation.navigate("Home")
        passtohis.navigation.navigate("Play")
    }
    return(
    <ImageBackground source={bg} style={styles.container}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
            <Text style={styles.gameover}>Game Over</Text>
            <Text style={{margin: 5, fontSize: 20}}>chase {round}</Text>
        </View>
        <View style={{flex: 3, justifyContent: 'flex-start'}}>
            <ScrollView style={styles.scrollView}>
                {hiss}
            </ScrollView>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
            <AwesomeButtonRick type="secondary"
                backgroundDarker="#9d65c9"
                borderColor="#9d65c9"
                backgroundActive="#ffffff"
                textColor="#5d54a4"
                onPress={() => playAgain()}
            >Play Again
            </AwesomeButtonRick>
        </View>
    </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'white',
        resizeMode: "cover",
    },
    gameover: {
        fontSize: 28,
        fontFamily: 'Chalkboard SE',
    },
    scrollView: {
        marginHorizontal: 10,
    },
})

