import React from 'react'
import {View, Text} from 'react-native'
import AuthController from './auth-controller'
import Screen from '../view/confirm-account-screen'
import { confirmAccount, resendConfirmationEmail } from '../utility/user-service'
import { unknownError, ConfirmationErrors } from '../errors' 
import {NavigationActions, StackActions} from  '@react-navigation/native'

const mapDispatchToProps = dispatch => {
    return {}    
}

const mapStateToProps = state => {
    return {}
}

class ConfirmAccountController extends AuthController {
    constructor(props) {
        super(props)
        this.state = {
            pin: '',
            pinError: '',
            resendError: false,
            resendMessage: '',
            success: false,
            verificationProcessing: false,
            resendProcessing: false
        }
        this._token = props.route.params.token || 'not found'
        this._email = props.route.params.email || null
    }
    render() {
        return (
            <Screen
                ref={ref => this.screen = ref}
                pin={this.state.pin}
                onChanged={text => this.setState({pin: text.trim()})}
                pinError={this.state.pinError}
                resendError={this.state.resendError}
                resendMessage={this.state.resendMessage}
                onSubmit={this.onConfirmPressed.bind(this)}
                onResend={this.onResendPressed.bind(this)}
                onLoginPressed={this.onLoginPressed.bind(this)}
                resendProcessing={this.state.resendProcessing}
                verificationProcessing={this.state.verificationProcessing}
            />
        )    
    }

    onConfirmPressed() {
        this.setState({verificationProcessing: true}, () => {
            this.processConfirmation()
        })
    }

    processConfirmation() {
        confirmAccount(this._token, this.state.pin)
        .then(() => {
            this.setState({success: true})
            this.screen.finish()
        })
        .catch(this.interpretConfirmationError.bind(this))
        .finally(() => this.setState({verificationProcessing: false}))
    }

    interpretConfirmationError(e) {
        const error = this.findError(e)
        this.setState({pinError: error})
    }

    findError(e) {
        const defaultError = 'We\'re sorry, unrecognized error occured.\nPlease try again later'
        if(typeof e != 'object' || typeof e.code != 'number') {
            return defaultError
        }
        let result = null

        switch (e.code) {
            case ConfirmationErrors.alreadyVerified:
                result = 'This account is already verified'
                break
            case ConfirmationErrors.userNotFound:
                result = 'Could not recognize the user'
                break
            case ConfirmationErrors.pinInvalid:
                result = 'Provided PIN is not valid'
                break
            case ConfirmationErrors.pinExpired:
                result = 'PIN expired. To generate a new one, click \'Resend\''
                break
            default:
                result = defaultError
                break;
        }
        return result
    }

    onResendPressed() {
        this.setState({resendProcessing: true}, () => {
            this.processEmailResend()
        })
    }

    processEmailResend() {
        resendConfirmationEmail(this._email)
        .then(token => {
            this._token = token
            this.setState({resendError: false, resendMessage: `Confirmation email has been resend to ${this._email}`})
        })
        .catch(() => this.setState({resendError: true, resendMessage: 'Could not send a confirmation email'}))
        .finally(() => this.setState({resendProcessing: false}))
    }

    onLoginPressed() {
        this.props.navigation.dispatch(StackActions.replace('Login', {email: this._email}))
    }
}

export default ConfirmAccountController