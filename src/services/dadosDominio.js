import api from './api'

export const listarTipoComodo = () => (

    api.get('/utils/tipodetalheimovel')
        .then(resp => {
            return resp.data
        })
)