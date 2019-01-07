import React, { Component } from 'react'

import {
    View,
    StyleSheet,
    ActivityIndicator
} from 'react-native'

import colors from '../../styles/colors'
import { verificarUsuarioLogado } from '../../util'

class AuthLoadingScreen extends Component {

    constructor(props) {
        super(props)
        this.loadApp()
    }

    loadApp = () => {
        verificarUsuarioLogado()
            .then(resultado => {

                this.props.navigation.navigate(resultado ? 'App' : 'Auth')
            })
            .catch(erro => alert("ERRO: " + erro))
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
        )
    }
}

export default AuthLoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary
    }
})