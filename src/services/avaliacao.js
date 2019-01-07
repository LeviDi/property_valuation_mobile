import api from './api'

export const listarAvaliacao = ({ param }) => (

    api.get('/avaliacao?avaliador.id=5b6dcfc45b194bc0853f61b5')
        .then(resp => {
            return resp.data
        })
        .catch(error => { return error })
)

export const consultarAvaliacao = (id_avaliacao) => (

    api.get(`/avaliacao/${id_avaliacao}`)
    /*   
    .then(resp => {
            return resp.data
        })
        .catch(error => { return error })
        */
)

export const cadastrarDetalheImovel = ({ id_avaliacao }, item) => (

    api.post(`/avaliacao/${id_avaliacao}/detalhesimovel`, item)
    /*    
    .then(resp => {
            return resp.data
        })
        .catch(error => { return error })
        */
)

export const postarFotoImovel = ({ id_avaliacao, item, imagem }) => {

    let foto = { imagemBase64: imagem.base64, capa: "S" }
    return api.post(`/avaliacao/${id_avaliacao}/detalhesimovel/${item.id}/fotos`, foto)
        /*
        .then(resp => {
            return resp.data
        })
        .catch(error => { return error })
        */
}

export const deletarDetalheImovel = (id_avaliacao, id_detalhe) => (
    api.delete(`/avaliacao/${id_avaliacao}/detalhesimovel/${id_detalhe}`)
    /*    
    .then(resp => {
            return resp.data
        })
        .catch(error => { return error })
        */
)

export const atualizarStatusAvaliacao = (id_avaliacao, status) => (
    api.patch(`/avaliacao/${id_avaliacao}`, status)
      /*  .then(resp => {
            return resp.data
        })
        .catch(error => { return error })
        */
)

export const alterarDetalheImovel = ({ id_avaliacao, detalhe }) => (
    api.patch(`/avaliacao/${id_avaliacao}/detalhesimovel/${detalhe.item.id}`, { descricao: detalhe.item.descricao })
        
    /*
    .then(resp => {
            return resp.data
        })
        .catch(error => { return error })
        */
)

export const deletarFotoImovel = ({ id_avaliacao, detalhe }, nome_arquivo) => (
    api.delete(`/avaliacao/${id_avaliacao}/detalhesimovel/${detalhe.item.id}/fotos/${nome_arquivo}`)
    /*    
    .then(resp => {
            return true
        })
        .catch(error => { return error })
        */
)