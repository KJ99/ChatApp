import React from 'react'
import { View, Text, Animated } from 'react-native'
import styles from '../../assets/styles/password-reset'
import { GlobalColors } from '../../assets/colors'
import { RectangleButton, AuthInput } from '../../components'

export default class EmailInput extends React.Component {

    renderLabel() {
        return this.props.active 
            ? (
                <Animated.View style={{...styles.emailLabelsContainer, opacity: this.props.controlsOpacity}}>
                    <Animated.Text style={{...styles.emailInputLabel, opacity: this.props.controlsOpacity}}>
                        Enter the email address,{'\n'}that you have used for registration
                    </Animated.Text>
                    <Animated.Text style={{...styles.emailError, opacity: this.props.controlsOpacity}}>
                        {this.props.error}
                    </Animated.Text>
                </Animated.View>
            )
            : null
    }

    renderSubmit() {
        return this.props.active 
            ? (
                <Animated.View style={{...styles.sendEmailButtonContainer, opacity: this.props.controlsOpacity}}>
                    <RectangleButton.Button
                    width={150}
                    title='Continue'
                    primaryColor={GlobalColors.primary}
                    secondaryColor={GlobalColors.whiteFontColor}
                    onPress={this.props.onSubmit}
                    processing={this.props.processing}
                    />
                </Animated.View>
            )
            : null
    }


    render() {
        return (
            <Animated.View style={{...styles.emailInputContainer, paddingTop: this.props.padding}}>
                {this.renderLabel()}
                <AuthInput.View
                width={250}
                placeholder='Email'
                activeColor={GlobalColors.primary}
                inactiveNonEmptyColor={GlobalColors.inputDark}
                inactiveEmptyColor={GlobalColors.inputGrey}
                keyboardType='email-address'
                inputType='emailAddress'
                value={this.props.email}
                onChange={this.props.onEmailChanged}
                editable={this.props.active && !this.props.processing}
                />
                {this.renderSubmit()}
            </Animated.View>
        )
    }
}