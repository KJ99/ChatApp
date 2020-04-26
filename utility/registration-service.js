import * as ApiClient from './api-client'

export const registerUser = (data) => {
    return new Promise((resolve, reject) => {
        ApiClient.postJson(ApiClient.urls.registration, data)
        .then(data => resolve(data._uvs))
        .catch(e => reject(e))
    })
}