import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function HowtoPlay() {
    const [circle1Active, setCircle1Active] = useState(true)
    const [circle2Active, setCircle2Active] = useState(false)
    const [circle3Active, setCircle3Active] = useState(false)
    const renderContent = (page) => {
        switch(page) {
            case 1:
                return (
                    <View>
                        <Text>อย่างแรกน่ะนะ</Text>
                    </View>
                )
            case 2:
                return (
                    <View>
                        <Text>อย่างที่สอง</Text>
                    </View>
                )
            case 3:
                return (
                    <View>
                        <Text>และอย่าสุดท้าย</Text>
                    </View>
                )
        }
    }
    const [myContent, setMyContent] = useState(renderContent(1))

    return(
        <View style={styles.container}>
            <View style={styles.myContent}>
                <View style={styles.info}>
                    {myContent}
                </View>
            </View>
            <View style={styles.myPage}>
                <TouchableOpacity style={circle1Active ? styles.circleActive : styles.circle}
                    onPress={() => {
                        setMyContent(renderContent(1))
                        setCircle1Active(true)
                        setCircle2Active(false)
                        setCircle3Active(false)
                    }}>
                </TouchableOpacity>
                <TouchableOpacity style={circle2Active ? styles.circleActive : styles.circle}
                    onPress={() => {
                        setMyContent(renderContent(2))
                        setCircle2Active(true)
                        setCircle1Active(false)
                        setCircle3Active(false)
                    }}>
                </TouchableOpacity>
                <TouchableOpacity style={circle3Active ? styles.circleActive : styles.circle}
                    onPress={() => {
                        setMyContent(renderContent(3))
                        setCircle3Active(true)
                        setCircle1Active(false)
                        setCircle2Active(false)
                    }}>
                </TouchableOpacity>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    myContent: {
        flex: 5,
        width: '100%',
        padding: 30,
    },
    info: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#84a9ac',
        borderRadius: 30,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    myPage: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width:15,
        height: 15,
        borderRadius: 15/2,
        borderWidth: 1,
        borderColor: '#84a9ac',
        margin: 10,
        
    },
    circleActive: {
        width:15,
        height: 15,
        borderRadius: 15/2,
        borderWidth: 1,
        borderColor: '#84a9ac',
        backgroundColor: '#84a9ac',
        margin: 10,
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