import * as ApiClient from './api-client'
import UserSettings from '../model/user-settings'
import User from '../model/user'

export const confirmAccount = (secret, pin) => {
    return ApiClient.postJson(ApiClient.urls.verification, {secret: secret, pin: pin})
}

export const resendConfirmationEmail = async username => {
    const response = await ApiClient.postJson(ApiClient.urls.verificationResend, {username: username})
    return response._uvs
}

export const initializePasswordReset = async email => {
    const response = await ApiClient.postJson(ApiClient.urls.initPasswordReset, {email: email})
    return response._prs
}

export const resetPassword = async (secret, pin, password, confirmPassword) => {
    return await ApiClient.postJson(ApiClient.urls.passwordReset, {
        secret: secret,
        pin: pin,
        password: password,
        confirmPassword: confirmPassword
    })
}


export const login = async (username, password) => {
    return await ApiClient.postJson(ApiClient.urls.login, {
        username: username,
        password: password
    })
}

export const getCurrentUserData = async token => {
    let data = await ApiClient.getAuthorized(ApiClient.urls.user, token)
    const user = new User(data.user)
    const settings = new UserSettings(data.settings)
    settings.save()
    return {
        user: user,
        settings: settings
    }
}
