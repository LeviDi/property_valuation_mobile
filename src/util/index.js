import { AsyncStorage } from 'react-native'

export const verificarUsuarioLogado = () => (
    AsyncStorage.getItem('PropertyValuation@id_usuario')
)

export const gravarUsuarioLogado = (id_usuario) => (
    AsyncStorage.setItem('PropertyValuation@id_usuario', id_usuario)
)

export const removerUsuarioLogado = (id_usuario) => (
    AsyncStorage.removeItem('PropertyValuation@id_usuario')
)

export const montarEndereco = (endereco) => (
    `${endereco.logradouro}, ${endereco.numero} ${endereco.complemento} - ${endereco.bairro}, ${endereco.cidade} ${endereco.uf}, ${endereco.cep}`
)

export const styleStatus = (status) => {
    switch (status) {
        case 1:
            return { color: "red" }
        case 6:
            return { color: "rgb(255, 165, 0)" }
        case 7:
            return { color: "green" }
    }
}