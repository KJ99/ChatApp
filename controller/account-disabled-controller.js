import React from 'react'
import {View, Text} from 'react-native'
import AuthController from './auth-controller'
import Screen from '../view/account-disabled-screen'

const mapDispatchToProps = dispatch => {
    return {}    
}

const mapStateToProps = state => {
    return {}
}

class AccountDisabledController extends AuthController {
    render() {
        const temp = Date.now() + 7 * 24 * 60 * 60 * 1000
        return (
            <Screen
            banExpiration={temp}
            pernament={false}
            reason='hubabuba'/>
        )    
    }
}

export default AccountDisabledController