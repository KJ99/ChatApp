import React from 'react'
import { View, Text, Animated } from 'react-native'
import styles from '../../assets/styles/confirm-account'
import { GlobalColors, AuthColors, } from '../../assets/colors'
import { PinInput, RectangleButton } from '../../components'


export default class PinForm extends React.Component {
    
    renderPinError() {
        return typeof this.props.pinError == 'string' && this.props.pinError.length > 0
            ?  <Text style={styles.pinError}>{this.props.pinError}</Text>
            : null
    }

    render() {
        const resendMessageColor = this.props.resendError ? GlobalColors.error : GlobalColors.primary
        return (
            <Animated.View style={{opacity: this.props.opacity}}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Enter the 6-digit PIN code, that you received with email</Text>
                    {this.renderPinError()}
                    <PinInput.View
                    length={6}
                    inactiveEmptyColor={GlobalColors.inputGrey}
                    inactiveNonEmptyColor={GlobalColors.primary}
                    activeColor={GlobalColors.primary}
                    value={this.props.pin}
                    onChanged={this.props.onChanged}
                    />
                    <RectangleButton.Button 
                    title='Confirm'
                    width={150}
                    primaryColor={GlobalColors.primary}
                    secondaryColor={GlobalColors.whiteFontColor}
                    onPress={this.props.onSubmit}
                    processing={this.props.verificationProcessing}
                    disabled={this.props.verificationProcessing}
                    />
                </View>
                <View style={styles.resendContainer}>
                    <Text style={styles.resendLabel}>You have not received an email? Click the button below to resend an email</Text>
                    <RectangleButton.Button 
                    title='Resend'
                    theme={RectangleButton.Themes.Secondary}
                    width={150}
                    primaryColor={GlobalColors.primary}
                    secondaryColor={GlobalColors.whiteFontColor}
                    onPress={this.props.onResend}
                    processing={this.props.resendProcessing}
                    disabled={this.props.resendProcessing}
                    />
                    <Text style={{
                        ...styles.resendResultLabel,
                        color: resendMessageColor
                    }}>
                        {this.props.resendMessage}
                    </Text>
                </View>
            </Animated.View>
        )
    }
}