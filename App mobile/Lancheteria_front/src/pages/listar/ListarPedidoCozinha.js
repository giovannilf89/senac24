import { useState, useEffect } from 'react'
import apiBack from '../../services/apiBack'
import { useParams } from 'react-router-dom';

export default function ListarPedidoCozinha() {
    const [pedido, setPedido] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        async function listarPedidoUnico() {
            try {
                const response = await apiBack.get(`/ListarPedidoUnico/${id}`)
                setPedido(response.data)
            } catch (error) {
                console.error('Erro ao carregar o pedido:', error)
            }
        }
        listarPedidoUnico()
    }, [id])

    async function handleAceitar() {
        try {
            const alteraStatus = 'Em preparação'
            const response = await apiBack.put('/AlteraPedido', {
                n_pedido: pedido.n_pedido,
                alteraStatus
            })
            // Atualiza o estado do pedido com o novo status
            setPedido(prevPedido => ({ ...prevPedido, status: alteraStatus }))
        } catch (error) {
            console.error('Erro ao aceitar o pedido:', error)
        }
    }

    return (
        <div>
            <h1>Pedido Cozinha</h1>
            {pedido && (
                <div>
                    <p>Número do Pedido: {pedido.n_pedido}</p>
                    <p>Status: {pedido.status}</p>
                    <p>Valor Total: {pedido.valor_total}</p>
                    <p>Entregador: {pedido.entregador}</p>
                </div>
            )}
            <button onClick={handleAceitar}>Aceitar pedido</button>
        </div>
    )
}


// CORRIGIR A RENDERIZAÇÂO DO VALOR TOTAL
// Verificar a proxima tela para ser feita