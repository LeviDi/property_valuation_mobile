import React, { Component } from 'react';
import CardImovel from '../../../../components/CardImovel'

export default class DetalheImovel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            detalhe: this.props.detalhe
        }
    }

    render() {
        return (
                this.state.detalhe.itens.map((item, index) => (
                    <CardImovel {...this.props} tipoItem={this.state.detalhe.tipoItem} item={item} key={index} />
                ))       
        )
    }
}