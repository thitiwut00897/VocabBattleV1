import React, {useState} from 'react'
import { View, StyleSheet, ImageBackground, Text, ScrollView, Image } from 'react-native'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Play from './Play'

export default function history(passtohis) {
    const [bg, setBG] = useState(require('../../assets/img/space.jpg'))
    console.log(passtohis.navigation.state.params[1])
    const round = passtohis.navigation.state.params[1]
    const hiss = passtohis.navigation.state.params[0].map(word => {return(<Text key={word} style={{fontSize: 18}} >{word}</Text>)})
    const score = passtohis.navigation.state.params[2]
    const isHighScore = passtohis.navigation.state.params[3]
    const playAgain = ()=>{ //ทำให้ย้อนไปหน้าhome ไม่ไปhistory
        passtohis.navigation.navigate("Home")
        passtohis.navigation.navigate("Play")
    }


    return(
    <ImageBackground source={bg} style={styles.container}>
        <View style={{alignSelf: 'center', justifyContent: 'center'}}>
            <Text style={styles.gameover}>Game Over</Text>
            <View style={styles.statsContainer}>
                <View style={styles.statsBox}>
                    <Text style={[styles.subtext, {margin: 5, fontSize: 20}]}>{isHighScore ? <Text><MaterialCommunityIcons name="trophy" size={20} color="#ffda77" />New High Score</Text> : <Text>Score</Text>}</Text>
                    <Text>{score}</Text>
                </View>
                <View style={styles.statsBox}>
                    <Text style={[styles.subtext, {margin: 5, fontSize: 20}]}><MaterialCommunityIcons name="coins" size={15} color="#ffda77" />Coin</Text>
                    <Text>+ {score/100}</Text>
                </View>
            </View>
        </View>
        <View style={{flex: 3, justifyContent: 'flex-start'}}>
            <ScrollView style={styles.scrollView}>
                {hiss}
            </ScrollView>
        </View>
        <View style={styles.mediaImageContainer}>
            <Image source={require('../../assets/img/game/chill.png')} style={styles.image} resizeMode='center'></Image>
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
        textTransform: 'uppercase',
        alignSelf: 'center'
    },
    scrollView: {
        marginHorizontal: 10,
    },
    text: {
        color: '#534e52'
    },
    subtext: {
        fontSize: 12,
        color: '#AEB5BC',
        textTransform: 'uppercase',
        fontWeight: '500'
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    myMonster: {
        width: 200,
        height: 200
    },
    statsContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        // marginTop: 10,
    },
    statsBox: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 16,
        flex: 1
    },
    mediaImageContainer: {
        width: 250,
        height: 250,
        borderRadius: 12,
        overflow: 'hidden',
        marginHorizontal: 10
    }
})

