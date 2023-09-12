import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

import styles from "./style"

const Button = ({ text, onPress, style, textStyle, children}) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            {
                children
                    ? children
                    : <Text style={[styles.text, textStyle]}>{text}</Text>
            }
        </TouchableOpacity>
    );
};

export default Button;