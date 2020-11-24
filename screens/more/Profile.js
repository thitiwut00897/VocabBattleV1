import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, FlatList, ImageBackground} from 'react-native'
import { AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import * as firebase from 'firebase'

export default function Profile() {
    const [bg, setBG] = useState(require('../../assets/img/space.jpg'))
    const user = firebase.auth().currentUser
    const userdata = firebase.database().ref('user/' + user.uid)
    const momentsImg = firebase.database().ref('momentsImg/')
    // game
    const [coins, setCoins] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const [moments, setMoments] = useState([])
    const DATA1 = [
        {
            id: 'moment1',
            title: 'My Birthday',
            url: '../../assets/img/moments/birthday.png'
        },
        {
            id: 'moment2',
            title: 'ic truck',
            url: '../../assets/img/moments/ictruck.png'
        },
        {
            id: 'moment3',
            title: 'ciao',
            url: '../../assets/img/moments/italy.png'
        },
    ]


    const readUser = () => {
        userdata.once('value', (snapshot) => {
            let data = snapshot.val()
            setCoins(data.coins)
            setHighScore(data.highScore)
            setMoments(data.moments)
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
                        <View style={styles.mediaImageContainer}>
                            <Image source={require('../../assets/img/moments/birthday.png')} style={styles.image} resizeMode='cover'></Image>
                            <View style={{backgroundColor: '#ffda77', padding: 5}}><Text style={{alignSelf: 'center'}}>My Birthday</Text></View>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require('../../assets/img/moments/ictruck.png')} style={styles.image} resizeMode='cover'></Image>
                            <View style={{backgroundColor: '#ffda77', padding: 5}}><Text style={{alignSelf: 'center'}}>i-c truck</Text></View>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require('../../assets/img/moments/birthday.png')} style={styles.image} resizeMode='cover'></Image>
                            <View style={{backgroundColor: '#ffda77', padding: 5}}><Text style={{alignSelf: 'center'}}>My Birthday</Text></View>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require('../../assets/img/moments/italy.png')} style={styles.image} resizeMode='cover'></Image>
                            <View style={{backgroundColor: '#ffda77', padding: 5}}><Text style={{alignSelf: 'center'}}>My Birthday</Text></View>
                        </View>
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