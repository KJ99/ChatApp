import { StyleSheet } from 'react-native'
import { GlobalColors } from '../../assets/colors'

export default StyleSheet.create({
    container: {
        backgroundColor: GlobalColors.background,
        flex: 1,
        
    },

    titleContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },

    messageContainer: {
        flex: 3,
        padding: 20
    },

    logo: {
        width: 128,
        height: 128,
        resizeMode: 'contain'
    },

    message: {
        fontSize: 18
    }
})