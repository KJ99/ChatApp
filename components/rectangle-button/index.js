import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import styles from './styles'

const Themes = {
    Primary: 'primary',
    Secondary: 'secondary'
}

class RectangleButton extends React.Component {
    isThemeValid() {
        return this.props.theme === Themes.Primary || this.props.theme === Themes.Secondary 
    }

    renderButtonContent(title, titleColor) {
        return !this.props.processing ? (
            <Text style={{
                ...styles.title,
                color: titleColor
            }}>
                {title}
            </Text>
        )
        : (
            <ActivityIndicator color={titleColor} />
        )
    }

    render() {
        const primaryColor = this.props.primaryColor || 'black'
        const secondaryColor = this.props.secondaryColor || 'white'
        const theme = this.isThemeValid() ? this.props.theme : Themes.Primary
        const titleColor = theme === Themes.Primary ? secondaryColor : primaryColor
        const backgroundColor = theme === Themes.Primary ? primaryColor : secondaryColor
        let title = this.props.title || 'Hello, World'
        if(this.props.titleUpperCase) {
            title = title.toUpperCase()
        }

        return (
            <TouchableOpacity 
            style={{
                ...styles.button,
                backgroundColor: backgroundColor,
                borderColor: primaryColor,
                width: this.props.width,
                minWidth: this.props.minWidth,
                opacity: this.props.disabled ? 0.5: 1
            }}
            onPress={this.onPress.bind(this)}
            onLongPress={this.onLongPress.bind(this)}
            disabled={this.props.disabled}>
                {this.renderButtonContent(title, titleColor)}
            </TouchableOpacity>
        )
    }

    onPress() {
        if(!this.props.disabled && typeof this.props.onPress == 'function') {
            this.props.onPress()
        }
    }

    onLongPress() {
        if(!this.props.disabled && typeof this.props.onLongPress == 'function') {
            this.props.onLongPress()
        }
    }
}

export default {
    Button: RectangleButton,
    Themes: Themes
}