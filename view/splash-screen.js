import React from 'react'
import {
    View, 
    SafeAreaView,
    Image,
    ActivityIndicator
} from 'react-native'
import styles from '../assets/styles/splash'
import { GlobalColors, AuthColors } from '../assets/colors'

export default class LandingScreen extends React.Component {
    render() {
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <Image source={require('../assets/images/app-icon.png')} style={styles.appLogo} />
                    <ActivityIndicator color={GlobalColors.whiteFontColor} animating={true} size='large' />
                </View>
            </SafeAreaView>
        )
    }


}