import prismaClient from "../../prisma";

interface ListarPedidoUnico {
    id: string
}

class ListarPedidoUnicoServices {
    async execute({ id }: ListarPedidoUnico) {
        const resposta = await prismaClient.pedido.findUnique({
            where: {
                id: id
            },
            select: {
                n_pedido: true,
                status: true,
                valor_total: true,
                entregador: true
            }
        })
        return resposta
    }
}

export { ListarPedidoUnicoServices }