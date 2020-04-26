import React from 'react'
import { View, Text, Image, ScrollView, SafeAreaView, Animated } from 'react-native'
import styles from '../../assets/styles/confirm-account'
import { GlobalColors, AuthColors, } from '../../assets/colors'
import { PinInput, RectangleButton } from '../../components'
import PinForm from './pin-form'
import Congrats from './congrats'

export default class ConfirmAccountScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mainOpacity: new Animated.Value(1),
            finishOpacity: new Animated.Value(0),
            finished: false
        }
    }

    renderContent() {
        return !this.state.finished ? this.renderMainContent() : this.renderFinishContent()
    }

    renderMainContent() {
        return <PinForm {...this.props} opacity={this.state.mainOpacity} />
    }

    renderFinishContent() {
        return <Congrats {...this.props} opacity={this.state.finishOpacity} />
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <SafeAreaView>
                    <View style={styles.titleContainer}>
                        <Image style={styles.logo} source={require('../../assets/images/app-icon.png')} />
                        <Text style={styles.title}>Thank you for choosing Chat App</Text>
                    </View>
                    {this.renderContent()}
                </SafeAreaView>
            </ScrollView>
        )
    }
    
    finish() {
        this.hideMainContent()
    }

    hideMainContent() {
        Animated.timing(this.state.mainOpacity, {toValue: 0, duration: 500}).start(() => {
            this.setState({finished: true}, this.showSuccessContent.bind(this))
        })
    }

    showSuccessContent() {
        Animated.timing(this.state.finishOpacity, {toValue: 1, duration: 500}).start()
    }
}