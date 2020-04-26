import React from 'react'
import { View, Text } from 'react-native'
import AuthController from './auth-controller'
import Screen from '../view/password-reset-screen'
import { initializePasswordReset, resetPassword } from '../utility/user-service'
import { UserErrors, unknownError } from '../errors'
import {NavigationActions, StackActions} from  '@react-navigation/native'

const mapDispatchToProps = dispatch => {
    return {}    
}

const mapStateToProps = state => {
    return {}
}

class PasswordResetController extends AuthController {
    constructor(props) {
        super(props)
        this.state = {
            emailActive: true,
            passwordActive: true,
            emailProcessing: false,
            email: '',
            emailError: '',
            pin: '',
            password: '',
            confirmPassword: '',
            passwordProcessing: false,
            pinError: '',
            passwordError: '',
            confirmPasswordError: '',
            finished: false
        }

        this._resetToken = null
    }

    render() {
        return (
            <Screen 
            ref={ref => this.screen = ref}
            emailActive={this.state.emailActive}
            passwordActive={this.state.passwordActive}
            onEmailSubmitted={this.onEmailSubmitted.bind(this)}
            email={this.state.email}
            emailError={this.state.emailError}
            onEmailChanged={this.onEmailChanged.bind(this)}
            pin={this.state.pin}
            password={this.state.password}
            confirmPassword={this.state.confirmPassword}
            onPinChanged={this.onPinChanged.bind(this)}
            onPasswordChanged={this.onPasswordChanged.bind(this)}
            onConfirmPasswordChanged={this.onConfirmPasswordChanged.bind(this)}
            emailProcessing={this.state.emailProcessing}
            passwordProcessing={this.state.passwordProcessing}
            pinError={this.state.pinError}
            passwordError={this.state.passwordError}
            confirmPasswordError={this.state.confirmPasswordError}
            onPasswordSubmitted={this.onPasswordsSubmit.bind(this)}
            finished={this.state.finished}
            goToLogin={this.onLoginRequested.bind(this)}
            />
        )    
    }

    onPinChanged(pin) {
        if(typeof pin == 'string') {
            this.setState({pin: pin.trim()})
        }
    }

    onEmailSubmitted() {
        this.setState({emailProcessing: true}, () => this.sendEmail())
    }

    onPasswordChanged(value) {
        const error = value.length > 0 && value.length < 6 ? 'Password is too short' : ''
        this.setState({password: value, passwordError: error})
    }

    onConfirmPasswordChanged(value) {
        const error = value.length > 0 && value !== this.state.password ? 'Passwords are not the same' : ''
        this.setState({confirmPassword: value, confirmPasswordError: error})
        
    }

    validatePasswords() {
        let valid = true
        let errors = {}
        if(this.state.password.length < 6) {
            valid == false
            errors.passwordError = 'Password is too short'
        }

        if(this.state.confirmPassword !== this.state.password) {
            valid == false
            errors.confirmPasswordError = 'Passwords are not the same'
        }

        if(this.state.pin.length == 0) {
            valid == false
            errors.pinError = 'Please provide a PIN number'
        }

        if(this._resetToken == null) {
            valid == false
            errors.pinError = 'We\'re sorry, unrecognized error has occured.\nPlease, try again later'
        }

        this.setState({...errors})
        return valid
    }

    sendEmail() {
        initializePasswordReset(this.state.email.trim())
        .then(token => {
            this._resetToken = token
            this.onEmailSent()
        })
        .catch(e => this.interpretEmailError(e))
        .finally(() => this.setState({emailProcessing: false}))
    }

    interpretEmailError(e) {
        this.setState({emailError: this.findEmailError(e)})
    }

    findEmailError(e) {
        const defaultError = 'We\'re sorry, unrecognized error has occured.\nPlease, try again later'
        if(typeof e != 'object' || typeof e.code != 'number') {
            return defaultError
        }

        let error = null
        switch (e.code) {
            case UserErrors.userNotFound:
                error = 'Could not find an active user with that email address'
                break
            case UserErrors.accountNotVerified:
            case UserErrors.accountNotActive:
                error = 'We\'re sorry, this account is not active'
                break
            default:
                error = defaultError
                break;
        }
        return error
    }

    onEmailSent() {
        this.screen.deactivateEmail(this.activatePassword.bind(this))
    }

    activatePassword() {
        this.setState({emailActive: false}, () => {
            this.screen.activatePassword(() => this.setState({passwordActive: true}))
        })
    }

    onEmailChanged(email) {
        if(typeof email == 'string') {
            this.setState({email: email.trim()})
        }
    }

    onPasswordsSubmit() {
        if(!this.validatePasswords()) {
            return
        }
        this.setState({passwordProcessing: true}, this.processPasswordReset.bind(this))
    }

    processPasswordReset() {
        resetPassword(this._resetToken, this.state.pin, this.state.password, this.state.confirmPassword)
        .then(this.onSuccess.bind(this))
        .catch(this.interpretPasswordsError.bind(this))
        .finally(() => this.setState({passwordProcessing: false}))
    }

    onSuccess() {
        this.screen.hideForm(() => {
            this.setState({finished: true}, () => this.screen.showCongrats())
        })
    }

    interpretPasswordsError(e) {
        this.setState({pinError: this.findPasswordError(e)})
    }

    findPasswordError(e) {
        const defaultError = 'We\'re sorry, unrecognized error has occured.\nPlease, try again later'
        if(typeof e != 'object' || typeof e.code != 'number') {
            return defaultError
        }
        let err = null
        switch (e.code) {
            case UserErrors.passwordNotFound:
                err = 'Please provide a new password'
                break
            case UserErrors.passwordTooShort:
                err = 'Provided password is too short'
                break
            case UserErrors.passwordsNotTheSame:
                err = 'Provided passwords are not the same'
                break
            case UserErrors.pinExpired:
                err = 'PIN number has expired'
                break
            case UserErrors.invalidPin:
                err = 'Provided PIN number is not valid'
                break
            default:
                err = defaultError
                break
        }
        return err
    }

    onLoginRequested() {
        this.props.navigation.dispatch(StackActions.replace('Login', {email: this.state.email}))
    }
}

export default PasswordResetController