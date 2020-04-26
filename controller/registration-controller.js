import React from 'react'
import {View, Text, Linking} from 'react-native'
import AuthController from './auth-controller'
import Screen from '../view/registration-screen'
import EmailValidator from 'email-validator'
import { MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH, PRIVACY_POLICY_URL, TERMS_OF_USE_URL } from 'react-native-dotenv'
import * as Service from '../utility/registration-service'
import { RegistrationErrors } from '../errors'
import {NavigationActions, StackActions} from  '@react-navigation/native'

const mapDispatchToProps = dispatch => {
    return {}    
}

const mapStateToProps = state => {
    return {}
}

class RegistrationController extends AuthController {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            username: '',
            fullName: '',
            password: '',
            confirmPassword: '',
            formError: false,
            formErrorMessage: '',
            emailError: '',
            usernameError: '',
            passwordError: '',
            confirmPasswordError: '',
            agreementError: '',
            agree: false,
            processing: false,
            disabled: false
        }
    }

    onEmailChanged(email) {
        const emailError = email.length == 0 || EmailValidator.validate(email) ? '' : 'This email address is not valid'
        this.setState({email: email.trim(), emailError: emailError})
    }

    onUsernameChanged(username) {
        const error = username.length == 0 || username.trim().length >= MIN_USERNAME_LENGTH ? '' : 'Username is too short'
        this.setState({username: username.trim(), usernameError: error})
    }

    onFullNameChanged(fullName) {
        this.setState({fullName: fullName})
    }

    onPasswordChanged(password) {
        const error = password.length == 0 || password.length >= MIN_PASSWORD_LENGTH ? '' : 'Password is too short'
        this.setState({password: password, passwordError: error})
    }

    onConfirmPasswordChanged(password) {
        const error = password.length == 0 || password === this.state.password ? '' : 'Passwords are not the same' 
        this.setState({confirmPassword: password, confirmPasswordError: error})
    }
    
    render() {
        return (
            <Screen
            ref={ref => this.screen = ref}
            onEmailChanged={this.onEmailChanged.bind(this)}
            onUsernameChanged={this.onUsernameChanged.bind(this)}
            onFullNameChanged={this.onFullNameChanged.bind(this)}
            onPasswordChanged={this.onPasswordChanged.bind(this)}
            onConfirmPasswordChanged={this.onConfirmPasswordChanged.bind(this)}
            email={this.state.email}
            username={this.state.username}
            fullName={this.state.fullName}
            password={this.state.password}
            confirmPassword={this.state.confirmPassword}
            emailError={this.state.emailError}
            usernameError={this.state.usernameError}
            passwordError={this.state.passwordError}
            confirmPasswordError={this.state.confirmPasswordError}
            error={this.state.formError}
            errorMessage={this.state.formErrorMessage}
            onTermsPressed={() => { Linking.openURL(TERMS_OF_USE_URL) }}
            onPrivacyPressed={() => { Linking.openURL(PRIVACY_POLICY_URL) }}
            agree={this.state.agree}
            onAgreementChanged={value => this.setState({agree: value})}
            agreementError={this.state.agreementError}
            processing={this.state.processing}
            onSubmit={this.processForm.bind(this)}
            disabled={this.state.disabled}
            onLoginRequested={this.onLoginRequested.bind(this)}
            />
        )    
    }

    processForm() {
        if(!this.validate()) {
            this.screen.scrollToTop()
            return
        }
        this.setState({processing: true, disabled: true}, () => this.sendForm())
    }

    sendForm() {
        Service.registerUser({
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            fullName: this.state.fullName.trim().length > 0 ? this.state.fullName : null
        })
        .then(this.onRegisteringSuccess.bind(this))
        .catch(this.onRegisteringFail.bind(this))
        .finally(() => this.setState({processing: false}))
    }

    validate() {
        let emailError = ''
        let usernameError = ''
        let passwordError = ''
        let confirmPasswordError = ''
        let agreementError = ''
        let isValid = true
        if(this.state.email.trim().length == 0) {
            emailError = 'This field is required'
            isValid = false
        } else if(!EmailValidator.validate(this.state.email.trim())) {
            emailError = 'That email address is not valid'
            isValid = false
        } else {
            emailError = ''
        }

        if(this.state.username.trim().length === 0) {
            usernameError = 'This field is required'
            isValid = false
        } else if(this.state.username.trim().length < MIN_USERNAME_LENGTH) {
            usernameError = 'Username is too short'
            isValid = false
        } else {
            usernameError = ''
        }

        if(this.state.password.length === 0) {
            passwordError = 'This field is required'
            isValid = false
        } else if(this.state.password.length < MIN_PASSWORD_LENGTH) {
            passwordError = 'Password is too short'
            isValid = false
        } else {
            passwordError = ''
        }

        if(this.state.confirmPassword !== this.state.password) {
            confirmPasswordError = 'Passwords are not the same'
            isValid = false
        } else {
            confirmPasswordError = ''
        }

        if(!this.state.agree) {
            agreementError = 'This field is required'
            isValid = false
        } else {
            agreementError = ''
        }

        this.setState({
            emailError: emailError,
            usernameError: usernameError,
            passwordError: passwordError,
            confirmPasswordError: confirmPasswordError,
            agreementError: agreementError
        
        })

        return isValid
    }

    findErrors() {

    }

    onRegisteringSuccess(token) {
        this.props.navigation.dispatch(StackActions.replace('ConfirmAccount', {token: token, email: this.state.email}))
    }

    onRegisteringFail(error) {
        this.setState({formError: true, formErrorMessage: this.getErrorMessage(error)}, () => this.screen.scrollToTop())
    }

    getErrorMessage(e) {
        const defaultMessage = 'We\'re sorry. Unrecognized error has occured.\nPlease try again later'
        if(typeof e !== 'object' || typeof e.code !== 'number') {
            return defaultMessage
        }
        let message
        switch (e.code) {
            case RegistrationErrors.incompleteForm:
                message = 'Cannot register.\nAt least one of required fields is empty'
                break
            case RegistrationErrors.invalidEmail:
                message = 'Cannot register.\nEmail address is invalid'
                break
            case RegistrationErrors.emailTaken:
                message = 'Cannot register.\nUser with that email already exists'
                break
            case RegistrationErrors.usernameTooShort:
                message = 'Cannot register.\nUsername is too short'
                break
            case RegistrationErrors.usernameTaken:
                message = 'Cannot register.\nUser with that username already exists'
                break
            case RegistrationErrors.passwordTooShort:
                message = 'Cannot register.\nPassword is too short'
                break
            case RegistrationErrors.passwordsNotTheSame:
                message = 'Cannot register.\nPasswords are not the same'
                break
            default:
                message = defaultMessage
                break
        }
        return message
    }

    onLoginRequested() {
        this.props.navigation.dispatch(StackActions.push('Login'))
    }
}

export default RegistrationController