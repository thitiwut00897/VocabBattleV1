import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoadingScreen from '../screens/LoadingScreen'
// Authen
import LoginScreen from '../screens/Authen/LoginScreen'
import RegisterScreen from '../screens/Authen/RegisterScreen'
import HomeScreen from '../screens/HomeScreen'

// more
import PlayScreen from '../screens/more/Play'
import HowtoPlay from '../screens/more/HowtoPlay'
import ProfileScreen from '../screens//more/Profile'

const AppStack = createStackNavigator({
    // RouteConfigs
    Home: { screen: HomeScreen },
    Play: { screen: PlayScreen },
    Howto: { screen: HowtoPlay },
    Profile: { screen: ProfileScreen }
}, {
    // DefaultNavigationOptions
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: "#84a9ac" },
        headerTintColor: "white",
    }
})

const AuthStack = createStackNavigator({
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen }
}, {
    // DefaultNavigationOptions
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: "#84a9ac" },
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