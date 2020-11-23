import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, ImageBackground, Animated, SafeAreaView, Alert} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import ProgressBar from 'react-native-progress/Bar'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
import * as Animatable from 'react-native-animatable';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { AntDesign, Fontisto, Entypo } from '@expo/vector-icons'
import wordd from '../word.json'

export default function Play(props) {
    const [bg, setBG] = useState(require('../../assets/img/space.jpg'))
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
    // item
    const [myItemPack, setItemPack] = useState(3)
    const [myItemHand, setItemHand] = useState(2)
    const [isItemHand, setIsItemHand] = useState(false)
    // monster
    const [alphabet, setAlphabet] = useState(String.fromCharCode(Math.floor(Math.random() * 26) + 97))
    const [hpmonster, setHpmonster] = useState(50)
    const [hpType, setHpType] = useState(50)
    const [status, setStatus] = useState('Heyy')
    const [img, setImage] = useState(require('../../assets/img/game/t100s1.png'))
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

    const gameOver = () => {
        const passtohis = [vocablist, round, score]
        props.navigation.navigate("Home")
        props.navigation.navigate("History", passtohis)
    }

    return(
        <SafeAreaView style={{flex: 1}}>
            <ImageBackground source={bg} style={styles.container}>

                <View style={styles.myheader}>
                    <View style={{flex: 1}}>
                        {/* <AntDesign name="home" size={30} color="black" /> */}
                        <Text style={{alignSelf: 'flex-start', marginTop: 10}}>round : {round}</Text>
                        <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                            {heart[0] ? <AntDesign name="heart" size={30} color="#cf1b1b" /> : <AntDesign name="hearto" size={30} color="#cf1b1b" />}
                            {heart[1] ? <AntDesign name="heart" size={30} color="#cf1b1b" /> : <AntDesign name="hearto" size={30} color="#cf1b1b" />}
                            {heart[2] ? <AntDesign name="heart" size={30} color="#cf1b1b" /> : <AntDesign name="hearto" size={30} color="#cf1b1b" />}
                        </View>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <CountdownCircleTimer
                            key={key}
                            isPlaying
                            duration={hpType == 50 ? 30: hpType == 100 ? 40: hpType == 150 ? 50: 60}
                            // duration={hpType == 50 ? 0: hpType == 0 ? 0: hpType == 150 ? 0: 0}
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
                        <View style={{flexDirection: 'row', margin: 5}}>
                            <TouchableOpacity style={{marginHorizontal: 10}} onPress={itemPack}>
                                <Text><Fontisto name="suitcase" size={30} color="#59405c" /> x{myItemPack}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{marginHorizontal: 10}} onPress={itemHand}>
                                <Text><Entypo name="hand" size={30} color="#59405c" /> x{myItemHand}</Text>
                            </TouchableOpacity>
                        </View>
                            <Text style={styles.status}>length {isItemHand ? 'x2' : 'x1'}</Text>
                            <Text style={styles.status}>Attack {basedamage}</Text>
                            <Text style={styles.status}>Score {score}</Text>
                    </View>
                </View>

                <View style={styles.mybody}>
                    <View style={styles.myMonster}>
                        <Text style={styles.hp}>{hpmonster} / {hpType}</Text>
                        <ProgressBar progress={hpmonster/hpType} width={200} color={'#ec0101'} />
                        <Animatable.Text animation="bounce" style={styles.myTypeWord}>{alphabet}</Animatable.Text>
                        <Image source={img} style={{width: 285, height: 210, margin: 20}} />
                        <Text style={styles.status}>{status}</Text>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
                        <TextInput style={styles.myInput} returnKeyType="done" onSubmitEditing={() => {Check()}} autoCapitalize = 'none' onfocus="" onChangeText={(text)=>{setAnswer(text.toLowerCase())}}>{answer}</TextInput>
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
        </SafeAreaView>
    )
}

Play.navigationOptions = {
    headerShown: false
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'white',
        resizeMode: "cover",
    },
    myheader: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    mybody: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    myMonster: {
        marginTop: 40,
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
    status: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Chalkboard SE',
        marginTop: 3
    }
})