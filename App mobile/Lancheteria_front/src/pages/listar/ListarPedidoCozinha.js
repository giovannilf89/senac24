import { useState, useEffect } from 'react'
import apiBack from '../../services/apiBack'
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function ListarPedidoCozinha() {
    const [pedido, setPedido] = useState(null)
    const { id } = useParams()

    const navigation = useNavigate()

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
    
    async function handleFinalizar() {
        try {
            const alteraStatus = 'Pedido pronto'
            const response = await apiBack.put('/AlteraPedido', {
                n_pedido: pedido.n_pedido,
                alteraStatus
            })
            setPedido(prevPedido => ({ ...prevPedido, status: alteraStatus }))
        } catch (error) {
            console.error('Erro ao finalizar o pedido:', error)
        }
    }

    function handleFechar() {
        navigation('/Dashboard')
    }

    return (
        <div>
            <h1>Pedido Cozinha</h1>
            {pedido && (
                <div>
                    <p>Número do Pedido: {pedido.n_pedido}</p>
                    <p>Status: {pedido.status}</p>
                    <p>Valor Total: {pedido.valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    <p>Entregador: {pedido.entregador}</p>
                </div>
            )}
            <button onClick={handleAceitar}>Aceitar pedido</button>
            <button onClick={handleFinalizar}>Pedido finalizado</button>
            <button onClick={handleFechar}>Voltar</button>
        </div>
    )
}
