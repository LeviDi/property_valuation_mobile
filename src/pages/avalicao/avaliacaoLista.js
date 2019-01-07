import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import ListaAvaliacaoItem from './avaliacaoItem';
import metrics from '../../styles/metrics'
import { listarAvaliacao } from '../../services/avaliacao'
import Header from '../../components/Header'
import colors from '../../styles/colors'
export default class ListaAvaliacao extends Component {

    //static navigationOptions = ({ navigation }) => ({
      //  header: <Header navigation={navigation} title="Lista de Avaliação" />,
      //  tabBarIcon: tabBarIcon('calendar-search'),
        //tabBarLabel: 'avaliações'
   // })

    constructor(props) {
        super(props)
        this.state = {
            atualizando: false,
            list: []
        };
    }

    atualizarListaAvaliacao = () => {
        let state = this.state
        state.atualizando = true
        this.setState(state)
        listarAvaliacao(this.state)
            .then(data => {
                let newState = this.state
                state.atualizando = false
                state.list = data.result
                this.setState(state)
            })
    }

    componentDidMount() {
        this.atualizarListaAvaliacao()
    }

    avaliacaoDetalhe = (id) => {
        this.props.navigation.navigate('AvaliacaoDetalhe', { id_avaliacao: id })
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    refreshing={this.state.atualizando}
                    onRefresh={() => this.atualizarListaAvaliacao()}
                    data={this.state.list}
                    renderItem={({ item }) => <ListaAvaliacaoItem data={item} callback={this.avaliacaoDetalhe} />}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: metrics.padding.headerPadding,
        backgroundColor: colors.background,
    
    },
});



