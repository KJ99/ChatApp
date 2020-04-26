import { StyleSheet } from 'react-native'
import { GlobalColors, AuthColors } from '../colors'

export default StyleSheet.create({
    container: {
        backgroundColor: '#f7f8f9'
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
        fontSize: 26,
        fontWeight: 'bold'
    },

    form: {

    },

    formRow: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },

    agreementRow: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },

    agreementControlContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    submitContainer: {
        height: 90,
        flexDirection: 'column',
        alignItems: 'center'
    },

    errorContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    error: {
        fontSize: 18,
        color: GlobalColors.error
    },

    agreementErrorContainer: {
        alignItems: 'center'
    }, 

    agreementError: {
        color: GlobalColors.error
    },

    loginLinkContainer: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    link: {
        color: GlobalColors.link
    }
})