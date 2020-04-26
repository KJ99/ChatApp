import Token from "./model/token"
import User from "./model/user"
import UserSettings from "./model/user-settings"

const initalState = {
    token: null,
    user: null,
    settings: {

    },
    darkMode: false
}

export const Actions = {
    NEW_TOKEN: 'new token',
    CLEAR_TOKEN: 'clear token',
    SAVE_USER: 'save user',
    CLEAR_USER: 'clear user',
    SETTINGS_LOADED: 'settings loaded',
    CLEAR_SETTINGS: 'clear settings',
    DARK_MODE_ON: 'dark mode on',
    DARK_MODE_OFF: 'dark mode off'
}

const reducer = (state = initalState, action) => {
    switch(action.type) {
        case Actions.NEW_TOKEN:
            if(action.token instanceof Token) {
                state = Object.assign({}, {...state, token: action.token})
            }
            break
        case Actions.CLEAR_TOKEN:
            state = Object.assign({}, {...state, token: initalState.token})
            break
        case Actions.SAVE_USER:
            if(action.user instanceof User) {
                state = Object.assign({}, {...state, user: action.user})
            }
            break
        case Actions.CLEAR_USER:
            state = Object.assign({}, {...state, user: initalState.user})
            break
        case Actions.SETTINGS_LOADED:
            if(action.settings instanceof UserSettings) {
                state = Object.assign({}, {...state, settings: action.settings})
            }
            break
        case Actions.CLEAR_SETTINGS:
            state = Object.assign({}, {...state, settings: initalState.settings})
            break

    }
    return state
} 

export default reducer