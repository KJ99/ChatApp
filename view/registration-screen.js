import React from 'react'
import { View, Text, Image, SafeAreaView, ScrollView, Switch } from 'react-native'
import styles from '../assets/styles/registration'
import { GlobalColors, AuthColors } from '../assets/colors'
import { RectangleButton, AuthInput } from '../components'

export default class RegistrationScreen extends React.Component {

    renderErrorMessage() {
        return this.props.error 
            ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.error}>
                        {this.props.errorMessage}
                    </Text>
                </View>
            )
            : null
    }

    render() {
        return (
            <ScrollView style={styles.container} ref={ref => this.scrollView = ref}>
                <SafeAreaView>
                    <View style={styles.header}>
                        <Image style={styles.appLogo} source={require('../assets/images/app-icon.png')} />
                        <Text style={styles.title}>Welcome to Chat App!</Text>
                    </View>
                    {this.renderErrorMessage()}
                    <View style={styles.form}>
                        <View style={styles.formRow}>
                            <AuthInput.View
                            placeholder='Email'
                            onChange={this.props.onEmailChanged}
                            value={this.props.email}
                            inputType='emailAddress'
                            activeColor={GlobalColors.primary}
                            inactiveNonEmptyColor={GlobalColors.inputDark}
                            inactiveEmptyColor={GlobalColors.inputGrey}
                            error={this.props.emailError}
                            keyboardType='email-address'
                            />
                        </View>
                        <View style={styles.formRow}>
                            <AuthInput.View
                            placeholder='Username'
                            onChange={this.props.onUsernameChanged}
                            value={this.props.username}
                            inputType='username'
                            activeColor={GlobalColors.primary}
                            inactiveNonEmptyColor={GlobalColors.inputDark}
                            inactiveEmptyColor={GlobalColors.inputGrey}
                            error={this.props.usernameError}
                            keyboardType='default'
                            />
                        </View>
                        <View style={styles.formRow}>
                            <AuthInput.View
                            placeholder='Full Name (optional)'
                            onChange={this.props.onFullNameChanged}
                            value={this.props.fullName}
                            inputType='name'
                            activeColor={GlobalColors.primary}
                            inactiveNonEmptyColor={GlobalColors.inputDark}
                            inactiveEmptyColor={GlobalColors.inputGrey}
                            keyboardType='default'
                            />
                        </View>
                        <View style={styles.formRow}>
                            <AuthInput.View
                            placeholder='Password'
                            onChange={this.props.onPasswordChanged}
                            value={this.props.password}
                            secureEntry={true}
                            inputType='newPassword'
                            activeColor={GlobalColors.primary}
                            inactiveNonEmptyColor={GlobalColors.inputDark}
                            inactiveEmptyColor={GlobalColors.inputGrey}
                            error={this.props.passwordError}
                            keyboardType='default'
                            />
                        </View>
                        <View style={styles.formRow}>
                            <AuthInput.View
                            placeholder='Confirm Password'
                            onChange={this.props.onConfirmPasswordChanged}
                            value={this.props.confirmPassword}
                            inputType='newPassword'
                            secureEntry={true}
                            activeColor={GlobalColors.primary}
                            inactiveNonEmptyColor={GlobalColors.inputDark}
                            inactiveEmptyColor={GlobalColors.inputGrey}
                            error={this.props.confirmPasswordError}
                            keyboardType='default'
                            />
                        </View>
                        <View style={styles.agreementRow}>
                            <View style={styles.agreementErrorContainer}>
                                <Text style={styles.agreementError}>{this.props.agreementError}</Text>
                            </View>
                            <View style={styles.agreementControlContainer}>
                                <Switch
                                value={this.props.agree}
                                onValueChange={this.props.onAgreementChanged}
                                trackColor={GlobalColors.primary}
                                />
                                <Text>I accept 
                                    <Text style={{color: GlobalColors.link}} onPress={this.props.onTermsPressed}> Terms of Usage </Text>
                                and 
                                    <Text style={{color: GlobalColors.link}} onPress={this.props.onPrivacyPressed}> Privacy Policy </Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.submitContainer}>
                        <RectangleButton.Button 
                        title='Register'
                        width={200}
                        primaryColor={GlobalColors.primary}
                        secondaryColor={GlobalColors.whiteFontColor}
                        processing={this.props.processing}
                        onPress={this.props.onSubmit}
                        />
                    </View>
                    <View style={styles.loginLinkContainer}>
                        <Text>
                            Already have an account?
                            <Text style={styles.link} onPress={this.props.onLoginRequested}> Log in to Chat App</Text>
                        </Text>
                    </View>
                </SafeAreaView>
            </ScrollView>
        )
    }

    scrollToTop() {
        this.scrollView.scrollTo({x: 0, y: 0, animated: true})
    }
}