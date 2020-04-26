import React from 'react'
import { View, Text, Animated } from 'react-native'
import styles from '../../assets/styles/confirm-account'
import { GlobalColors, AuthColors, } from '../../assets/colors'
import { PinInput, RectangleButton } from '../../components'

export default class Congrats extends React.Component {
    render() {
        return (
            <Animated.View style={{...styles.successInfoContainer, opacity: this.props.opacity}}>
                <Text style={styles.congrats}>Congratulations!</Text>
                <Text style={styles.successInfo}>Your account in Chat App is now active.{'\n'}Now, you can log in</Text>
                <RectangleButton.Button 
                title='Log in to Chat App'
                width={250}
                primaryColor={GlobalColors.primary}
                secondaryColor={GlobalColors.whiteFontColor}
                onPress={this.props.onLoginPressed}
                />
            </Animated.View>
        )
    }
}