import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Image,
    Text,
    ScrollView,
    Animated,
} from 'react-native';
import { consultarAvaliacao, atualizarStatusAvaliacao } from '../../../services/avaliacao'
import Header from '../../../components/Header'
import Icon from 'react-native-vector-icons/MaterialIcons'
import DetalheImovel from './detalheImovel/index'
import colors from '../../../styles/colors'
import Loading from '../../../components/Loading'
import fonts from '../../../styles/fonts'
import Button from '../../../components/Button'
import { montarEndereco, styleStatus } from '../../../util'
import { listarTipoComodo } from '../../../services/dadosDominio'
import Moment from 'moment';
import 'moment/locale/pt-br';
Moment.locale('pt-BR');

const { height, width } = Dimensions.get('window')

let loading = false
export default class AvaliacaoDetalhe extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: <Header goBack={true} navigation={navigation} title="Detalhes da Avaliação" />
    })

    constructor(props) {
        super(props)
        this.state = {
            id_avaliacao: this.props.navigation.state.params.id_avaliacao,
            avaliacao: null,
            tiposComodo: []
        }

    }

    avaliacaoExistente = () => (this.state.avaliacao != null)

    componentWillMount() {
        this.scrollY = new Animated.Value(0)

        this.startHeaderHeight = 80
        this.endHeaderHeight = 50

        this.animatedHeaderHeight = this.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [this.startHeaderHeight, this.endHeaderHeight],
            extrapolate: 'clamp'
        })

        this.animatedOpacity = this.animatedHeaderHeight.interpolate({
            inputRange: [this.endHeaderHeight, this.startHeaderHeight],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })
        this.animatedTagTop = this.animatedHeaderHeight.interpolate({
            inputRange: [this.endHeaderHeight, this.startHeaderHeight],
            outputRange: [-30, 0],
            extrapolate: 'clamp'
        })

        this.init()
    }

    init = async () => {
        loading = true
        const data = await listarTipoComodo()
        let state = this.state
        state.tiposComodo = data.result
        const resp = await this.consultarAvaliacao()
        state.avaliacao = resp.data.result
        loading = false
        this.setState(state)
    }

    consultarAvaliacao = () => (
        consultarAvaliacao(this.state.id_avaliacao)
    )

    atualizarStatusAvaliacao = async () => {

        try {
            loading = true
            await atualizarStatusAvaliacao(this.state.id_avaliacao, { status: 7 })
            loading = false
            this.atualizar()
        }
        catch (error) {
            alert('Error: ' + error)
        }
    }

    navComodo = () => {
        this.props.navigation.navigate('Comodo', { id_avaliacao: this.state.id_avaliacao, titulo: "Cadastrar Cômodo" })
    }


    renderDetalhes = () => (
        this.state.avaliacao.imovel.detalhesImovel.map((detalhe, index) => (
            detalhe.itens && detalhe.itens.length > 0 ?
                <View key={index} style={{ flexDirection: "row", alignItems: "center", borderWidth: 1 }}>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Icon name="camera" size={20} style={{ borderWidth: 1 }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ borderWidth: 1 }}>
                            {this.state.tiposComodo.filter(item => item.id == detalhe.tipoItem).map(tipo => tipo.descricao)}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ borderWidth: 1 }}>quantidade {detalhe.itens.length}</Text>
                    </View>
                </View>
                : null
        ))
    )

    atualizar = async () => {
        try {
            loading = true
            this.setState({ avaliacao: null })
            const resp = await this.consultarAvaliacao()

            let state = this.state
            state.avaliacao = resp.data.result
            loading = false
            this.setState(state)
        }
        catch(error){
            loading = false
            alert("Error: " + error)
        }
    }


    componentDidUpdate() {
        if (this.props.navigation.state.params.atualizar) {
            this.props.navigation.state.params.atualizar = false
            this.atualizar()
            return true
        }
    }

    renderComodos = () => (

        <FlatList
            data={this.state.avaliacao.imovel.detalhesImovel}

            getItemLayout={(data, index) => {
                const height = Dimensions.get('window').height;
                return { length: height, offset: height * index, index };
            }}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => <DetalheImovel id_avaliacao={this.state.id_avaliacao} navigationScreen={this.props.navigation} detalhe={item} key={index} />}
            style={{ marginTop: 5 }}
            refreshing={true}
            keyExtractor={(item, index) => item.tipoItem + index}
            extraData={this.state}
        />
    )

    render() {
        return (
            <View style={styles.container}>
                <Loading loading={loading} />

                <View style={{
                    height: 120, backgroundColor: colors.surface, top: 0,

                }}>
                    <View
                        style={{
                            marginHorizontal: 10,
                            position: "relative",

                            opacity: 1,
                            flex: 1,
                        }}>
                        {this.avaliacaoExistente() ?
                            <View style={{
                                flex: 1,
                                justifyContent: "space-around",

                            }}>
                                <View style={{ flexDirection: "row", marginBottom: 15, marginTop: 10, justifyContent: "space-between" }}>
                                    <Text style={[fonts.caption, { color: colors.onSurface }]}>Solicitada em - {Moment(this.state.avaliacao.dtCriacao).format('DD MMMM YYYY')}</Text>
                                    <Text style={[styleStatus(this.state.avaliacao.status), fonts.caption]}> {this.state.avaliacao.descricaoStatus}</Text>
                                </View>

                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[fonts.body1, { color: colors.onSurface }]}>Laudo - {this.state.avaliacao.numeroLaudo}</Text>
                                </View>
                                <View style={[styles.buttonContainer, { alignSelf: "center" }]}>
                                    <Button callback={this.atualizarStatusAvaliacao} style={{}}>Finalizar avaliação</Button>
                                </View>

                            </View>
                            : null}
                    </View>
                </View>

                <ScrollView

                    scrollEventThrottle={16}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }])}
                    showsVerticalScrollIndicator={false}
                    style={{
                        paddingLeft: 5,
                        paddingRight: 5,
                        marginTop: 10,
                    }}>
                    {
                        this.state.avaliacao
                            ?
                            <React.Fragment>
                                <View>

                                    {/*this.state.avaliacao.imovel.detalhesImovel ? this.renderDetalhes() : null*/}
                                </View>

                                <View style={{ marginTop: 10, paddingTop: 30, paddingHorizontal: 10, paddingBottom: 30, backgroundColor: colors.surface }}>

                                    <Text style={[fonts.overline]}>
                                        Proponente:
                                         <Text style={[fonts.body2, { color: colors.onSurface }]}> {this.state.avaliacao.proponente.nome}</Text>

                                    </Text>
                                    <Text style={[fonts.subtitle2, { marginTop: 10 }]}>
                                        {montarEndereco(this.state.avaliacao.imovel.endereco)}
                                    </Text>

                                    <View style={{ width: width - 40, height: 200, marginTop: 20 }}>
                                        {
                                            this.state.avaliacao.urlThumbCapa
                                                ? <Image style={{ flex: 1, height: null, width: null, resizeMode: "cover", borderRadius: 5, borderWidth: 1, borderColor: "#dddddd" }} source={{ uri: this.state.avaliacao.urlThumbCapa }} />
                                                : <Image style={[{ flex: 1, height: null, width: null, resizeMode: "cover", borderRadius: 5, borderWidth: 1, borderColor: "#dddddd", opacity: 0.2 }]} source={require('../../../images/camera.png')} />
                                        }
                                    </View>
                                </View>

                                {this.renderComodos()}
                            </React.Fragment>
                            : null}
                </ScrollView>


                <TouchableOpacity style={styles.botao} onPress={() => this.navComodo()}>
                    <Icon name="add" size={24} style={styles.icon} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,


    },
    imagem: {
        borderRadius: 2,
        width: 100,
        height: 100,
        resizeMode: "cover",
        paddingTop: 5,
        paddingBottom: 5
    },

    header: {
        position: "absolute",
        top: 0,
    },
    botao: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: colors.secondary,
        position: 'absolute',
        bottom: 15,
        right: 20,
        justifyContent: "center",
        elevation: 1,
    },
    backgroundImage: {
        width: 200,
        height: 200,
        opacity: 0.9,
    },
    icon: {
        alignSelf: "center",
        color: colors.onSecondary
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
})
