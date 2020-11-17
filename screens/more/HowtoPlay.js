import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

import Carousel from 'react-native-snap-carousel';

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window')

export default class HowtoPlay extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeIndex:0,
            carouselItems: [
                {
                    title:"Story Telling",
                    text: `คุณกำลังออกเดินทางไปอวกาศเพื่อปฏิบัติภารกิจ แต่ monster ที่น่ารักของคุณอยากตามคุณไปด้วย..,\tเนื่องจากเป็นภารกิจลับ คุณจำเป็นต้องไปคนเดียว`,
                    test: "test1"
                },
                {
                    title:"Item 2",
                    text: "Text 2",
                },
                {
                    title:"Item 3",
                    text: "Text 3",
                },
                {
                    title:"Item 4",
                    text: "Text 4",
                },
                {
                    title:"Item 5",
                    text: "Text 5",
                },
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
              <View style={styles.card}>
                <View></View>
                <Text style={{fontSize: 30}}>{item.title}</Text>
                <Text style={styles.mytext}>{item.text}</Text>
              </View>
    
            )
        }else if(index == 1){
            return (
                <View style={styles.card}>
                  <Text style={{fontSize: 30}}>{item.title} 1</Text>
                </View>
      
              )
        }else if(index == 2){
            return (
                <View style={styles.card}>
                  <Text style={{fontSize: 30}}>{item.title} 2</Text>
                </View>
      
              )
        }
    }

    render() {
        return (
          <View style={styles.container}>
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
        backgroundColor: 'floralwhite',
        // borderRadius: 5,
        borderRightWidth: 0.5,
        borderRightColor: '#84a9ac',
    },
    circle: {
        width:15,
        height: 15,
        borderRadius: 15/2,
        borderWidth: 1,
        borderColor: '#84a9ac',
        margin: 10,
    },
    mytext: {

    }
})

