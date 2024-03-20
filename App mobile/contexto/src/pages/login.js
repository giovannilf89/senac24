import { useState, useContext } from 'react'
import { Contexts } from '../Contexts/Contexts'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'

export default function Login() {

    const { handleLogar } = useContext(Contexts)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    
    const navigation = useNavigate()

    async function handleLogin(e) {
        try {
            e.preventDefault()
            if (!email || !senha) {
                toast.warn('Existem campos em branco', {
                    toastId: 'toastId'
                })
                return
            }
            await handleLogar(email, senha)
        } catch (err) {
            console.log('erro',err)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>Email:</label>
                <input
                    type="text"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Senha:</label>
                <input
                    type="text"
                    placeholder='Senha'
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}