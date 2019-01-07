import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles'
import Button from '../../components/Button'
import Header from '../../components/Header'
import fonts from '../../styles/fonts'
import colors from '../../styles/colors'
import { removerUsuarioLogado } from '../../util'
export default class Perfil extends Component {

    constructor(props) {
        super(props)

    }

    static navigationOptions = ({ navigation }) => ({
        header: <Header title="Perfil" />,
    })

    navCadastroLogin = () => {
        this.props.navigation.navigate('AuthLoading')
    }

    logout = () => {
        removerUsuarioLogado()
            .then(() => {
                this.navCadastroLogin()
            })
            .catch(erro => alert("ERRO: " + erro))
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    <Image
                        style={styles.avatar}
                        //source={{ uri: "https://abrilcasa.files.wordpress.com/2016/11/marco-calux-e-feride-elia.jpeg?quality=95&strip=info&w=923" }}
                        source={require('../../images/background_2.png')}
                    />

                    <View style={styles.profileInfo}>
                        <Text style={[fonts.body1, {color: colors.onSurface}]}>Seu nome irá aparecer aqui</Text>
                        <Text style={fonts.body2}>Aqui será apresentada uma breve descrição do seu perfil</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button callback={this.logout} style={styles.logout}>Sair
                    </Button>
                </View>
            </View>
        );
    }
}