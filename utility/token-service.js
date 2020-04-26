import { encrypt, decrypt } from './encryption-service'
import KeyStore, {ACCESSIBLE} from 'react-native-secure-key-store'
import Buffer from 'buffer'
import Base64 from 'base-64'
import { RSAKeychain, RSA } from 'react-native-rsa-native'
import Token from '../model/token'


const TAG = 'com.chatapp.keys._wef0p32q_fvw1_12_sq_4'
const COUNT_OF_TOKEN_PARTS = 10

export const getToken = async () => {
    let token
    try {
        const tokenData = await readTokenData()
        token = new Token(parseToken(tokenData))
    } catch(e) {
        token = null
    }
    return token
}

export const saveToken = async token => {
    let result
    try {
        const tokenString = JSON.stringify(token)
        const tokenParts = divideString(tokenString, COUNT_OF_TOKEN_PARTS)
        await saveTokenParts(tokenParts)
        result = true
    }catch(e) {
        result = false
    }
    return result
}

export const clearToken = async () => {
    let result
    try {
        for(let i = 0; i < COUNT_OF_TOKEN_PARTS; i++) {
            await KeyStore.remove(`${TAG}_${i}`)
        }
        result = true
    } catch(e) {
        result = false
    }
    return result
}

const parseToken = data => {
    let token
    try {
        token = JSON.parse(data)
    } catch(e) {
        token = null
    }
    return token
}

const divideString = (base, countOfParts) => {
    const parts = []
    let moment = Math.floor(base.length / countOfParts)
    for(let i = 0 ; i < (countOfParts - 1); i++) {
        const sub = base.substr(moment * i, moment)
        parts.push(sub) 
    }
    parts.push(base.substr((countOfParts - 1) * moment))
    return parts
}

const saveTokenParts = async parts => {
    for(let i = 0; i < parts.length && i < COUNT_OF_TOKEN_PARTS; i++) {
        const encrypted = await encrypt(parts[i])
        await KeyStore.set(`${TAG}_${i}`, encrypted, {accessible: ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY})
    }
}

const readTokenData = async () => {
    const parts = []
    for(let i = 0; i < COUNT_OF_TOKEN_PARTS; i++) {
        const value = await KeyStore.get(`${TAG}_${i}`)
        const decrypted = await decrypt(value)
        parts.push(decrypted)
    }
    return parts.join('')
}