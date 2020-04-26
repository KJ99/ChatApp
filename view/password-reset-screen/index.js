import React from 'react'
import {View, Text, ScrollView, SafeAreaView, Image, Animated} from 'react-native'
import styles from '../../assets/styles/password-reset'
import EmailInput from './email-input'
import PasswordInputs from './password-inputs'
import PasswordResetForm from './password-reset-form'
import Congrats from './congrats'

export default class PasswordResetScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            emailAnim: new Animated.Value(0),
            passwordShowAnim: new Animated.Value(0),
            formOpacity: new Animated.Value(1),
            congratsOpacity: new Animated.Value(0)
        }
    }

    renderContent() {
        return !this.props.finished ? this.renderForm() : this.renderCongrats()
        
    }

    renderForm() {
        return (
            <PasswordResetForm 
            {...this.props} 
            opacity={this.state.formOpacity} 
            emailAnim={this.state.emailAnim} 
            passwordShowAnim={this.state.passwordShowAnim} />
        )
    }

    renderCongrats() {
        return <Congrats {...this.props} opacity={this.state.congratsOpacity} />
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <SafeAreaView>
                    {this.renderContent()}
                </SafeAreaView>
            </ScrollView>
        )
    }

    deactivateEmail(callback) {
        Animated.timing(this.state.emailAnim, {toValue: 1, duration: 500}).start(() => {
            if(typeof callback == 'function') {
                callback()
            }
        })
    }

    activatePassword(callback) {
        Animated.timing(this.state.passwordShowAnim, {toValue: 1, duration: 500}).start(() => {
            if(typeof callback == 'function') {
                callback()
            }
        })
    }

    hideForm(callback) {
        Animated.timing(this.state.formOpacity, {toValue: 0, duration: 500}).start(() => {
            if(typeof callback == 'function') {
                callback()
            }
        })
    }

    showCongrats() {
        Animated.timing(this.state.congratsOpacity, {toValue: 1, duration: 500}).start()
    }
}