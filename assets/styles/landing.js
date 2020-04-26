import { StyleSheet, Dimensions } from 'react-native'
import {GlobalColors, AuthColors} from '../colors'

export default StyleSheet.create({
        container: {
            zIndex: 2,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        },
        imageContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        },
        backgroundImage: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            resizeMode: 'cover'
        },
        backgroundImageOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            zIndex: 1,
            backgroundColor: GlobalColors.secondaryDarker,
            opacity: 0.6
        },
        
        headerContainer: {
            flex: 2,
            paddingLeft: 20,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-end'
        },
        
        introContainer: {
            flex: 3,
            padding: 10,
        },

        buttonsContainer: {
            flex: 5,
            padding: 20,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },

        logo: {
            width: 128,
            height: 128,
            marginRight: 10
        },

        titleContainer: {
            height: 128,
            flexDirection: 'column',
            justifyContent: 'center'
        },  

        title: {
            fontWeight: 'bold',
            color: GlobalColors.whiteFontColor,
            fontSize: 30
        },

        intro: {
            color: GlobalColors.lightGreyFontColor,
            fontSize: 16,
            textAlign: 'justify'
        },

        buttonsRow: {
            alignItems: 'center',
            paddingTop: 20
        },
    })