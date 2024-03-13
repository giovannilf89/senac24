import prismaClient from "../../prisma";

interface DeletarItem{
    remove: string
}

class DeletarItemPedidoServices{
    async execute({remove}: DeletarItem){
        await prismaClient.item_pedido.delete({
            where: {
                id: remove,
            },
        })
        return {data: "Registro apagado com sucesso"}
    }
}

export {DeletarItemPedidoServices}