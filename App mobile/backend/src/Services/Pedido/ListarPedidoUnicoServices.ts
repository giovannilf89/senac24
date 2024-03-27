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
            include: {
                clientes: true,
            }
        })
        return resposta
    }
}

export { ListarPedidoUnicoServices }