import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './styles'
import fonts from '../../styles/fonts' 

const Botao = (props) => (
    <TouchableOpacity onPress={props.callback ? props.callback : null} style={styles.container}>
        <Text style={[styles.text, fonts.button ]}>{props.children}</Text>
    </TouchableOpacity>
)

export default Botao;