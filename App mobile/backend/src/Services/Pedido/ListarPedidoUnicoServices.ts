import prismaClient from "../../prisma";

interface ListarProdutoUnico {
    pedido: number
}

class ListarPedidoUnicoServices {
    async execute({ pedido}: ListarProdutoUnico) {
        const resposta = await prismaClient.pedido.findUnique({
            where: {
                n_pedido: pedido,
            },
            select: {
                n_pedido: true,
                valor: true,
                clientes: {
                    select: {
                        nome: true
                    }
                }
            }
        })
        return resposta
    }
}

export { ListarPedidoUnicoServices }