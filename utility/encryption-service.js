
import { RSAKeychain, RSA } from 'react-native-rsa-native'
import Buffer from 'buffer'
import base64 from 'base-64'

const KEY_TAG = 'com.chatapp.keys._febkefe11ge3ccdf_'

const checkIfKeyExists = async () => {
    let result
    try {
        let key = await RSAKeychain.getPublicKey(KEY_TAG)
        result = true
    }catch(e) {
        result = false
    }
    return result
}

export const initEncryption = async () => {
    let keyExists = await checkIfKeyExists()
    if(!keyExists) {
        await RSAKeychain.generate(KEY_TAG)
    } 
}

export const encrypt = async message => {
    return await RSAKeychain.encrypt(message, KEY_TAG)
}

export const decrypt = async data => {
    return await RSAKeychain.decrypt(data, KEY_TAG)
}
