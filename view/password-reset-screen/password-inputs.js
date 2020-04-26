import React from 'react'
import { View, Text, Animated } from 'react-native'
import styles from '../../assets/styles/password-reset'
import { GlobalColors } from '../../assets/colors'
import { RectangleButton, AuthInput, PinInput } from '../../components'

export default class PasswordInputs extends React.Component {

    render() {
        return (
            <Animated.View style={{...styles.passwordInputsContainer, opacity: this.props.opacity}}>
                <Text style={styles.pinError}>{this.props.pinError}</Text>
                <View>
                    <Text style={styles.pinLabel}>Enter the 6-digit PIN code{'\n'}That you received with email</Text>
                    <PinInput.View
                    editable={!this.props.processing}
                    length={6}
                    activeColor={GlobalColors.primary}
                    inactiveEmptyColor={GlobalColors.inputGrey}
                    inactiveNonEmptyColor={GlobalColors.inputDark}
                    value={this.props.pin}
                    onChanged={this.props.onPinChanged}
                    />
                </View>
                <AuthInput.View 
                width={150}
                editable={!this.props.processing}
                secureEntry={true}
                placeholder='New password'
                keyboardType='default'
                inputType='newPassword'
                error={this.props.passwordError}
                activeColor={GlobalColors.primary}
                inactiveEmptyColor={GlobalColors.inputGrey}
                inactiveNonEmptyColor={GlobalColors.inputDark}
                value={this.props.password}
                onChange={this.props.onPasswordChanged}
                />
                <AuthInput.View 
                width={150}
                editable={!this.props.processing}
                secureEntry={true}
                placeholder='Confirm a new password'
                keyboardType='default'
                inputType='newPassword'
                error={this.props.confirmPasswordError}
                activeColor={GlobalColors.primary}
                inactiveEmptyColor={GlobalColors.inputGrey}
                inactiveNonEmptyColor={GlobalColors.inputDark}
                value={this.props.confirmPassword}
                onChange={this.props.onConfirmPasswordChanged}
                />
                <RectangleButton.Button
                width={100}
                title='Save'
                primaryColor={GlobalColors.primary}
                secondaryColor={GlobalColors.whiteFontColor}
                processing={this.props.processing}
                onPress={this.props.onSubmit}/>
            </Animated.View>
        )
    }
}