import { useState, useEffect } from 'react'
import apiBack from '../../services/apiBack'
import {Link} from 'react-router-dom'

export default function Cozinha() {

    const [pedidos, setPedidos] = useState([]) // Inicialize com um array vazio

    useEffect(() => {
        async function ListarPedido() {
            const response = await apiBack.get('/ListarPedidos')
            setPedidos(response.data)
        }
        ListarPedido()
    }, []) // Deixe o array de dependências vazio para que useEffect execute apenas uma vez

    return (
        <div>
            <h1>Pedidos</h1>
            {
                pedidos.map((dado, index) => {
                    return (
                       <Link to={`/ListarPedidoUnico/${dado.id}`}> <h2 key={index}>{dado.n_pedido}</h2> </Link> // Adicione um atributo 'key' para cada item renderizado na lista
                    )
                })
            }
        </div>
    )
}
