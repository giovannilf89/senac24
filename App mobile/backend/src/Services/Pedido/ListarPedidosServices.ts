import prismaClient from "../../prisma";


class ListarPedidoServices {
    async execute() {
        const pedidos = await prismaClient.pedido.findMany({})
        return pedidos
    }
}

export { ListarPedidoServices }