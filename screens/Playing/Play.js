import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, ImageBackground, Animated, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import ProgressBar from 'react-native-progress/Bar'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
import wordd from '../word.json'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

//var vocablist =[];//คำศัพท์รวมถ้่าถูก

export default function Play(props) {
    const [vocablist, addVocab] = useState([])
    const [bg, setBG] = useState(require('../../assets/img/space.jpg'))
    const [answer, setAnswer] = useState("");
    const [hpmonster, setHpmonster] = useState(100)
    const [hpType, setHpType] = useState(100)
    const [round, setround] = useState(1)
    const [alphabet, setAlphabet] = useState(String.fromCharCode(Math.floor(Math.random() * 26) + 97))
    const [status, setStatus] = useState('Heyy')
    const [img, setImage] = useState(require('../../assets/img/game/t100s1.png'))
    const [key, setKey] = useState(0);
    const [time, setTime] = useState(0);
    const MonsterImg = {
        // hpType = 50
        t50s1: require('../../assets/img/game/t50s1.png'),
        t50s2: require('../../assets/img/game/t50s2.png'),
        t50s3: require('../../assets/img/game/t50s3.png'),
        t50s4: require('../../assets/img/game/t50s4.png'),
        // hpType = 100
        t100s1: require('../../assets/img/game/t100s1.png'),
        t100s2: require('../../assets/img/game/t100s2.png'),
        t100s3: require('../../assets/img/game/t100s3.png'),
        t100s4: require('../../assets/img/game/t100s4.png'),
        // hpType = 150
        t150s1: require('../../assets/img/game/t150s1.png'),
        t150s2: require('../../assets/img/game/t150s2.png'),
        t150s3: require('../../assets/img/game/t150s3.png'),
        t150s4: require('../../assets/img/game/t150s4.png'),
        // hpType = 200
        t200s1: require('../../assets/img/game/t200s1.png'),
        t200s2: require('../../assets/img/game/t200s2.png'),
        t200s3: require('../../assets/img/game/t150s3.png'),
        t200s4: require('../../assets/img/game/t200s4.png'),
    }


    const Check =()=>{
        if (answer[0] == alphabet  && vocablist.every((item) => item !== answer)){
            if (answer in wordd == true){
                //vocablist.push(answer);
                addVocab(vocablist.concat(answer))
                setHpmonster(hpmonster-(answer.length*10))
                setAnswer('')//รีtextinput
                console.log(vocablist);
                setStatus('')
            }else{
                setAnswer('')//รีtextinput
                console.log('ผิด');
                setStatus('I don\'t know this word ')
            }
        }else{
            setAnswer('')//รีtextinput
            console.log('ซ้ำ')
            setStatus('already!')
        }
        
    }

    useEffect(()=>{
        if (hpmonster <= 0){
            // show status monster animation
            const randomHp = (Math.floor(Math.random()*4)+1)*50
            setHpmonster(randomHp)
            setHpType(randomHp)
            setround(round+1)
            setAlphabet(String.fromCharCode(Math.floor(Math.random() * 26) + 97))
            setImage(hpType == 50 ? MonsterImg.t50s1 : hpType == 100 ? MonsterImg.t100s1 : hpType == 150 ? MonsterImg.t150s1 : MonsterImg.t200s1)
            setKey(prevKey => prevKey + 1)
        }else {
            if (0.75 >= hpmonster/hpType >= 0.51) {
                setImage(hpType == 50 ? MonsterImg.t50s2 : hpType == 100 ? MonsterImg.t100s2 : hpType == 150 ? MonsterImg.t150s2 : MonsterImg.t200s2)
            }else if (0.5 >= hpmonster/hpType >= 0.26) {
                setImage(hpType == 50 ? MonsterImg.t50s3 : hpType == 100 ? MonsterImg.t100s3 : hpType == 150 ? MonsterImg.t150s3 : MonsterImg.t200s3)
            }else if (0.25 >= hpmonster.hpType >= 0.01) {
                setImage(hpType == 50 ? MonsterImg.t50s4 : hpType == 100 ? MonsterImg.t100s4 : hpType == 150 ? MonsterImg.t150s4 : MonsterImg.t200s4)
            }
        }
    })

    return(
        <ImageBackground source={bg} style={styles.container}>

            <View style={styles.myheader}>
                <View style={{flex: 1}}>
                    <Text style={{alignSelf: 'flex-start'}}>round : {round}</Text>
                </View>
                <View style={{flex: 1,flexDirection:"row-reverse"}}>
                    <CountdownCircleTimer
                        key={key}
                        isPlaying
                        duration={hpType == 50 ? 30: hpType == 100 ? 40: hpType == 150 ? 50: 60}
                        colors="#004777"
                        onComplete={() => {
                            Alert.alert(
                                'Game Over',
                                'Back to Homescreen',
                                [{
                                    text: 'Ok',
                                    onPress: () => props.navigation.navigate("Home")
                                }]
                            )
                        }}
                        size={50}
                        strokeWidth={5}
                    >
                        {({ remainingTime, animatedColor }) => (
                        <Animated.Text
                            style={{ color: animatedColor }}>
                            {remainingTime}
                        </Animated.Text>
                        )}
                    </CountdownCircleTimer>
                </View>
            </View>

            <View style={styles.mybody}>
                <View style={styles.myMonster}>
                    <Text style={styles.hp}>{hpmonster} / {hpType}</Text>
                    <ProgressBar progress={hpmonster/hpType} width={200} color={'#ec0101'} />
                    <Text style={styles.myTypeWord} animation="bounceIn">{alphabet}</Text>
                    <Image source={img} style={{width: 285, height: 210, marginTop: 15}} />
                    <Text>{status}</Text>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
                    <TextInput style={styles.myInput} autoCapitalize = 'none' onfocus="" onChangeText={(text)=>{setAnswer(text.toLowerCase())}}>{answer}</TextInput>
                    <AwesomeButtonRick type="secondary"
                        backgroundDarker="#9d65c9"
                        borderColor="#9d65c9"
                        backgroundActive="#ffffff"
                        textColor="#5d54a4"
                        onPress={() => {Check()}}
                    >CHASE
                    </AwesomeButtonRick>
                </View>
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
    myheader: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 5,
        paddingHorizontal: 10,
    },
    mybody: {
        flex: 9,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    myMonster: {
        margin: 3,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    hp: {
        color: 'black',
        fontWeight: 'bold',
        margin: 5
    },
    myTypeWord: {
        fontSize: 32,
        margin: 5
    },
    myInput: {
        width: 150,
        color: '#394867',
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        padding: 10,
        fontSize: 16,
        padding: 5,
        margin: 5
    },
})