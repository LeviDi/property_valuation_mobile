import React, { Component } from 'react';
import {
  View, Text, Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button
} from 'react-native';

import styles from './styles';
import Foto from '../Foto'
import Icon from 'react-native-vector-icons/MaterialIcons'
import fonts from '../../styles/fonts'
import colors from '../../styles/colors';
import { listarTipoComodo } from '../../services/dadosDominio'
import Botao from '../../components/Button'

class CardImovel extends Component {

  constructor(props) {
    super(props)
    scroll = null
    this.state = {
      abrirModalImagem: false,
      fotoSelecionada: 0,
      tipoItem: this.props.tipoItem,
      item: this.props.item,
      tiposComodo: []
    }
  }

  previousImage = () => { this.scroll.scrollTo() }
  nextImage = () => { this.scroll.scrollToEnd() }

  toPascalCase = (value) => (
    value.replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase())
  )

  selecionarImagem = (foto) => {
    this.setState({ fotoSelecionada: foto })
    this.abrirFecharModalImagem(true)
  }

  navComodo = () => {
    const detalhe = {
      tipoItem: this.state.tipoItem,
      item: this.props.item
    }

    this.props.navigationScreen.navigate('Comodo', { id_avaliacao: this.props.id_avaliacao, detalhe: detalhe, titulo: "Editar Cômodo" })
  }

  abrirFecharModalImagem = (visivel) => { this.setState({ abrirModalImagem: visivel }) }

  componentWillMount() {
    listarTipoComodo().then(data => {
      this.setState({ tiposComodo: data.result })
    })
  }


  renderPhoto = () => {

    if (this.state.item.fotos && this.state.item.fotos.length > 0) {
      return this.state.item.fotos.map((foto, index) => (
        <View style={{ justifyContent: "center", marginRight: 15 }} key={index}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => { this.selecionarImagem({ uri: foto.urlFoto }) }}
            style={{
              borderColor: '#dddddd', borderWidth: 0.5,
              borderBottomWidth: 1,
              borderTopWidth: 1, borderRadius: 2, justifyContent: "center"
            }}>
            <View style={{ width: 130, height: 130, }}>
              <View style={{ flex: 1, width: 130, height: 130, }}>
                <Image source={{ uri: foto.urlFoto }}
                  style={{ margin: 4, borderRadius: 2, flex: 1, width: null, height: null, resizeMode: "cover" }} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ))
    } else {
      return <Foto imageUri={require('../../images/camera.png')} name="Remover" />
    }
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View style={[styles.containerTitle, { backgroundColor: colors.primaryLight }]}>
          <Text style={[fonts.subtitle1, { color: colors.onPrimary }]}>
            {this.state.tiposComodo.filter(item => item.id == this.state.tipoItem).map(tipo => tipo.descricao)}
          </Text>
        </View>
        <View style={styles.containerCarousel}>
          <TouchableOpacity onPress={() => this.previousImage()} style={{ padding: 0 }}>
            <Icon name="chevron-left" size={24} color={colors.secondary} />
          </TouchableOpacity>
          {
            <ScrollView
              ref={(scroll) => { this.scroll = scroll }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                justifyContent: "flex-start", flexGrow: 1,
                alignItems: "flex-start", alignContent: "flex-start",
              }}
            >
              {this.renderPhoto()}
              <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.abrirModalImagem}
                onRequestClose={() => { }}>
                <View style={{
                  flex: 1,
                  padding: 30,
                  backgroundColor: 'rgba(32,32,32, 0.8)'
                }}
                >
                  <View style={{ alignItems: "flex-end" }}>
                    <TouchableOpacity onPress={() => this.abrirFecharModalImagem(false)}>
                      <Icon name="close" size={40} style={{ color: '#FFFFFF' }} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
                    <Image source={this.state.fotoSelecionada} style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }} />
                  </View>
                </View>
              </Modal>
            </ScrollView>
          }

          <TouchableOpacity onPress={() => this.nextImage()} style={{ padding: 0 }}>
            <Icon name="chevron-right" size={24} color={colors.secondary} />
          </TouchableOpacity>
        </View>
        <View style={[styles.containerDescription, { marginTop: 15 }]}>
          <Text style={[fonts.caption, { textAlign: "justify" }]}>{this.state.item.descricao}</Text>
        </View>

        <View style={{

          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-around",
          flexShrink: 1,
          marginBottom: 20,
          borderWidth: 0.5,
          padding: 10,
          marginHorizontal: 22,
          borderRadius: 2,
          elevation: 0.8,
          borderColor: "#dddddd"

        }}>
          <TouchableOpacity onPress={() => this.navComodo()}>
            <Text style={[fonts.button, { color: colors.onSecondary }]}><Icon name="border-color" size={24} color={colors.secondary} /> Alterar
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default CardImovel