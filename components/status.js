import Constants from 'expo-constants';
import NetInfo from '@react-native-community/netinfo';
import {
Platform,
StatusBar,
StyleSheet,
Text,
View,
AsyncStorage,
} from 'react-native';
import React from 'react';

export default class Status extends React.Component {
state = {
isConnected: true,
};

async componentDidMount() {
    this.subscription =
    NetInfo.addEventListener(this.handleChange);
    const { isConnected } = await NetInfo.fetch();
    this.setState({ isConnected });
    }
    componentWillUnmount() {
    this.subscription()
    }
    handleChange = ({ isConnected }) => {
    this.setState({ isConnected });
    };

render() {
const { isConnected } = this.state;
const backgroundColor = isConnected ? 'white' : 'red';
const statusBar = (
    <StatusBar
    backgroundColor={backgroundColor}
    barStyle={isConnected ? 'dark-content' : 'light-content'}
    animated={false}
    />
    );

const messageContainer = (
    <View style={styles.messageContainer} pointerEvents={'none'}>
        {statusBar}
        {!isConnected && (
        <View style={styles.bubble}>
            <Text style={styles.text}>No network connection</Text>
        </View>
        )}
    </View>
);
const handler = (status) => {
    console.log('Network status changed', status);
    };
const subscription = NetInfo.addEventListener(handler);

if (Platform.OS ==='ios') {
    return (
        <View style={[styles.status, { backgroundColor }]}>
            {messageContainer}
        </View>
    );
}
return  messageContainer; // Temporary!
}
}
// ...
const statusHeight =(Platform.OS ==='ios' ? Constants.statusBarHeight : 0);
    const styles = StyleSheet.create({
    
    status: {
        zIndex: 1,
        height: statusHeight,
    },
    messageContainer: {
        zIndex: 1,
        position: 'absolute',
        top: statusHeight + 20,
        right: 0,
        left: 0,
        height: 80,
        alignItems: 'center',
        },
        bubble: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'red',
        },
        text: {
        color: 'white',
        },
        
});