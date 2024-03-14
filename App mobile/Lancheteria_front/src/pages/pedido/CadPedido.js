import {useEffect, useState} from 'react'
import Modal from 'react-modal'
import apiBack from '../../services/apiBack'


export default function CadPedido(){
    const [clientes, setClientes] = useState([''])
    const [clienteId, setClienteId] = useState('')
    const [pedidos, setPedidos] = useState([''])
    const [categorias, setCategorias] = useState([''])
    const [categoriaId, setCategoriaId] = useState('')
    const [produtosCategoria, setProdutosCategoria] = useState([''])
 
    const [quantidade, setQuantidade] = useState('')
    const [idItemProduto, setIdItemProduto] = useState('')

    const [modalAberto, setModalAberto] = useState(false)

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

    useEffect(() => {
        try{
            if(!categoriaId){
                return
            }
            async function lerProdutosCategoria(){
                const resposta = await apiBack.get(`/ListarProdutosCategoria/${categoriaId}`)
                setProdutosCategoria(resposta.data)
                console.log(setProdutosCategoria)
            }
            lerProdutosCategoria()
        } catch (err){

        }
    },[categoriaId])

    async function abrirModal(){
        try{
            const resposta = await apiBack.post('/CriarPedido', {
                clienteId
            })
            setPedidos(resposta.data)
            if(resposta.data.id){
                setModalAberto(true)
            }

            async function lerCategorias(){
                const resposta = await apiBack.get('/ListarCategorias')
            setCategorias(resposta.data)
        }
        lerCategorias()
    } catch (err){

    }
    }

    function fecharModal(){
        setModalAberto(false)
    }

    async function handleItemPedido(e){
        e.preventDefault()
        const prodExt = produtosCategoria.filter((item) => item.id === idItemProduto)
        const valor = Number(prodExt.map((item) => item.preco))
    }

    return(
    <div>
        <h1>Pedido</h1>
        <select
        value={clienteId}
        onChange={(e) => setClienteId(e.target.value)}
        >
            <option>Selecione o cliente..</option>
            {clientes.map((cliente) => {
                return(
                    <option
                    value={cliente.id}>
                        {cliente.nome}
                    </option>
                )
            })}
        </select>
        <button onClick={abrirModal}>Criar Pedido</button>
       
    {pedidos.length !== 1&& (
        <Modal isOpen={modalAberto}>
            <h1>Realizar Pedido</h1>
            <>
            <h2>Cliente: {pedidos.clientes.nome}</h2>
            <h2>Numero pedido: {pedidos.n_pedido}</h2>
            <h1>Itens do pedido</h1>
            <form onSubmit={handleItemPedido}>
                <select
                value={categoriaId}
                onChange={(e) => setCategoriaId(e.target.value)}
                >
                    <option>Selecione a categoria</option>
                    {categorias.map((item)=> {
                        return(
                            <option value={item.id}>{item.nome}</option>
                        )
                    })}
                </select>
                <select 
                value={idItemProduto}
                onChange={(e) => setIdItemProduto(e.target.value)}
                >
                    <option>Selecione o produto</option>
                    {produtosCategoria.map((item) => {
                    return(
                        <option value={item.id}>{item.nome}</option>
                    )
                    })}
                </select>
                <input 
                type='number'
                placeholder='Quantidade'
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                />
            </form>
            </>
            <button onClick={fecharModal}>Fechar</button>
        </Modal>
    )}
        </div>
    )
}
