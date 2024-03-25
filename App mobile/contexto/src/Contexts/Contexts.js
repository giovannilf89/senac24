import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import apiLocal from '../services/apiLocal'




export const Contexts = createContext()

export default function AuthProvider({ children }) {

    const [token, setToken] = useState(false) // recuperar token e fazer comparacao


    const autenticado = !!token // !! nega 2 vezes para inverter a sentença


    async function verificaToken() {
        const iToken = localStorage.getItem('@tklogin2023')
        if (!iToken) {
            setToken(false)
            return
        }
        const { token } = JSON.parse(iToken)

        const resposta = await apiLocal('/ListarUsuarioToken', {
            headers: {
                Authorization: 'Bearer ' + `${token}`
            }
        })
        // console.log('resposta token context',resposta.data.id)
        if (resposta.data.id) {
            setToken(true)
        } else {
            setToken(false)
        }
    }


    async function handleLogar(email, senha) {
        try {
            const resposta = await apiLocal.post("/AutenticaUsuario", {
                email,
                senha
            })
            //console.log(resposta.data)
            if (resposta.data.id) {
                const data = resposta.data // trazer token + outras infos
                // const token = resposta.data.token //somente token
                localStorage.setItem('@tklogin2023', JSON.stringify(data))
                setToken(true)
                toast.success("Login efetuado com sucesso")
            }
        } catch (err) {
            toast.error(err.response.data.error, {
                toastId: 'toastId'
            })
        }
    }

    return (
        <Contexts.Provider value={{ handleLogar, autenticado, verificaToken }}>
            {children}
        </Contexts.Provider>
    )
}