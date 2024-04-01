import prismaClient from "../../prisma";

interface AlteraPedido {
    n_pedido: number
    alteraStatus: string
    alteraEntregador: string
}

class AlterarPedidoServices {
    async execute({ n_pedido, alteraStatus, alteraEntregador }: AlteraPedido) {
        await prismaClient.pedido.update({
            where: {
                n_pedido: n_pedido,
            },
            data: {
                status: alteraStatus,
                entregador: alteraEntregador
            }
        })
        return { dados: "Pedido alterado com sucesso" }
    }

}

export { AlterarPedidoServices }