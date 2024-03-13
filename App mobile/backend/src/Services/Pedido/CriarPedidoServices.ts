import prismaClient from "../../prisma";

interface CriarPedido {
    n_pedido: number
    valor: number
    status: string
    draft: boolean
    entrega: boolean
    entregador: string
    clienteId: string

}

class CriarPedidoServices {
    async execute({ n_pedido, valor, status, draft, entrega, entregador, clienteId }: CriarPedido) {
        // console.log('s1',n_pedido, valor, clienteId)
        const resposta = await prismaClient.pedido.create({
            data: {
                n_pedido,
                valor,
                status,
                draft,
                entrega,
                entregador,
                clienteId
            },
            select:{
                n_pedido: true,
            }
        })
        // console.log(n_pedido, valor, clienteId)
        return {dados: "Pedido cadastrado com sucesso"}
    }

}

export { CriarPedidoServices }