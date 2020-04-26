
import { StyleSheet, Dimensions } from 'react-native'
import { GlobalColors, AuthColors } from '../colors'

export default StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: GlobalColors.secondaryDarker
    },
    appLogo: {
        width: 256,
        height: 256,

    },

})