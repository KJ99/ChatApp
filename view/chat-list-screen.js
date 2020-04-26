import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from '../assets/styles/chat-list'

export default class ChatListScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>Chat List</Text>
                <TouchableOpacity onPress={this.props.dupa}><Text>Do something</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.props.dupa2}><Text>Do something else</Text></TouchableOpacity>
            </View>
        )
    }
}