import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import apiBack from '../../services/apiBack'
import Toast, { toast } from 'react-toastify'


export default function CadPedido() {
    const [clientes, setClientes] = useState([''])
    const [clienteId, setClienteId] = useState('')
    const [pedidos, setPedidos] = useState([''])
    const [categorias, setCategorias] = useState([''])
    const [categoriaId, setCategoriaId] = useState('')
    const [produtosCategoria, setProdutosCategoria] = useState([''])

    const [quantidadeF, setQuantidadeF] = useState('')
    const [idItemProduto, setIdItemProduto] = useState('')
    const [itensPedido, setItensPedido] = useState([''])
    const [valorTotal, setValorTotal] = useState('')

    const [modalAberto, setModalAberto] = useState(false)

    useEffect(() => {
        async function LoadClientes() {
            try {
                const clientes = await apiBack.get('/ListarCliente')
                setClientes(clientes.data)
                console.log(setClientes)
            } catch (error) {
                console.log('Erro ao carregar clientes', error)
            }
        }
        LoadClientes()
    }, [])

    useEffect(() => {
        try {
            if (!categoriaId) {
                return
            }
            async function lerProdutosCategoria() {
                const resposta = await apiBack.get(`/ListarProdutosCategoria/${categoriaId}`)
                setProdutosCategoria(resposta.data)
                console.log(setProdutosCategoria)
            }
            lerProdutosCategoria()
        } catch (err) {

        }
    }, [categoriaId])

    async function abrirModal() {
        try {
            const resposta = await apiBack.post('/CriarPedido', {
                clienteId
            })
            setPedidos(resposta.data)
            if (resposta.data.id) {
                setModalAberto(true)
            }

            async function lerCategorias() {
                const resposta = await apiBack.get('/ListarCategorias')
                setCategorias(resposta.data)
            }
            lerCategorias()
        } catch (err) {

        }
    }

    function fecharModal() {
        // try{
        //     const id = pedidos.id
        //     const resposta = await apiBack.put(`/FinalizarPedido/${id}`)
        
        // console.log(resposta)
        setModalAberto(false)
    // } catch(err){
    //     console.log(err)
    // }
}

    async function handleItemPedido(e) {
        try {
            e.preventDefault()
            const prodExt = produtosCategoria.filter((item) => item.id === idItemProduto)
            const valor = Number(prodExt.map((item) => item.preco) * quantidadeF) // converte de string para number
            const quantidade = Number(quantidadeF)
            const pedidoId = pedidos.id
            const produtoId = idItemProduto

            const resposta = await apiBack.post('/CriarItemPedido', {
                produtoId,
                pedidoId,
                quantidade,
                valor
            })
            let dados = {
                id: resposta.data.id,
                produto: resposta.data.produtos.nome,
                quantidade: resposta.data.quantidade,
                valor: Number(resposta.data.valor) // number pq estava vindo como string
            }
            // console.log(dados)
            setItensPedido(oldArray => [...oldArray, dados]) // 3 pontinhos mantem o que tem na let e add mais um (tipo push). Toda vez que add um produto
            // mantem o que tem e add mais um

            toast.success('Produto adicionado com sucesso')
            // console.log(resposta.data)
        } catch (err) {
           toast.error(err.response.data.error)
        }
    }
    // console.log('itensPedido',itensPedido) // ver o que esta sendo salvo no oldarray

    async function handleApagarItem(id){
        try{
            await apiBack.delete(`/DeletarItemPedido/${id}`)
            setItensPedido(itensPedido.filter((item) => item.id !== id))
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        try{
            async function somarItensPedido(){
                const id = pedidos.id
                const resposta = await apiBack.get(`/SomarItensPedido/${id}`)
                setValorTotal(resposta.data)
            }
            somarItensPedido()
        } catch (err){
            console.log(err)
        }
    }, [itensPedido])

    console.log(pedidos)
    return (
        <div>
            <h1>Pedido</h1>
            <select
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
            >
                <option>Selecione o cliente..</option>
                {clientes.map((cliente) => {
                    return (
                        <option
                            value={cliente.id}>
                            {cliente.nome}
                        </option>
                    )
                })}
            </select>
            <button onClick={abrirModal}>Criar Pedido</button>

            {pedidos.length !== 1 && (
                <Modal isOpen={modalAberto}>
                    <h1>Realizar Pedido</h1>
                    <>
                        <h2>Cliente: {pedidos.clientes.nome} </h2>
                        <h2>Numero pedido: {pedidos.n_pedido}</h2>
                        <h1>Itens do pedido</h1>
                        <form onSubmit={handleItemPedido}>
                            <select
                                value={categoriaId}
                                onChange={(e) => setCategoriaId(e.target.value)}
                            >
                                <option>Selecione a categoria</option>
                                {categorias.map((item) => {
                                    return (
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
                                    return (
                                        <option value={item.id}>{item.nome}</option>
                                    )
                                })}
                            </select>
                            <input
                                type='number'
                                placeholder='Quantidade'
                                value={quantidadeF}
                                onChange={(e) => setQuantidadeF(e.target.value)}
                            />
                            <button onClick={handleItemPedido}>Adicionar produto</button>
                        </form>
                        {itensPedido.map((item) => {
                            return (
                                <>
                                <div className='buttonApagar'>
                                    {item.length !== 0 && ( // não mostrar o array vazio (--) dois tracos em cima dos itens
                                        <><h2>{item.produto} - {item.quantidade} - {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(`${item.valor}`)}</h2>
                                        <button onClick={() => handleApagarItem(item.id)}>Apagar</button></>
                                    )}
                                    </div>
                                </>
                            )
                        })}
                        <h1>Valor total: {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(`${valorTotal}`)}</h1>
                    </>
                    <button onClick={fecharModal}>Fechar</button>


                </Modal>
            )}
        </div>
    )
}
