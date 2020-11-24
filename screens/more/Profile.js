import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native'
import { AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import * as firebase from 'firebase'

export default function Profile() {
    const [bg, setBG] = useState(require('../../assets/img/space.jpg'))
    const user = firebase.auth().currentUser
    const userdata = firebase.database().ref('user/' + user.uid)
    // game
    const [coins, setCoins] = useState(0)
    const [highScore, setHighScore] = useState(0)
    //moment title
    const [title1, setTitle1] = useState('')
    const [title2, setTitle2] = useState('')
    const [title3, setTitle3] = useState('')
    const [title4, setTitle4] = useState('')
    const [title5, setTitle5] = useState('')
    const [title6, setTitle6] = useState('')
    const [title7, setTitle7] = useState('')
    const [title8, setTitle8] = useState('')
    const [title9, setTitle9] = useState('')
    //moment have
    const [have1, setHave1] = useState(false)
    const [have2, setHave2] = useState(false)
    const [have3, setHave3] = useState(false)
    const [have4, setHave4] = useState(false)
    const [have5, setHave5] = useState(false)
    const [have6, setHave6] = useState(false)
    const [have7, setHave7] = useState(false)
    const [have8, setHave8] = useState(false)
    const [have9, setHave9] = useState(false)
    // moment img
    const momentImg = [
        require('../../assets/img/moments/birthday.png'),
        require('../../assets/img/moments/ictruck.png'),
        require('../../assets/img/moments/italy.png'),
        require('../../assets/img/moments/japan.png'),
        require('../../assets/img/moments/christmas.png'),
        require('../../assets/img/moments/beach.png'),
        require('../../assets/img/moments/sick.png'),
        require('../../assets/img/moments/coffeechill.png'),
        require('../../assets/img/moments/angry.png'),
    ]
    // const moment404 = require('..')
    const moment = [[title1, have1], [title2, have2], [title3, have3], [title4, have4], [title5, have5], [title6, have6], [title7, have7], [title8, have8], [title9, have9]]
    const renderMoment = moment.map((each, index) => {
        return (
            <View style={styles.mediaImageContainer}>
                <Image source={moment[index][1] ? momentImg[index] : require('../../assets/img/moments/donthave.png')} style={styles.image} resizeMode='cover'></Image>
                {moment[index][1] ? <View style={{backgroundColor: '#ffda77', padding: 5}}><Text style={{alignSelf: 'center'}}>{each[0]}</Text></View> :
                    <TouchableOpacity key={index} onPress={() => {takeMoment(index ,moment[index][1])}}>
                        <View style={{backgroundColor: '#ffda77', padding: 5}}><Text style={{alignSelf: 'center'}}>exchange 1000 coins</Text></View>
                    </TouchableOpacity>
                }
            </View>
        )
    })

    const takeMoment = (ind) => {
        let newMoment = [moment[0][1], moment[1][1], moment[2][1], moment[3][1], moment[4][1], moment[5][1], moment[6][1], moment[7][1],  moment[8][1]]
        newMoment[ind] = true
        console.log(newMoment)
        if(coins >= 1000){
            Alert.alert(
                "Are You Sure ?",
                "แน่ใจน้า ที่จะรื้อฟื้นความทรงจำนนี้",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => {
                    firebase.database().ref('user/' + user.uid).update({
                        coins: coins - 1000,
                        have1: newMoment[0],
                        have2: newMoment[1],
                        have3: newMoment[2],
                        have4: newMoment[3],
                        have5: newMoment[4],
                        have6: newMoment[5],
                        have7: newMoment[6],
                        have8: newMoment[7],
                        have9: newMoment[8],
                    })
                  }}
                ],
                { cancelable: false }
              );
        }else {
            Alert.alert(
                "Omg",
                "coins ไม่เพียงพอที่จะรื้อฟื้นความทรงจำ",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
        }
    }


    const readUser = () => {
        userdata.once('value', (snapshot) => {
            let data = snapshot.val()
            setCoins(data.coins)
            setHighScore(data.highScore)
            // moment title
            setTitle1(data.title1)
            setTitle2(data.title2)
            setTitle3(data.title3)
            setTitle4(data.title4)
            setTitle5(data.title5)
            setTitle6(data.title6)
            setTitle7(data.title7)
            setTitle8(data.title8)
            setTitle9(data.title9)
            // moment have
            setHave1(data.have1)
            setHave2(data.have2)
            setHave3(data.have3)
            setHave4(data.have4)
            setHave5(data.have5)
            setHave6(data.have6)
            setHave7(data.have7)
            setHave8(data.have8)
            setHave9(data.have9)
        })
    }

    useEffect(() => {
        readUser()
    })

    return(
        <ImageBackground source={bg} style={styles.container}>
            <ScrollView style={{marginBottom: 10}}>
                <View style={{alignSelf: 'center'}}>
                    <View style={styles.myMonster}>
                        <Image source={require('../../assets/img/game/chill.png')} style={styles.image} resizeMode='center'></Image>
                    </View>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, {fontSize: 24} ]}>{user.displayName}</Text>
                        <Feather name="user" size={15} color="#8bcdcd" />
                        <Text style={[styles.subtext]}>Name</Text>
                    </View>
                    <View style={[styles.statsBox, {borderColor: '#f5a25d', borderLeftWidth: 1, borderRightWidth: 1}]}>
                        <Text style={[styles.text, {fontSize: 24} ]}>{highScore}</Text>
                        <AntDesign name="Trophy" size={15} color="#ffda77" />
                        <Text style={[styles.subtext]}>High Score</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, {fontSize: 24} ]}>{coins}</Text>
                        <MaterialCommunityIcons name="coins" size={15} color="#ffda77" />
                        <Text style={[styles.subtext]}>Coins</Text>
                    </View>
                </View>
                <View style={{marginTop: 32}}>
                    <Text style={[styles.text, {paddingLeft: 10, marginBottom: 5}]}>Moments: </Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {renderMoment}
                    </ScrollView>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: "cover",
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