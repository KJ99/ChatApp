import React from 'react'
import {
    View, 
    Text,
    SafeAreaView,
    Image
} from 'react-native'
import styles from '../assets/styles/landing'
import { GlobalColors, AuthColors } from '../assets/colors'
import { RectangleButton } from '../components'
import { StackActions } from 'react-navigation'

export default class LandingScreen extends React.Component {
    render() {
        return (
            <SafeAreaView>
                <View style={styles.imageContainer}>
                        <Image style={styles.backgroundImage} source={require('../assets/images/landing.jpg')} />
                        <View style={styles.backgroundImageOverlay}></View>
                </View>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Image style={styles.logo} source={require('../assets/images/app-icon.png')} />
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Chat App</Text>
                        </View>
                    </View>
                    <View style={styles.introContainer}>
                        <Text style={styles.intro}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <View style={styles.buttonsRow}>
                            <RectangleButton.Button 
                                theme={RectangleButton.Themes.Primary}
                                primaryColor={GlobalColors.secondaryDarker}
                                secondaryColor={GlobalColors.whiteFontColor}
                                minWidth={300}
                                title='Create a new account'
                                onPress={this.props.onRegisterRequested}
                            />
                        </View>
                        <View style={styles.buttonsRow}>
                            <RectangleButton.Button 
                                theme={RectangleButton.Themes.Secondary}
                                primaryColor={GlobalColors.secondaryDarker}
                                secondaryColor={GlobalColors.whiteFontColor}
                                minWidth={300}
                                title='Log in to Chat App'
                                onPress={this.props.onLoginRequested}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }


}