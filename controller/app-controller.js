import React from 'react'
import Token from '../model/token'
import { CommonActions } from '@react-navigation/native'

export default class AppController extends React.Component {
    static navigationOptions = {
        header: {
           visible: false,
        }
    }
    

    goToAuth() {
        this.props.navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{name: 'Landing'}]
        }))
    }

    render() {
        return null
    }
}