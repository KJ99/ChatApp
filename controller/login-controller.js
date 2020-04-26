import React from 'react'
import AuthController from './auth-controller'
import Screen from '../view/login-screen'
import { LoginErrors } from '../errors'
import {NavigationActions, StackActions, CommonActions} from  '@react-navigation/native'
import { login, getCurrentUserData } from '../utility/user-service'
import { saveToken } from '../utility/token-service'
import { connect } from 'react-redux'
import { Actions } from '../reducer'
import Token from '../model/token'

const mapDispatchToProps = dispatch => {
    return {        
        setToken: token => { dispatch({type: Actions.NEW_TOKEN, token: token}) },
        setUser: user => { dispatch({type: Actions.SAVE_USER, user: user}) },
        setUserSettings: settings => { dispatch({type: Actions.SETTINGS_LOADED, settings: settings}) }
    }    
}

const mapStateToProps = state => {
    return {}
}

class LoginController extends AuthController {
    constructor(props) {
        super(props) 
        this.state = {
            username: typeof props.route.params == 'object' && typeof props.route.params.email == 'string' 
                ? props.route.params.email 
                : '',
            password: '',
            error: '',
            usernameError: '',
            passwordError: '',
            processing: false
        }
    }

    render() {
        return (
            <Screen 
            onRegistrationRequested={this.onRegistrationRequested.bind(this)}
            onForgotPasswordRequested={this.onForgotPasswordRequested.bind(this)}
            username={this.state.username}
            password={this.state.password}
            error={this.state.error}
            onUsernameChanged={this.onUsernameChanged.bind(this)}
            onPasswordChanged={this.onPasswordChanged.bind(this)}
            onSubmit={this.onSubmit.bind(this)}
            usernameError={this.state.usernameError}
            passwordError={this.state.passwordError}
            processing={this.state.processing}
            />
        )    
    }

    onUsernameChanged(value) {
        if(typeof value == 'string') {
            this.setState({username: value.trim()})
        }
    }

    onPasswordChanged(value) {
        if(typeof value == 'string') {
            this.setState({password: value.trim()})
        }
    }

    onSubmit() {
        if(this.validate()) {
            this.setState({processing: true}, this.processLogin.bind(this))
        }
    }

    processLogin() {
        login(this.state.username, this.state.password)
        .then(data => {
            if(data.logged) {
                this.onSuccess(data.token)
            } else if(data.accountBanned) {
                this.onAccountDisabled(data.ban)
            } else if(!data.accountVerified) {
                this.onAccountNotVerified(data.email, data._uvs)
            } else {
                throw undefined
            }
        })
        .catch(e => this.interpretPasswordError(e))
        .finally(() => this.setState({processing: false}))
    }

    interpretPasswordError(e) {
        const error = this.findError(e)
        this.setState({error: error})
    }

    findError(e) {
        const defaultError = 'We\'re sorry, unrecognized error has occured\nPlease try again later'
        if(typeof e !== 'object' || typeof e.code !== 'number') {
            return defaultError
        }
        let error = ''
        switch(e.code) {
            case LoginErrors.userNotFound:
                error = 'Could not find user with that\nusername or email'
                break
            case LoginErrors.credentialsNotFound:
                error = 'Could not log in.\nAt least one of required fields is empty'
                break
            case LoginErrors.badCredentials:
                error = 'Could not log in.\nUsername or password is not valid'
                break
            default:
                error = defaultError
                break
        }
        return error
    }

    onRegistrationRequested() {
        this.props.navigation.dispatch(StackActions.push('Register'))
    }

    onForgotPasswordRequested() {
        this.props.navigation.dispatch(StackActions.push('PasswordReset'))
    }

    validate() {
        const usernameError = this.state.username.trim().length == 0 ? 'This field is required' : ''
        const passwordError = this.state.password.length == 0 ? 'This field is required' : ''
        this.setState({usernameError: usernameError, passwordError: passwordError})
        return usernameError.length == 0 && passwordError.length == 0
    }

    onSuccess(token) {
        saveToken(token)
        .then((success) => {
            if(!success) {
                throw 'not saved'
            }
            return getCurrentUserData(token)
        })
        .then(data => {
            this.props.setToken(token)
            this.props.setUser(data.user)
            this.props.setUserSettings(data.settings)
            this.goToApp()
        })
        .catch(e => {
            console.log(e)
            this.setState({error: 'We\'re sorry\nUnrecognized error has occured'})
        })
    }

    onAccountNotVerified(email, verificationToken) {
        this.props.navigation.dispatch(StackActions.push('ConfirmAccount', {token: verificationToken, email: email}))
    }

    onAccountDisabled(ban) {
        this.props.navigation.dispatch(StackActions.push('AccountDisabled', {ban: ban}))
    }

    goToApp() {
        this.props.navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{name: 'App'}]
        }))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginController)