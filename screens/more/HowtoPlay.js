import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import ProgressBar from 'react-native-progress/Bar'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { AntDesign, Fontisto, Entypo } from '@expo/vector-icons'

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window')

export default class HowtoPlay extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeIndex:0,
            carouselItems: [
                1, 2, 3, 4, 5
            ],
            viewport: {
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height
            }
        }
    }

    _renderItem({item,index}){
        if(index == 0) {
            return (
              <ImageBackground style={styles.card} source={require('../../assets/img/spacegif2.jpg')}>
                <View style={styles.mycontainer}>
                    <Text style={styles.title}>STORY</Text>
                    <Text style={styles.mytext}>{'\t'}คุณกำลังออกเดินทางไปอวกาศเพื่อปฏิบัติภารกิจ แต่ monster ที่น่ารักของคุณอยากตามไปด้วย ..,</Text>
                    <AntDesign name="rocket1" size={24} color="white" />
                    <Text style={styles.mytext}>{'\t'}เนื่องจากเป็นภารกิจลับ คุณจำเป็นต้องไปคนเดียว</Text>
                    <Image source={require('../../assets/img/game/t100s1.png')}/>
                </View>
              </ImageBackground>
    
            )
        }else if(index == 1){
            return (
                <ImageBackground style={styles.card} source={require('../../assets/img/spacegif2.jpg')}>
                <View style={styles.mycontainer}>
                    <Text style={styles.mytext}>{'\t'}คุณต้องไล่ monster ให้กลับบ้านด้วยคำศัพท์ภาษาอังกฤษที่มีอักษรตัวแรกตรงตามที่ monster กำหนด</Text>
                    <View style={styles.circle}>
                        <Text style={{fontWeight: 'bold'}}>A</Text>
                    </View>
                    <Text style={styles.mytext}>{'\t'}โดยยานแต่ละคันที่ monster ขับตามคุณมา บ่งบอกความดื้อของ monster ว่าเขาจะยอมฟังคุณมากแค่ไหน</Text>
                    <Image source={require('../../assets/img/moments/rocket.png')}/>
                </View>
              </ImageBackground>
              )
        }else if(index == 2) {
            return (
                <ImageBackground style={styles.card} source={require('../../assets/img/spacegif2.jpg')}>
                    <View style={styles.mycontainer}>
                        <Text style={styles.title}>ABOUT GAME 101</Text>
                        <Text style={styles.mytext}>- ตัวอักษร 1 ตัว จะลดความดื้อของ monster ไป 10 หน่วย</Text>
                        <Text style={styles.hp}>190/200</Text>
                        <ProgressBar progress={190/200} width={200} color={'#ec0101'} />
                        <Text style={styles.mytext}>- คุณจะมีเทคนิคพิเศษ ( Attack Ablilty) เพื่อลดความดื้อของ monster ในรอบที่ 5, 15, 25</Text>
                    </View>
              </ImageBackground>
    
            )
        }else if(index == 3){
            return (
                <ImageBackground style={styles.card} source={require('../../assets/img/spacegif2.jpg')}>
                        <View style={styles.mycontainer}>
                            <Text style={styles.title}>ABOUT GAME 101</Text>
                            <Text style={styles.mytext}>- อย่าลืมว่าคุณต้องตอบภายในเวลาที่ monster กำหนด</Text>
                            <CountdownCircleTimer
                                onComplete={() => {
                                return [true, 1000] // repeat animation in 1.5 seconds
                                }}
                                isPlaying
                                duration={10}
                                colors="#c060a1"
                                size={50}
                                strokeWidth={5}
                            />
                            <Text style={styles.mytext}>- มีโอกาศตอบผิด / ซ้ำ ได้เพียง 3 ครั้งใน 1 เกม</Text>
                            <View style={{flexDirection: 'row', margin: 5}}>
                                <AntDesign name="heart" size={18} color="#cf1b1b" />
                                <AntDesign name="heart" size={18} color="#cf1b1b" />
                                <AntDesign name="hearto" size={18} color="#cf1b1b" />
                            </View>
                        </View>
                </ImageBackground>
            )
        }
        else if(index == 4) {
            return (
              <ImageBackground style={styles.card} source={require('../../assets/img/spacegif2.jpg')}>
                <View style={styles.mycontainer}>
                    <Text style={styles.title}>EXTRA ITEMS</Text>
                    <Text style={styles.myitem}><Fontisto name="suitcase" size={30} color="white" /> - แพคกระเป๋า</Text>
                    <Text style={styles.mytext}>{'\t'}จะทำการแพค monster ตัวนั้นส่งกลับบ้านทันที</Text>
                    <Text style={styles.myitem}><Entypo name="hand" size={30} color="white" /> - ลูบหัว</Text>
                    <Text style={styles.mytext}>{'\t'}เมื่อลูบหัว จะลดความดื้อของ monster x2</Text>
                </View>
              </ImageBackground>
    
            )
        }
    }

    render() {
        return (
          <View style={styles.containerbg}>
            <View onLayout={() => {
                this.setState({
                    viewport: {
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height
                    }
                })
            }}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={this.state.viewport.width}
                  itemWidth={this.state.viewport.width}
                  itemHeight={this.state.viewport.height}
                  inactiveSlideOpacity={1}
                  inactiveSlideScale={1}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        height: viewportHeight,
        padding: 20,
        resizeMode: "cover",
        borderRightWidth: 0.5,
        borderRightColor: '#84a9ac',
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 40/2,
        borderWidth: 1,
        borderColor: '#84a9ac',
        backgroundColor: '#84a9ac',
        // margin: 5,
        color: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mycontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Chalkboard SE',
    },
    mytext: {
        margin: 10,
        padding: 15,
        color: 'floralwhite',
        fontSize: 16,
        fontFamily: 'Chalkboard SE',
    },
    hp: {
        color: 'white',
        fontWeight: 'bold',
        margin: 5
    },
    myitem: {
        margin: 10,
        padding: 15,
        color: 'floralwhite',
        fontSize: 25,
        fontFamily: 'Chalkboard SE',
        alignSelf: 'flex-start'
    }
})

