import React from 'react'
import { View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import styles from '../assets/styles/login'
import { GlobalColors } from '../assets/colors'
import { AuthInput, RectangleButton } from '../components'

export default class LoginScreen extends React.Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <SafeAreaView>
                    <View style={styles.titleContainer}>
                        <Image style={styles.appLogo} source={require('../assets/images/app-icon.png')} />
                        <Text style={styles.title}>Log in to Chat App</Text>
                    </View>
                    <View style={styles.inputsContainer}>
                        <Text style={styles.errorLabel}>{this.props.error}</Text>
                        <AuthInput.View
                        editable={!this.props.processing}
                        error={this.props.usernameError}
                        activeColor={GlobalColors.primary}
                        inactiveEmptyColor={GlobalColors.inputGrey}
                        inactiveNonEmptyColor={GlobalColors.inputDark}
                        value={this.props.username}
                        onChange={this.props.onUsernameChanged}
                        inputType='emailAddress'
                        placeholder='Username or email address'
                        keyboardType='email-address'
                        />
                        <AuthInput.View
                        editable={!this.props.processing}
                        error={this.props.passwordError}
                        activeColor={GlobalColors.primary}
                        inactiveEmptyColor={GlobalColors.inputGrey}
                        inactiveNonEmptyColor={GlobalColors.inputDark}
                        value={this.props.password}
                        onChange={this.props.onPasswordChanged}
                        inputType='password'
                        placeholder='Password'
                        secureEntry={true}
                        keyboardType='default'
                        />
                    </View>
                    <View style={styles.submitContainer}>
                        <RectangleButton.Button
                        width={150}
                        primaryColor={GlobalColors.primary}
                        secondaryColor={GlobalColors.whiteFontColor}
                        onPress={this.props.onSubmit}
                        title='Log in'
                        processing={this.props.processing} />
                    </View>
                    <View style={styles.registrationLinkContainer}>
                        <TouchableOpacity style={styles.forgotPassword} onPress={this.props.onForgotPasswordRequested}>
                            <Text style={ styles.forgotPasswordLink }>Do not remember a password?</Text>
                        </TouchableOpacity>
                        <Text>Do not have an account?
                            <Text style={styles.link} onPress={this.props.onRegistrationRequested}> Sign Up for free</Text>
                        </Text>
                    </View>
                </SafeAreaView>
            </ScrollView>
        )
    }
}
