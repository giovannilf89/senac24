import {useState, useEffect} from 'react'
import apiBack from '../../services/apiBack'
import { useParams } from 'react-router-dom';

export default function ListarPedidoCozinha(){
    
    const [pedidos, setPedidos] = useState('')
    const { id } = useParams()

    function teste(){
        alert('clicou', id)
    }

    return(
        <><h1>Pedido Cozinha</h1><button onClick={teste}>Clicar</button></>
    )
}

// Paramos aqui, como trazer as infos pelo params