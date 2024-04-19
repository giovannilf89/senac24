import prismaClient from "../../prisma";

interface DeletarPedido {
    id: string
}


class DeletarPedidoServices {
    async execute({ id }: DeletarPedido) {
        await prismaClient.pedido.delete({
            where: {
                id: id,
            }
        })
        return { dados: "Registro apagado com sucesso" }
    }
}

export { DeletarPedidoServices }