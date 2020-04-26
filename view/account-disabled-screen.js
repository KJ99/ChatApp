import React from 'react'
import { View, Text, Image, ScrollView, SafeAreaView } from 'react-native'
import styles from '../assets/styles/account-disabled'
import { GlobalColors, AuthColors, } from '../assets/colors'
import Moment from 'moment'
import { CONTACT_EMAIL } from 'react-native-dotenv'

export default class ConfirmAccountScreen extends React.Component {
    render() {
        const banExpires = new Moment(this.props.banExpiration)
        const expirationText = this.props.pernament ? 'pernamently' : 'until '.concat(banExpires.format('dddd, MMMM Do YYYY'))
        const reason = this.props.reason
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.titleContainer}>
                    <Image style={styles.logo} source={require('../assets/images/app-icon.png')} />
                    <Text style={styles.title}>We're sorry</Text>
                </View>
                <View style={styles.messageContainer}>
                    <Text style={styles.message}>
                        It seems your account has been blocked
                        <Text style={{fontWeight: 'bold'}}> {expirationText} </Text>
                        for
                        <Text style={{fontWeight: 'bold'}}> {reason}</Text>
                    </Text>
                    <Text>For more information, please contact us: {CONTACT_EMAIL} </Text>
                </View>
            </SafeAreaView>
        )
    }
}