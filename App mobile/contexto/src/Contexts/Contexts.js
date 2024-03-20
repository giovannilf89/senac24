import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import apiLocal from '../services/apiLocal'




export const Contexts = createContext()

export default function AuthProvider({ children }) {

    const [token, setToken] = useState('NA') // recuperar token e fazer comparacao


    const autenticado = !token // !! nega 2 vezes para inverter a sentença


    // const dados = localStorage.getItem('@tklogin2023')
    // const dado = JSON.parse(dados)
    // console.log('token', dado.token)
    useEffect(() => {
        const dado = localStorage.getItem('@tklogin2023')
        const dados = JSON.parse(dado)
        
        console.log(dados.token)

        // mandar o token para middleware e verificar
    }, [])


    async function handleLogar(email, senha) {
        try {
            const resposta = await apiLocal.post("/AutenticaUsuario", {
                email,
                senha
            })
            if (resposta.data.id) {
                const data = resposta.data // trazer token + outras infos
                // const token = resposta.data.token //somente token
                localStorage.setItem('@tklogin2023', JSON.stringify(data))

                const dado = localStorage.getItem('@tklogin2023') // esta em string
                const dados = JSON.parse(dado) // converte de string para objeto(para pode acessar as infos dentro)
                // console.log(dados) // dados.nome, dados.id pegar o objeto
                const { nome } = dados
                // console.log(nome)

                // const itens = {             // para buscar mais dados dentro do objeto
                //     nome: dados.nome,
                //     token: dados.token
                // }
                // console.log(itens)

                toast.success('Login Efetuado com sucesso')
            }
        } catch (err) {
            toast.error(err.response.data.error)
            return
        }
    }

    return (
        <Contexts.Provider value={{ handleLogar, autenticado, token }}>
            {children}
        </Contexts.Provider>
    )
}