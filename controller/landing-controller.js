import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import AuthController from './auth-controller'
import {NavigationActions, StackActions} from  '@react-navigation/native'
import Screen from '../view/landing-screen'

const mapDispatchToProps = dispatch => {
    return {}    
}

const mapStateToProps = state => {
    return {}
}

class LandingController extends AuthController {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <Screen 
            onLoginRequested={this.goToLogin.bind(this)}
            onRegisterRequested={this.goToRegister.bind(this)}
            />
        )    
    }

    goToLogin() {
        this.props.navigation.dispatch(StackActions.push('Login'))
    }

    goToRegister() {
        this.props.navigation.dispatch(StackActions.push('Register'))
    }
}

export default LandingController