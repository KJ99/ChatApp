import React from 'react'
import AppController from './app-controller'
import Screen from '../view/user-screen'

const mapDispatchToProps = dispatch => {
    return {}    
}

const mapStateToProps = state => {
    return {}
}

class UserController extends AppController {
    render() {
        return (
            <Screen />
        )
    }
}

export default UserController