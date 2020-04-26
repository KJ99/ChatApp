import React from 'react'
import {KeyboardAvoidingView, TextInput, Text} from 'react-native'
import styles from './styles'

class PinInput extends React.Component {
    constructor(props) {
        super(props)
        const inactiveEmptyColor = typeof props.inactiveEmptyColor == 'string' ? props.inactiveEmptyColor : 'grey'
        const inactiveNonEmptyColor = typeof props.inactiveNonEmptyColor == 'string' ? props.inactiveNonEmptyColor : 'black'
        const value = typeof props.value == 'string' ? props.value : ''
        this.state = {
            borderColor: value.length > 0 ? inactiveNonEmptyColor : inactiveEmptyColor
        }
    }
    
    generatePlaceholder(length) {
        let zeros = []
        for(let i = 0; i < length; i++) {
           zeros.push('0')
        }
        return zeros.join(' ')
    }

    render() {
        const length = typeof this.props.length == 'number' ? this.props.length : 4 
        const width = length * 30
        const placeholder = this.generatePlaceholder(length)
        const activeColor = typeof this.props.activeColor == 'string' ? this.props.activeColor : 'black'
        const inactiveEmptyColor = typeof this.props.inactiveEmptyColor == 'string' ? this.props.inactiveEmptyColor : 'grey'
        const inactiveNonEmptyColor = typeof this.props.inactiveNonEmptyColor == 'string' ? this.props.inactiveNonEmptyColor : 'black'
        const errorColor = typeof this.props.errorColor == 'string' ? this.props.errorColor : 'red'
        const value = typeof this.props.value == 'string' ? this.props.value : ''
        return (
            <KeyboardAvoidingView behavior='padding' enabled>
                <Text style={{
                    color: errorColor
                }}>
                    {this.props.error}
                </Text>
                <TextInput 
                editable={typeof this.props.editable == 'boolean' ? this.props.editable : true}
                value={value}
                onChangeText={this.props.onChanged}
                style={{
                    ...styles.input,
                    width: width,
                    borderColor: this.state.borderColor
                }}
                textContentType='oneTimeCode' 
                keyboardType='numeric' 
                maxLength={length}
                placeholder={placeholder}
                onFocus={() => {
                    this.setState({borderColor: activeColor})
                }}
                onBlur={() => {
                    const color = value.length > 0 ? inactiveNonEmptyColor : inactiveEmptyColor
                    this.setState({borderColor: color})
                }} />
            </KeyboardAvoidingView>
        )
    }
}

export default {
    View: PinInput
}