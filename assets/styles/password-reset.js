import { StyleSheet } from 'react-native'
import { GlobalColors } from '../colors'

export default StyleSheet.create({
    container: {
        backgroundColor: GlobalColors.background
    },
    
    header: {
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
        fontSize: 24,
        fontWeight: 'bold'
    },

    emailInputContainer: {
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    sendEmailButtonContainer: {
        paddingTop: 50
    },

    emailInputLabel: {
        fontSize: 16,
        marginBottom: 10,
    },

    passwordInputsContainer: {
        minHeight: 450,
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    pinLabel: {
        fontSize: 16
    },

    pinError: {
        fontSize: 16,
        color: GlobalColors.error
    },

    emailError: {
        fontSize: 14,
        color: GlobalColors.error,
    },

    emailLabelsContainer: {
        alignItems: 'center'
    },

    congratsContainer: {
        height: 500,
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    congratsTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    congratsText: {
        fontSize: 16,
        textAlign: 'center'
    },
})