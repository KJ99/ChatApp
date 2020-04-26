import { StyleSheet } from 'react-native'
import { GlobalColors } from '../../assets/colors'

export default StyleSheet.create({
    container: {
        backgroundColor: GlobalColors.background
    },

    titleContainer: {
        height: 200,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    logo: {
        width: 128,
        height: 128,
        resizeMode: 'contain'
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    inputContainer: {
        height: 300,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    inputLabel: {

    },

    pinError: {
        color: GlobalColors.error,
        textAlign: 'center'
    },

    resendContainer: {
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',

    },

    resendLabel: {
        textAlign: 'center',
        marginBottom: 20
    },

    resendResultLabel: {
        marginTop: 20,
        textAlign: 'center'
    },

    successInfoContainer: {
        height: 300,
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    congrats: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    successInfo: {
        fontSize: 16,
        textAlign: 'center'
    },
})