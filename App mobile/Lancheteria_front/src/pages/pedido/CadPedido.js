import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import apiBack from '../../services/apiBack'


export default function CadPedido(){
    const [clientes, setClientes] = useState([''])
    const [n_pedido, setN_pedido] = useState('')
    const [valor, setValor] = useState('')
    const [status, setStatus] = useState('')
    const [draft, setDraft] = useState('')
    const [entrega, setEntrega] = useState('')
    const [entregador, setEntregador] = useState('')

    const [itens_pedido, setItens_pedido] = useState('')
    const [clienteId, setClienteId] = useState('')

    // useEffect(() => {
    //     async function LoadItens(){
    //         try{
    //             const resposta = await apiBack.get('/ListarItemPedido')
    //             setItens_pedido(resposta.data)
    //         } catch (error){
    //             console.log('Erro ao carregar itens do pedido', error)
    //         }
    //     }
    //     LoadItens()
    // },[])

    useEffect(() => {
        async function LoadClientes(){
            try{
                const clientes = await apiBack.get('/ListarCliente')
                setClientes(clientes.data)
                console.log(setClientes)
            } catch (error){
                console.log('Erro ao carregar clientes', error)
            }
        }
        LoadClientes()
    },[])


    return(
    <div>
        <h1>Fazer Pedido</h1>
        <select
        value={clienteId}
        onChange={(e) => setClienteId(e.target.value)}
        >
            <option>Buscar cliente..</option>
            {clientes.map((cliente) => {
                return(
                    <option
                    value={cliente.id}>
                        {cliente.nome}
                    </option>
                )
            })}
        </select>
        </div>
    )
}