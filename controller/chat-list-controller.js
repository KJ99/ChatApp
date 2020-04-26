import React from 'react'
import AppController from './app-controller'
import Screen from '../view/chat-list-screen'
import { connect } from 'react-redux'
import * as ApiClient from '../utility/api-client'
import { Actions } from '../reducer'

const mapDispatchToProps = dispatch => {
    return {
        setToken: token => { dispatch({type: Actions.NEW_TOKEN, token: token}) } 
    }    
}

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user,
        settings: state.settings
    }
}

class ChatListController extends AppController {
    render() {
        return (
            <Screen 
            dupa={() => {
                ApiClient.getAuthorized(ApiClient.urls.user, this.props.token, this.props.setToken)
                .then(data => console.log('received'))
                .catch(e => console.log(e))
            }}
            dupa2={() => {
                console.log(this.props.user)
                console.log(this.props.settings)
                console.log(this.props.token)
            }}
            />
        )
    }
    saveToken(token) {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatListController)