import React from 'react'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';

export default function MenuButton(props) {
    return (
        <AwesomeButtonRick type="secondary"
            stretch="true"
            backgroundDarker="#9d65c9"
            onPress={() => {
                props.navigation.navigate(props.navName)
            }}>{props.title}
        </AwesomeButtonRick>
        )
}