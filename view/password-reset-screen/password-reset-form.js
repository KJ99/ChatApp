import React from 'react'
import {View, Text, ScrollView, SafeAreaView, Image, Animated} from 'react-native'
import styles from '../../assets/styles/password-reset'
import EmailInput from './email-input'
import PasswordInputs from './password-inputs'

export default class PasswordResetForm extends React.Component {
    render() {
        return (
            <Animated.View style={{opacity: this.props.opacity}}>
                <View style={styles.header}>
                    <Image source={require('../../assets/images/app-icon.png')} style={styles.appLogo} />
                    <Text style={styles.title}>Reset a password</Text>
                </View>
                <EmailInput
                processing={this.props.emailProcessing}
                padding={this.props.emailAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0]
                })}
                controlsOpacity={this.props.emailAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0]
                })}
                active={this.props.emailActive}
                onSubmit={this.props.onEmailSubmitted}
                onEmailChanged={this.props.onEmailChanged}
                email={this.props.email}
                error={this.props.emailError}
                />
                <PasswordInputs
                processing={this.props.passwordProcessing}
                opacity={this.props.passwordShowAnim}
                pin={this.props.pin}
                password={this.props.password}
                confirmPassword={this.props.confirmPassword}
                onPinChanged={this.props.onPinChanged}
                onPasswordChanged={this.props.onPasswordChanged}
                onConfirmPasswordChanged={this.props.onConfirmPasswordChanged}
                pinError={this.props.pinError}
                passwordError={this.props.passwordError}
                confirmPasswordError={this.props.confirmPasswordError}
                onSubmit={this.props.onPasswordSubmitted}
                />
            </Animated.View>
        )
    }
}