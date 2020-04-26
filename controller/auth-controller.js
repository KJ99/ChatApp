import React from 'react'
import Token from '../model/token'

export default class AuthController extends React.Component {
    static navigationOptions = {
        header: {
           visible: false,
        }
    }

    goToApp() {
        this.props.navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{name: 'App'}]
        }))
    }
    
    render() {
        return null
    }
}