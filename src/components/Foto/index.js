import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import colors from '../../styles/colors'

export default class Foto extends Component {
    render() {
        return (
            <View style={{
                height: 140,
                width: 140,
                marginRight: 15,
            }}>
                <View style={styles.container}>
                    <View style={styles.containerImagem}>
                        <Image source={this.props.imageUri} style={styles.imagem} />
                    </View>
                </View>
                {
                    this.props.actions && this.props.actions === true
                        ?


                        <TouchableOpacity style={styles.acoes} onPress={this.props.callback}>
                            <Icon name="clear" size={15} color={colors.secondary} />
                        </TouchableOpacity>

                        :
                        null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: '#dddddd',
        borderRadius: 5,
        margin: 5,
        
    },
    containerImagem: {
        flex: 1
    },
    imagem: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "cover",
        borderRadius: 5
    },
    acoes: {
        justifyContent: "center",
        width: 20,
        height: 20,
        backgroundColor: colors.surface,
        borderColor: colors.onSurface,
        borderWidth: 0.5,
        position: "absolute",
        top: 0,
        right: 0,
        alignItems: "center",
        borderRadius: 20
    }
})