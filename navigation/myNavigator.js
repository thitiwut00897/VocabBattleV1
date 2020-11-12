import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoadingScreen from '../screens/LoadingScreen'
// Authen
import LoginScreen from '../screens/Authen/LoginScreen'
import RegisterScreen from '../screens/Authen/RegisterScreen'
import HomeScreen from '../screens/HomeScreen'

// more
import PlayScreen from '../screens/Playing/Play'
import HowtoPlay from '../screens/more/HowtoPlay'
import ProfileScreen from '../screens//more/Profile'
import historyword from '../screens/Playing/historyword'

const AppStack = createStackNavigator({
    // RouteConfigs
    Home: { screen: HomeScreen },
    Play: { screen: PlayScreen },
    Howto: { screen: HowtoPlay },
    Profile: { screen: ProfileScreen },
    History: { screen: historyword }
}, {
    // DefaultNavigationOptions
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: "#9d65c9" },
        headerTintColor: "white",
    }
})

const AuthStack = createStackNavigator({
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen }
}, {
    // DefaultNavigationOptions
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: "#9d65c9" },
        headerTintColor: "white",
    }
})


export default createAppContainer(
    createSwitchNavigator({
        Loading: LoadingScreen,
        App: AppStack,
        Auth: AuthStack
    }, {
        initialRouteName: 'Loading'
    })
)