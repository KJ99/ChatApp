import React from 'react'
import {View, Text, TextInput, KeyboardAvoidingView} from 'react-native'
import styles from  './styles'

class AuthInput extends React.Component {
    constructor(props) {
        super(props)
        const inactiveEmptyColor = typeof this.props.inactiveEmptyColor == 'string' ? this.props.inactiveEmptyColor : 'grey'
        const inactiveNonEmptyColor = typeof this.props.inactiveNonEmptyColor == 'string' ? this.props.inactiveNonEmptyColor : 'black'
        this.state = {
            borderColor: typeof props.value == 'string' && props.value.length > 0 ? inactiveNonEmptyColor: inactiveEmptyColor
        }
    }

    render() {
        const value = this.props.value || ''
        return (
            <KeyboardAvoidingView behavior='position' enabled>
                <View style={styles.errorContainer}>
                    <Text style={{
                        ...styles.errorLabel,
                        color: typeof this.props.errorColor == 'string' ? this.props.errorColor : 'red'
                    }}>{this.props.error}</Text>
                </View>
                <TextInput
                editable={typeof this.props.editable == 'boolean' ? this.props.editable : true}
                value={value}
                onChangeText={this.onValueChanged.bind(this)}
                style={{
                    ...styles.input,
                    borderColor: this.state.borderColor,
                    minWidth: this.props.minWidth || 200,
                    width: this.props.width || undefined
                }}
                onFocus={() => {
                    const color = typeof this.props.activeColor == 'string' ? this.props.activeColor : 'blue'
                    this.setState({ borderColor:  color })
                }}
                onBlur={() => {
                    this.props.inactiveNonEmptyColor
                    const color = value.length > 0 
                        ? typeof this.props.inactiveNonEmptyColor == 'string' ? this.props.inactiveNonEmptyColor : 'black' 
                        : typeof this.props.inactiveEmptyColor == 'string' ? this.props.inactiveEmptyColor : 'grey'
                    this.setState({ borderColor: color })
                }}
                secureTextEntry={this.props.secureEntry}
                textContentType={this.props.inputType}
                keyboardType={this.props.keyboardType}
                placeholder={this.props.placeholder}

                />
            </KeyboardAvoidingView>
        )
    }

    onValueChanged(text) {
        if(typeof this.props.onChange == 'function') {
            this.props.onChange(text)
        }
    }

    getValue() {
        return this.props.value
    }
}

export default {
    View: AuthInput
}