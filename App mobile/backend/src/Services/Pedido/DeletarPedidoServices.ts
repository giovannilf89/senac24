import prismaClient from "../../prisma";

interface DeletarPedido {
    remover: string
}


class DeletarPedidoServices {
    async execute({ remover }: DeletarPedido) {
        await prismaClient.pedido.delete({
            where: {
                id: remover,
            }
        })
        return { dados: "Registro apagado com sucesso" }
    }
}

export { DeletarPedidoServices }