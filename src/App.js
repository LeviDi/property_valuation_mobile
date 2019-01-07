import React, { Component } from 'react';

import AuthLoadingScreen from './pages/authLoadingScreen'
import CadastroLogin from './pages/cadastroLogin'
import AvaliacaoDetalhe from './pages/avalicao/avalicaoDetalhe'
import ListaAvaliacao from './pages/avalicao/avaliacaoLista'
import Comodo from './pages/imovel/comodo'
import Perfil from './pages/perfil'
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from 'react-navigation'

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import HeaderDrawer from './components/HeaderDrawer'
import colors from './styles/colors'

import tabBarIcon from './components/Tabs/Icon'

/**
 *  1. AuthLoadingScreen       - Primeira tela a ser chamada, verifica se o usuário está logado
 *  2. AuthStackNavigator      - Rota definida para usuário não logado
 *     - CadastroLogin         - Tela apresentada após identificar que o usuário não está logado
 *  3. AppDrawerNavigatior     - Rota definida para usuário logado
 *     - AppStackNavigator     - Permite definir um Cabeçalho comum entre as tabs
 *      - AppTabNavigator      - Definição das tabs 
 *          - ListaAvaliacao   - Primeira tab
 *          - Perfil           - Segunda tab
 *      - AvaliacaoDetalhe     - Tela de detalhes da avaliação
 *      - Comodo               - Tela de cadastro/edição do comodo
 */

/** Navegação definida quando o usuário não está logado */
const AuthStackNavigator = createStackNavigator({
  CadastroLogin: CadastroLogin,
})

/** Navagação entre as tabs */
const AppTabNavigator = createBottomTabNavigator({
  ListaAvaliacao: {
    screen: ListaAvaliacao,
    navigationOptions: {
      tabBarIcon: tabBarIcon('calendar-search'),
      tabBarLabel: 'avaliações'
    }
  },
  Perfil: {
    screen: Perfil,
    navigationOptions: {
      tabBarIcon: tabBarIcon('account-card-details'),
      tabBarLabel: 'perfil',
    }
  },

},
  {
    tabBarOptions: {
      activeTintColor: colors.secondary,
      inactiveTintColor: colors.onPrimary,
      style: { 
        backgroundColor: colors.primary,
             
      },
    }
  }
)

/* Definindo o Header das tabs */
AppTabNavigator.navigationOptions = ({ navigation }) => {
  const { routes, index } = navigation.state;
  let navigationOptions = {};

  switch (routes[index].routeName) {
    case 'ListaAvaliacao':
      navigationOptions.header = (<HeaderDrawer title="Lista de avaliação" navigation={navigation} />)
      break;
    case 'Perfil':
      navigationOptions.header = (<HeaderDrawer title="Perfil" navigation={navigation} />)
      break;
    default:
      navigationOptions.header = null
  }
  return navigationOptions;
}

/** Navagação entre as telas */
const AppStackNavigator = createStackNavigator({
  AppTabNavigator: {
    screen: AppTabNavigator,

    /*
    navigationOptions: ({ navigation }) => ({
      header: <HeaderDrawer title="Cabeçalho comun das tab" navigation={navigation} />
    })
    */

  },
  AvaliacaoDetalhe: {
    screen: AvaliacaoDetalhe
  },
  Comodo: Comodo
})

/** Navegação que incorpora todas as telas, permite acessar o menu em qualquer tela*/
const AppDrawerNavigator = createDrawerNavigator({
  Home: AppStackNavigator
})

export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: AppDrawerNavigator
})