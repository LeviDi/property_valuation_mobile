import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground,
  Text,
} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation'

import styles from './styles';
import { gravarUsuarioLogado } from '../../util'
import { login } from '../../services/usuario'

export default class CadastroLogin extends Component {

  static navigationOptions = {
    title:'',
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      isSignUp: false,
      error: ''
    }
  }

  static navigationOptions = ({ navigation }) => ({
    header: null
  })

  handleUsernameChange = (username) => {
    this.setState({ username });
  }

  handleEmailChange = (email) => {
    this.setState({ email });
  }

  handlePasswordChange = (password) => {
    this.setState({ password });
  }

  handleconfirmPasswordChange = (confirm_password) => {
    this.setState({ confirm_password });
  }

  navListaAvaliacao = () => {

    this.props.navigation.navigate('ListaAvaliacao')

    /*
    this.props.navigation.dispatch(StackActions.reset({
      index:0,
      actions:[
        NavigationActions.navigate({routeName: 'ListaAvaliacao'})
       ]
    }))
    */
  }

  handleSignUpPress = async () => {
    alert("Email" + this.state.email + "Senha" + this.state.password)
  }

  handleSignInPress = () => {
    login(this.state)
      .then(resultado => {
        gravarUsuarioLogado(resultado.token).then(() => {
          this.navListaAvaliacao()
        })
      })
      .catch(error => alert(error))
  }

  toggleForm = () => {
    let state = { ...this.state }
    state.isSignUp = !this.state.isSignUp
    this.setState(state)
  }

  renderEmailSenha = () => (
    <React.Fragment>
      <TextInput hiden underlineColorAndroid="transparent" style={styles.input} placeholder="email"
        onChangeText={this.handleEmailChange}
        autoCapitalize="none"
        autoCorrect={false} />

      <TextInput secureTextEntry={true} underlineColorAndroid="transparent" style={styles.input} placeholder="senha"
        onChangeText={this.handlePasswordChange}
        autoCapitalize="none"
        autoCorrect={false} />
    </React.Fragment>
  )

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../images/background_2.png')} style={styles.backgroundImage}>
          <View style={styles.content}>
            <Text style={styles.logo}>- Avalição -</Text>
            {
              this.state.isSignUp
                ?
                <React.Fragment>
                  <View style={styles.inputContainer}>

                    <TextInput underlineColorAndroid="transparent" style={styles.input} placeholder="nome completo"
                      onChangeText={this.handleUsernameChange}
                      autoCapitalize="none"
                      autoCorrect={false} />

                    {this.renderEmailSenha()}

                    <TextInput secureTextEntry={true} underlineColorAndroid="transparent" style={styles.input} placeholder="confirmar senha"
                      onChangeText={this.handleconfirmPasswordChange}
                      autoCapitalize="none"
                      autoCorrect={false} />

                  </View>
                  <TouchableOpacity style={styles.buttonContainer} onPress={this.handleSignUpPress}>
                    <Text style={styles.buttonText}>Cadastre-se</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.toggleForm()}>
                    <Text style={styles.textLink}>Efeutar login</Text>
                  </TouchableOpacity>
                </React.Fragment>
                :
                <React.Fragment>
                  <View style={styles.inputContainer}>

                    {this.renderEmailSenha()}

                  </View>
                  <TouchableOpacity style={styles.buttonContainer} onPress={this.handleSignInPress}>
                    <Text style={styles.buttonText}>Enviar</Text>
                  </TouchableOpacity>
                  {/*
                  <TouchableOpacity onPress={() => this.toggleForm()}>
                    <Text style={styles.textLink}>Criar conta</Text>
                  </TouchableOpacity>
                  */}
                </React.Fragment>
            }
          </View>
        </ImageBackground>
      </View>
    )
  }
}
