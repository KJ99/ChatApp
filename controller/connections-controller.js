import React from 'react'
import AppController from './app-controller'
import Screen from '../view/connections-screen'

const mapDispatchToProps = dispatch => {
    return {}    
}

const mapStateToProps = state => {
    return {}
}

class ConnectionsController extends AppController {
    render() {
        return (
            <Screen />
        )
    }
}

export default ConnectionsController