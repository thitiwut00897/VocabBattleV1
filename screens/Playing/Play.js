import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import ProgressBar from 'react-native-progress/Bar'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick'
import wordd from '../word.json'

var vocablist =[];//คำศัพท์รวมถ้่าถูก

export default function Play() {
    const [bg, setBG] = useState(require('../../assets/img/space.jpg'))
    const [answer, setAnswer] = useState("");
    const [hpmonster, setHpmonster] = useState(100)
    const [hpType, setHpType] = useState(100)
    const [round, setround] = useState(1)
    const [alphabet, setAlphabet] = useState(String.fromCharCode(Math.floor(Math.random() * 26) + 97))
    const [status, setStatus] = useState('Heyy')
    const [img, setImage] = useState(require('../../assets/img/game/t100s1.png'))


    const Check =()=>{
        if (answer[0] == alphabet  && vocablist.every((item) => item !== answer)){
            if (answer in wordd == true){
                vocablist.push(answer);
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
        if(0.75 >= (hpmonster/hpType) > 0.5) {
            // setImage(require('../../assets/img/game/t' + hpType + 's2.png'))
            setImage(require('../../assets/img/game/t100s2.png'))
        }
        if(0.5 >= (hpmonster/hpType) > 0.25){
            // setImage(require('../../assets/img/game/t' + hpType + 's3.png'))
            setImage(require('../../assets/img/game/t100s3.png'))
        }
        if(0.25 >= (hpmonster/hpType) > 0) {
            // setImage(require('../../assets/img/game/t' + hpType + 's4.png'))
            setImage(require('../../assets/img/game/t100s4.png'))
        }
        if (hpmonster <= 0){
            // show status monster animation
            const randomHp = (Math.floor(Math.random()*4)+1)*50
            setHpmonster(randomHp)
            setHpType(randomHp)
            setround(round+1)
            setAlphabet(String.fromCharCode(Math.floor(Math.random() * 26) + 97))
            // setImage(require('../../assets/img/game/t' + hpType + 's1.png'))
            setImage(require('../../assets/img/game/t100s1.png'))
        }
    })

    return(
        <ImageBackground source={bg} style={styles.container}>

            <View style={styles.myheader}>
                <View style={{flex: 1}}>
                    <Text style={{alignSelf: 'flex-start'}}>round : {round}</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={{alignSelf: 'flex-end'}}>time</Text>
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
    myButton: {
        marginTop: 20,
        height: 52,
        width: 150,
        backgroundColor: '#84a9ac',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    }
})