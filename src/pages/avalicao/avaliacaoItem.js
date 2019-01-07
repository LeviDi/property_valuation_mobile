import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import Moment from 'moment';
import 'moment/locale/pt-br';
Moment.locale('pt-BR');
import { montarEndereco, styleStatus } from '../../util'



export default class ListaAvaliacaoItem extends Component {

    render() {
        return (

            <View style={styles.container}>
                <TouchableHighlight onPress={() => this.props.callback(this.props.data.id)} underlayColor={colors.primaryLight}>
                    <React.Fragment>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>

                            <View style={{ flex: 1, margin: 10 }}>

                                <View style={{ flex: 1 }}>

                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginTop: 5 }}>
                                        <Text style={[fonts.caption, { color: colors.onSurface }]}>
                                            Solicitada em - {Moment(this.props.data.dtCriacao).format('DD MMMM YYYY')}
                                        </Text>
                                        <Text style={[styleStatus(this.props.data.status), fonts.caption]}> {this.props.data.descricaoStatus}</Text>

                                    </View>

                                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", marginTop: 10 }}>

                                        <View style={{ flexShrink: 1, borderColor: colors.background, borderWidth: 1 }}>
                                            {this.props.data.urlThumbCapa ?
                                                <Image style={styles.imagem} source={{ uri: this.props.data.urlThumbCapa }} />
                                                : <Image style={[styles.imagem, { opacity: 0.2 }]} source={require('../../images/camera.png')} />
                                            }

                                        </View>
                                        <View style={{ flex: 1, marginLeft: 20, marginTop: 5 }}>

                                            
                                            <Text style={[fonts.body2, { color: colors.onSurface, marginBottom: 5 }]}>{this.props.data.proponente ? this.props.data.proponente.nome : null}</Text>
                                       
                                            <Text style={[fonts.subtitle2]}>{montarEndereco(this.props.data.imovel.endereco)}</Text>

                                        </View>
                                    </View>
                                </View>

                            </View>
                            <View style={{ flexShrink: 1 }}>
                                <Icon name="chevron-right" size={24} color={colors.secondary} style={{ marginRight: 5 }} />
                            </View>
                        </View>

                    </React.Fragment>
                </TouchableHighlight>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 2.5,
        marginBottom: 2.5,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: colors.surface,


    },
    imagem: {
        borderRadius: 2,
        width: 120,
        height: 120,
        resizeMode: "cover"
    },
});
