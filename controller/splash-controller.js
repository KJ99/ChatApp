import React from 'react'
import Screen from '../view/splash-screen'
import { getToken, clearToken, saveToken } from '../utility/token-service'
import { StackActions } from '@react-navigation/native'
import { initEncryption } from '../utility/encryption-service'
import { connect } from 'react-redux'
import Token from '../model/token'
import { Actions } from '../reducer'

const mapDispatchToProps = dispatch => {
    return {
        setToken: token => { dispatch({type: Actions.NEW_TOKEN, token: token}) }  
    }    
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

class SplashController extends React.Component {    
    constructor(props) {
        super(props) 
    }

    componentDidMount() {
        if(this.props.token instanceof Token && this.props.token.isValid()) {
            this.goToApp()
        } else {
            this.authorize()
        }
    }

    authorize() {
        initEncryption() 
        .then(() => {
            return getToken()
        })
        .then(token => {
            if(token instanceof Token && token.isValid()) {
                this.props.setToken(token)
                this.goToApp()
            }
            else {
                this.goToAuth()
            }
        })
        .catch(e => {
            console.log(e)
            this.goToAuth()
        })
    }

    render() {
        return (
            <Screen />
        )    
    }

    goToApp() {
        this.finish('App')
    }

    goToAuth() {
        this.finish('Landing')
    }

    finish(route) {
        this.props.navigation.dispatch(StackActions.replace(route))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SplashController)