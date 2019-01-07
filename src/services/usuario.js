import API from './api'
import axios from 'axios'

export const login = ({ email, password }) => (

    new Promise((resolve, reject) => {

        if (email.length === 0 || password.length === 0)
            reject('Preencha usuário e senha para continuar!' + email + password);
        else {
            if (email == "o4" && password == '123')
                resolve({token:'#token123token$'}) //retornar o objeto mais token do usuario
            else
                reject('Usuário não encontrado')
        }
    })
)

export const UserSignUp = ({ username, email, password, confirm_password }) => {
    return true
}