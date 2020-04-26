import React from 'react'
import { View, Text, Animated, Image } from 'react-native'
import { RectangleButton } from '../../components'
import styles from '../../assets/styles/password-reset'
import { GlobalColors } from '../../assets/colors'

export default class Congrats extends React.Component {
    render() {
        return (
            <Animated.View style={{...styles.congratsContainer, opacity: this.props.opacity}}>
                <Image style={styles.appLogo} source={require('../../assets/images/app-icon.png')} />
                <Text style={styles.congratsTitle}>Congratulations!</Text>
                <Text style={styles.congratsText}>Your password has been changed successfully.{'\n'}Now, you can log in.</Text>
                <RectangleButton.Button
                title='Log in to Chat App'
                width={250}
                primaryColor={GlobalColors.primary}
                secondaryColor={GlobalColors.whiteFontColor}
                onPress={this.props.goToLogin} 
                />
            </Animated.View>
        )
    }
}
