import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, ImageBackground, Animated, SafeAreaView, Alert} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import ProgressBar from 'react-native-progress/Bar'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
import * as Animatable from 'react-native-animatable';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Fontisto, Entypo, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import wordd from '../word.json'
import * as firebase from 'firebase'
// import {Audio} from "expo-av"

// async function componentWillMount() {
    
//     const buttonFx = new Audio.Sound();

//     await buttonFx.loadAsync(
//         require("../../assets/img/sfx.mp3")
//     );
// }

export default function Play(props) {
    const [bg, setBG] = useState(require('../../assets/img/space.jpg'))
    const user = firebase.auth().currentUser
    const userdata = firebase.database().ref('user/' + user.uid)
    // game
    const [vocablist, addVocab] = useState([])
    const [answer, setAnswer] = useState("")
    const [round, setround] = useState(1)
    const [heart, setHeart] = useState([true, true, true])
    const [countHeart, addCount] = useState(1)
    const [basedamage, setBasedamage] = useState(10)
    const [score, setScore] = useState(0)
    const [countHit, setCountHit] = useState(0) // จำนวนการตี ในแต่ละรอบ
    const [countAlphabet, setCountAlphabet] = useState(0) // นับจำนวนตัวอักษร ในแต่ละรอบ
    const [highScore, setHighScore] = useState(0) // hightScore จาก firebase
    // item
    const [myItemPack, setItemPack] = useState(3)
    const [myItemHand, setItemHand] = useState(2)
    const [isItemHand, setIsItemHand] = useState(false)
    // monster
    const [alphabet, setAlphabet] = useState(String.fromCharCode(Math.floor(Math.random() * 26) + 97))
    const [hpmonster, setHpmonster] = useState(50)
    const [hpType, setHpType] = useState(50)
    const [status, setStatus] = useState('Heyy')
    const [img, setImage] = useState(require('../../assets/img/game/t50s1.png'))
    const [key, setKey] = useState(0);
    const [lvmon, setLvmon] = useState(1); //lv การเกิดมอน
    const [delezmon, setDelezmon] = useState(1); //ใช้ไม่ให้มอน50 เกิดหลังรอบ20
    const [randomHp,setRandomHp] = useState(50)
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
        t200s3: require('../../assets/img/game/t200s3.png'),
        t200s4: require('../../assets/img/game/t200s4.png'),
    }
    // componentWillMount();
    useEffect(()=>{
        if(hpmonster <= 0){
            // show status monster animation
            if (round == 5||round == 15 || round== 25){ // รอบตามนี้เพิ่มพลัง
                setBasedamage(basedamage+(hpType/50))
            }
            setround(round+1)
            if (round == 3 || round == 10 ){ //ทำให้มอนค่อยๆเก่งขึ้น [สุ่ม50, 50 100, 50 100 150]
                setLvmon(lvmon+1)
            }
            if(round == 20){ // ทำให้สุ่ม 100 150 200
                setDelezmon(delezmon+1)
            }
            console.log(score)
            console.log(countAlphabet)
            console.log(countHit)
            console.log(score+((countAlphabet/countHit)*1000))
            setScore(score+((countAlphabet/countHit)*1000))
            setCountHit(0)
            setCountAlphabet(0)
            setRandomHp(((Math.floor(Math.random()*lvmon)+delezmon)*50))
            setHpmonster(randomHp) //set รอบใหม่
            setHpType(randomHp) //set รอบใหม่
            setAlphabet(String.fromCharCode(Math.floor(Math.random() * 26) + 97))
            setImage(randomHp == 50 ? MonsterImg.t50s1 : randomHp == 100 ? MonsterImg.t100s1 : randomHp == 150 ? MonsterImg.t150s1 : MonsterImg.t200s1)
            setKey(prevKey => prevKey + 1)
        }else if(hpmonster/hpType <= 0.25 ){
            
            setImage(hpType == 50 ? MonsterImg.t50s4 : hpType == 100 ? MonsterImg.t100s4 : hpType == 150 ? MonsterImg.t150s4 : MonsterImg.t200s4)
        }else if(hpmonster/hpType <= 0.5) {
            setImage(hpType == 50 ? MonsterImg.t50s3 : hpType == 100 ? MonsterImg.t100s3 : hpType == 150 ? MonsterImg.t150s3 : MonsterImg.t200s3)
            
        }else if(hpmonster/hpType <= 0.75) {
            setImage(hpType == 50 ? MonsterImg.t50s2 : hpType == 100 ? MonsterImg.t100s2 : hpType == 150 ? MonsterImg.t150s2 : MonsterImg.t200s2)
            
        }
    })
    const Check =()=>{
        if (answer[0] == alphabet  && vocablist.every((item) => item !== answer)){
            if (answer in wordd == true){
                addVocab(vocablist.concat(answer))
                //ใช้ทำscore
                setCountAlphabet(countAlphabet+answer.length) 
                setCountHit(countHit+1)
                {isItemHand ? setHpmonster(hpmonster-((answer.length*basedamage)*2)) : setHpmonster(hpmonster-((answer.length*basedamage)*1))}
                setIsItemHand(false)
                setAnswer('')//รีtextinput
                
                setStatus('')
            }else{
                // ตอบไม่ถูก
                setAnswer('')//รีtextinput
                setStatus('I don\'t know this word ')
                HearBroke()
            }
        }else if (answer !== '' && answer[0] != alphabet) {
            // ตอบตัวหน้าไม่ตรง
            setAnswer('')
            setStatus('what are you saying')
            HearBroke()
        }else {
            // ตอบซ้ำ
            if(answer !== ''){
                setAnswer('')//รีtextinput
                setStatus('already!')
                HearBroke()
            }
        }
    }

    const itemPack = () => {
        // ~ ข้ามตัวนี้ สุ่มตัวใหม่
        if(myItemPack > 0){
            setRandomHp(((Math.floor(Math.random()*lvmon)+delezmon)*50))
            setHpmonster(randomHp)
            setHpType(randomHp)
            setAlphabet(String.fromCharCode(Math.floor(Math.random() * 26) + 97))
            setImage(randomHp == 50 ? MonsterImg.t50s1 : randomHp == 100 ? MonsterImg.t100s1 : randomHp == 150 ? MonsterImg.t150s1 : MonsterImg.t200s1)
            setKey(prevKey => prevKey + 1)
            setItemPack(myItemPack-1)
        }
    }

    const itemHand = () => {
        // เลือดลด * 2
        if(myItemHand > 0){
            setIsItemHand(true)
            setItemHand(myItemHand-1)
        }
    }

    const HearBroke = () => {
        if(countHeart == 1){
            setHeart([true, true, false])
            addCount(countHeart+1)
        }else if(countHeart == 2){
            setHeart([true, false, false])
            addCount(countHeart+1)
        }else if(countHeart == 3){
            gameOver()
        }
    }

    const HighScoreFB = () => {
        userdata.once('value', (snapshot) => {
            let data = snapshot.val()
            setHighScore(data.highScore)
        })
    }

    const gameOver = () => {
        if(score > highScore) {
            firebase.database().ref('user/' + user.uid).update({
                highScore: score
            })
        }
        const passtohis = [vocablist, round, score]
        props.navigation.navigate("Home")
        props.navigation.navigate("History", passtohis)
    }

    HighScoreFB()
    return(
        <ImageBackground source={bg} style={styles.container}>
            <View style={styles.header}>
                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        {/* heart */}
                        <View style={{flex: 1, flexDirection: 'row', alignContent: 'center', top: 10}}>
                            {heart[0] ? <AntDesign name="heart" size={30} color="#cf1b1b" /> : <AntDesign name="hearto" size={30} color="#cf1b1b" />}
                            {heart[1] ? <AntDesign name="heart" size={30} color="#cf1b1b" /> : <AntDesign name="hearto" size={30} color="#cf1b1b" />}
                            {heart[2] ? <AntDesign name="heart" size={30} color="#cf1b1b" /> : <AntDesign name="hearto" size={30} color="#cf1b1b" />}
                        </View>
                    </View>
                    <View style={[styles.statsBox, {borderColor: '#DFD8CB', borderLeftWidth: 1, borderRightWidth: 1}]}>
                        <CountdownCircleTimer
                            key={key}
                            isPlaying
                            duration={hpType == 50 ? 30: hpType == 100 ? 40: hpType == 150 ? 50: 60}
                            colors={[
                                ['#9d65c9', 0.3],
                                ['#d789d7', 0.3],
                                ['#F7B801', 0.2],
                                ['#A30000', 0.2],
                            ]}
                            onComplete={() => {
                                gameOver()
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
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, {fontSize: 24} ]}>{score}</Text>
                        {score > highScore ? <MaterialCommunityIcons name="trophy" size={20} color="#ffda77" /> : null}
                        <Text style={styles.subtext}>score</Text>
                    </View>
                </View>

                <View style={styles.statsContainer}>
                    {/* items */}
                    <View style={[styles.statsBox, {flexDirection: 'row', alignItems: 'flex-start', paddingLeft: 10}]}>
                        <TouchableOpacity style={{marginHorizontal: 10}} onPress={itemPack}>
                            <Text style={styles.subtext}><Fontisto name="suitcase" size={25} color="#59405c" /> x{myItemPack}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginHorizontal: 10}} onPress={itemHand}>
                            <Text style={styles.subtext}><Entypo name="hand" size={25} color="#59405c" /> x{myItemHand}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.statsBox,  {alignItems: 'flex-end', paddingRight: 10}]}>
                            <Text style={[styles.text, {marginVertical: 3, color: '#892cdc'} ]}>ROUND {round} {round == 5 || round == 15 || round == 25 ? <AntDesign name="star" size={35} color="#ffe05d" /> : null}</Text>
                        <Text style={[styles.subtext, {marginVertical: 3} ]}>LENGTH {isItemHand ? 'x2' : 'x1'}</Text>
                        <Text style={[styles.subtext, {marginVertical: 3} ]}>ATTACK {basedamage}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.mybody}>
                <View style={[styles.statsContainer, {flexDirection: 'column'}]}>
                    <Text style={styles.hp}>{hpmonster} / {hpType}</Text>
                    <ProgressBar progress={hpmonster/hpType} width={200} color={'#ec0101'} />
                    <Animatable.Text animation="bounce" style={styles.myTypeWord}>{alphabet}</Animatable.Text>
                    <View style={styles.mediaImageContainer}>
                        <Image source={img} style={styles.image} resizeMode='cover'></Image>
                    </View>
                    <Text style={styles.status}>{status}</Text>
                    <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
                        <TextInput style={styles.myInput} returnKeyType="done" onSubmitEditing={() => {Check()}} autoCapitalize = 'none' onfocus="" onChangeText={(text)=>{setAnswer(text.toLowerCase())}}>{answer}</TextInput>
                        <AwesomeButtonRick type="secondary"
                            backgroundDarker="#9d65c9"
                            borderColor="#9d65c9"
                            backgroundActive="#ffffff"
                            textColor="#5d54a4"
                            onPress={() => {Check()}}
                            // onPlayPress = {() => {
                            //     this.buttonFX.replayAsync();}}
                        >CHASE
                        </AwesomeButtonRick>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: "cover",
    },
    header: {
        flex: 1,
        alignItems: 'flex-start'
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
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    statsBox: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 16,
        flex: 1
    },
    mybody: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    myMonster: {
        marginTop: 30,
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
        fontWeight: 'bold',
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
        margin: 10
    },
    mediaImageContainer: {
        width: 250,
        height: 185,
        overflow: 'hidden',
        marginHorizontal: 10
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    status: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Chalkboard SE',
        marginTop: 3
    }
})