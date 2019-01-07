import React, { Component } from 'react'
import {
    View, Text, TextInput, StyleSheet,
    Modal, Button, ScrollView,
    TouchableOpacity, FlatList
} from 'react-native'
import Camera from '../../components/Camera'
import { listarTipoComodo } from '../../services/dadosDominio'
import Loading from '../../components/Loading'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Foto from '../../components/Foto'
import Header from '../../components/Header'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import {
    cadastrarDetalheImovel,
    alterarDetalheImovel,
    deletarDetalheImovel,
    postarFotoImovel,
    deletarFotoImovel

} from '../../services/avaliacao'

let loading = false
export default class Comodo extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: <Header goBack={true} navigation={navigation} title={navigation.state.params.titulo} />
    })

    constructor(props) {
        super(props);
        this.state = {
            modalVisivel: false,
            comboComodoAberto: false,
            imagem: null,
            quantidadeFotos: 0,
            arrayImagem: [],
            alterarDescricao: false,
            id_avaliacao: this.props.navigation.state.params.id_avaliacao,
            detalhe: {
                tipoItem: null,
                item: {
                    descricao: null,
                    id: null
                }
            },
            tiposComodo: [
            ]
        }
    }

    componentWillMount() {
        listarTipoComodo()
            .then(data => {
                let tiposComodo = data.result
                tiposComodo.unshift({ id: null, descricao: "Selecione" })
                this.setState({ tiposComodo: tiposComodo })
            })
            .catch(error => { alert('Erro: ' + error) })
    }


    componentDidMount() {
        if (this.props.navigation.state.params.detalhe) {
            let state = this.state
            state.detalhe = this.props.navigation.state.params.detalhe
            this.setState(state)
        }
    }

    deletarDetalheImovel = async () => {
        try {

            loading = true
            await deletarDetalheImovel(this.state.id_avaliacao, this.state.detalhe.item.id)
            loading = false
            this.navDetalheAvaliacao()
        }
        catch(error){
            loading = false
            alert("Erro: " + error)
        }
    }

    navDetalheAvaliacao = () => {
        this.props.navigation.navigate("AvaliacaoDetalhe", { atualizar: true })
    }


    salvar = async () => {

        try {
            loading = true
            if (this.validarCamposObrigatorios()) {

                //Se ID existir é uma alteração, caso contrário é um novo cadastro
                if (this.state.detalhe.item.id) {
                    if (this.state.alterarDescricao)
                        await alterarDetalheImovel(this.state)

                    if (this.state.arrayImagem.length > 0) {
                        await this.postarFoto()
                    }
                    loading = false
                    this.navDetalheAvaliacao()
                }
                else {
                    const resp = await this.cadastrarDetalheImovel()

                    if (this.state.arrayImagem.length > 0) {
                        let state = this.state
                        state.detalhe.item.id = resp.data.result.id
                        this.setState(state)

                        await this.postarFoto()
                    }
                    loading = false
                    this.navDetalheAvaliacao()

                }
            } else {
                alert("Preencha o Tipo do cômodo e descrição para realizar o cadastro")
            }
        }
        catch (error) {
            loading = false
            alert('Erro: ' + error)
        }
    }

    /*
    alterarDetalheImovel = () => {
        return alterarDetalheImovel(this.state)
    }
    */

    validarCamposObrigatorios = () => (
        this.state.detalhe.tipoItem && this.state.detalhe.tipoItem != "Selecione" && this.state.detalhe.item.descricao
    )

    cadastrarDetalheImovel = () => {
        const item = { tipoItem: this.state.detalhe.tipoItem, descricao: this.state.detalhe.item.descricao }
        return cadastrarDetalheImovel(this.state, item)
    }

    abrirFecharModal = (visible) => { this.setState({ modalVisivel: visible }) }

    arrayFoto = (data) => {
        let state = this.state
        state.arrayImagem.push(data)
        this.setState(state)
        this.abrirFecharModal(false)
    }

    alterarDescricaoComodo = (descricao) => {
        let state = this.state
        state.detalhe.item.descricao = descricao
        state.alterarDescricao = true
        this.setState(state);
    }

    alterarTipoComodo = (id) => {
        let state = this.state
        state.detalhe.tipoItem = id
        state.comboComodoAberto = false
        this.setState(state);
    }

    removerFoto = async (urlFoto, index, removerFotoCadastrada) => {
        try {

            loading = true
            let state = this.state

            if (removerFotoCadastrada) {
                const array = urlFoto.split('/')
                const nome_arquivo = array[array.length - 1]
                await deletarFotoImovel(this.state, nome_arquivo)

                state.detalhe.item.fotos.splice(index, 1)
                loading = false
                this.setState(state)

            } else {
                state.arrayImagem.splice(index, 1)
                loading = false
                this.setState(state)
            }
        }
        catch (error) {
            loading = false
            alert('Erro: ' + error)
        }
    }

    postarFoto = () => (
        new Promise((resolve, reject) => {

            if (this.state.arrayImagem && this.state.arrayImagem.length > 0) {
                this.state.arrayImagem.map(imagem => {
                    let payload = { id_avaliacao: this.state.id_avaliacao, item: this.state.detalhe.item, imagem: imagem }
                    postarFotoImovel(payload)
                        .then(data => { resolve() })
                        .catch(error => { reject() })
                })
            } else {
                resolve()
            }
        })
    )

    renderFotos = () => {
        if (this.state.arrayImagem.length > 0) {
            return this.state.arrayImagem.map((foto, index) => (
                <Foto actions={true} imageUri={foto} key={index} callback={() => { this.removerFoto(foto.urlFoto, index) }} />
            ))
        } else
            return null
    }

    renderFotosCadastradas = () => {
        if (this.state.detalhe.item.fotos && this.state.detalhe.item.fotos.length > 0) {
            return this.state.detalhe.item.fotos.map((foto, index) => (
                <Foto actions={true} imageUri={{ uri: foto.urlFoto }} key={index} callback={() => { this.removerFoto(foto.urlFoto, index, { removerFotoCadastrada: true }) }} />
            ))
        } else
            return null
    }

    renderTiposComodo = () => {
        return (<FlatList
            data={this.state.tiposComodo}

            getItemLayout={(data, index) => {
                const height = 10
                return { length: height, offset: height * index, index };
            }}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => <Text style={[fonts.body2, { marginBottom: 10, color: colors.secondary }]} onPress={() => { this.alterarTipoComodo(item.id) }} key={item.id}>{item.descricao} </Text>}
            style={{ marginTop: 5 }}

            keyExtractor={(item) => item.id}

        />
        )
    }

    retornarDescricaoComodo = () => {
        return this.state.tiposComodo.filter(tipo => tipo.id == this.state.detalhe.tipoItem)[0].descricao
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Loading loading={loading} progressoInicio={0} progressoFim={this.state.quantidadeFotos} />
                    <View style={{ marginBottom: 20, marginLeft: 30, marginRight: 30, marginTop: 30 }}>


                        <Text style={[fonts.button]} >Tipo do cômodo</Text>


                        <TouchableOpacity disabled={!!this.state.detalhe.item.id} onPress={() => { this.setState({ comboComodoAberto: true }) }}>
                            <View style={{ borderRadius: 5, borderWidth: 0.5, borderColor: colors.primaryLight, width: 140, flexDirection: "row", alignItems: "center" }}>

                                <Text style={{ width: 80, marginLeft: 5 }}>{this.state.tiposComodo.length > 0 ? this.retornarDescricaoComodo() : "Selecione"}</Text>

                                <Icon name="arrow-drop-down" size={24} color={colors.secondary} style={{ marginLeft: 30 }} />
                            </View>

                        </TouchableOpacity>


                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.comboComodoAberto}
                        style={{ backgroundColor: "green" }}
                        onRequestClose={() => { }}>

                        <View style={{ flex: 1, justifyContent: "flex-end" }}>
                            <View style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingTop: 20, backgroundColor: colors.primaryDark, height: "50%" }}>
                                <Text style={[fonts.body1, { color: colors.onPrimary, alignSelf: "center" }]}>Selecione um tipo de cômodo</Text>
                                <View style={{ marginTop: 15, borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingVertical: 20, paddingHorizontal: 20, backgroundColor: colors.primary }}>
                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                    >
                                        {this.renderTiposComodo()}
                                    </ScrollView>
                                </View>
                            </View>
                        </View>

                    </Modal>
                    <View style={{ marginLeft: 30, marginRight: 30 }}>
                        <Text style={[fonts.button]}>Descrição do cômodo</Text>
                        <TextInput textAlignVertical="top"
                            multiline={true}
                            numberOfLines={4}
                            underlineColorAndroid="transparent"
                            style={{ borderWidth: 1, height: 100, marginTop: 15, marginBottom: 15 }}
                            placeholder="Descrição do cômodo"
                            value={this.state.detalhe.item.descricao}
                            onChangeText={this.alterarDescricaoComodo} />
                    </View>
                    <View style={styles.containerFotos}>
                        <Text style={{ marginLeft: 10 }}>Fotos</Text>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={16}

                        >
                            <Foto />
                            {this.renderFotosCadastradas()}
                            {this.renderFotos()}
                            <TouchableOpacity style={styles.botao} onPress={() => this.abrirFecharModal(true)}>
                                <Icon name="camera-alt" size={40} style={styles.icon} />
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    <View style={styles.containerAcoes}>
                        {this.state.detalhe.item.id ?
                            <TouchableOpacity onPress={() => this.deletarDetalheImovel()} style={styles.containerBotaoCadastrar}>
                                <Text style={[fonts.Button, { color: colors.onSecondary }]}>Excluir</Text>
                            </TouchableOpacity>
                            : null}
                        <TouchableOpacity onPress={() => this.salvar()} style={styles.containerBotaoCadastrar}>
                            <Text style={[fonts.Button, { color: colors.onSecondary }]}>Salvar</Text>
                        </TouchableOpacity>

                    </View>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisivel}
                        onRequestClose={() => this.abrirFecharModal(false)}>
                        <Camera callback={this.arrayFoto} />

                        <Button title="Fechar" onPress={() => this.abrirFecharModal(false)} />

                    </Modal>
                </ScrollView>
            </View >

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF"
    },
    containerFotos: {
        height: 160,
        marginLeft: 30, marginRight: 30,
    },
    botao: {
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 80,
        borderColor: colors.secondary,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        alignSelf: "center",
        marginLeft: 30,
        position: 'absolute',
    },
    icon: {
        color: colors.secondary
    },
    containerAcoes: {
        marginLeft: 30,
        marginRight: 30,
        width: 'auto',
        alignSelf: 'center',
        marginTop: 50,
        flexDirection: "row"
    },
    containerBotaoCadastrar: {
        backgroundColor: colors.secondary,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 15,
        height: 31,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
});
