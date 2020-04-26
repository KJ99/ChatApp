import { StyleSheet } from 'react-native'
import {GlobalColors} from '../colors'

export default StyleSheet.create({
    container: {
        backgroundColor: GlobalColors.background
    },

    titleContainer: {
        height: 200,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    appLogo: {
        width: 128,
        height: 128,
        resizeMode: 'contain'
    },

    title: {
        fontSize: 26,
        fontWeight: 'bold'
    },

    inputsContainer: {
        height: 200,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    submitContainer: {
        height: 100,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    link: {
        color: GlobalColors.link
    },

    errorLabel: {
        color: GlobalColors.error,
        fontSize: 18,
        textAlign: 'center'
    },

    registrationLinkContainer: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    forgotPassword: {
        fontSize: 16,
        margin: 20
    },

    forgotPasswordLink: {
        fontSize: 16,
        color: GlobalColors.link
    },
})