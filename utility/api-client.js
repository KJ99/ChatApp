import {API_HOST} from 'react-native-dotenv'
import Token from '../model/token'
import { InternalRequestErrors } from '../errors'
import { saveToken } from './token-service'

const unknownError = {code: 999, message: 'unknown error'}

export const urls = {
    registration: `${API_HOST}/register`,
    verification: `${API_HOST}/verify`,
    verificationResend: `${API_HOST}/verify/resend`,
    initPasswordReset: `${API_HOST}/auth/password/reset/init`,
    passwordReset: `${API_HOST}/auth/password/reset`,
    login: `${API_HOST}/auth/login`,
    user: `${API_HOST}/user`,
    userSettings: `${API_HOST}/user/settings`,
    refreshToken: `${API_HOST}/auth/refresh`,

}

const sendRequest = (url, requestInfo) => {
    return new Promise((resolve, reject) => {
        let responseCode = 0
        fetch(url, requestInfo)
        .then(response => {
            responseCode = response.status
            const contentType = response.headers.get('content-type')
            const isJson = typeof contentType == 'string' && contentType.toLowerCase().indexOf('application/json') >= 0
            if(isJson) {
                return response.json()
            } else {
                throw unknownError
            }
        })
        .then(data => {
            if(responseCode >= 200 && responseCode < 300) {
                resolve(data)
            } else {
                reject(data)
            }
        })
        .catch(e => {
            reject(e)
        })
    })
}

const sendPostRequest = (url, conentType, body, token = new Token()) => {
    return sendRequest(url, {
        method: 'post',
        headers: {
            'accept': 'application/json',
            'content-type': conentType,
            'authorization': token.getToken()
        }, 
        body: body
    })
}

const sendGetRequest = (url, token = new Token()) => {
    return sendRequest(url, {
        method: 'get',
        headers: {
            'accept': 'application/json',
            'authorization': token.getToken()
        }
    })    

}

export const postJson = (url, data = {}, token = new Token()) => {
    return sendPostRequest(url, 'application/json', JSON.stringify(data), token)
}

export const postMultipart = (url, data = new FormData(), token = new Token()) => {
    return sendPostRequest(url, 'multipart/form-data', data, token)
}

export const get = (url, token = new Token()) => {
    return sendGetRequest(url, token)
}

export const postAuthorized = async (url, data, token, saveTokenToRedux) => {
    if(typeof url != 'string') {
        throw InternalRequestErrors.urlNotFound
    }
    if(!(token instanceof Token)) {
        throw InternalRequestErrors.tokenNotFound
    }
    if(typeof data == 'undefined') {
        throw InternalRequestErrors.dataNotFound
    }
    if(!(data instanceof FormData) && typeof data != 'object') {
        throw InternalRequestErrors.invalidDataFormat
    }
    if(!token.isValid() && token.hasRefresh()) {
        console.log('refresh token')
        token = await postJson(urls.refreshToken, {refresh: token.getRefresh()}, token)
        saveTokenToRedux(token)
        saveToken(token).catch(e => console.log('could not save token'))
    }
    return data instanceof FormData ? postMultipart(url, data, token) : postJson(url, data, token)
}

export const getAuthorized = async (url, token, saveTokenToRedux) => {
    // console.log(token)
    if(typeof url != 'string') {
        throw InternalRequestErrors.urlNotFound
    }
    if(!(token instanceof Token)) {
        throw InternalRequestErrors.tokenNotFound
    }
    // console.log(token.isValid())
    if(!token.isValid() && token.hasRefresh()) {
        console.log('refresh token')
        // console.log(token.getExpirationTime() - Date.now())
        const tokenData = await postJson(urls.refreshToken, {refresh: token.getRefresh()}, token)
        saveToken(tokenData).catch(e => console.log('could not save token'))
        token = new Token(tokenData)
        if(typeof saveTokenToRedux == 'function') {
            saveTokenToRedux(token)
        }
    }
    return get(url, token)
}

const resolveToken = async (token) => {
    
}
