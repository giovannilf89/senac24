import prismaClient from "../../prisma";

interface DeletarItem{
        id: string
}

class DeletarItemPedidoServices{
    async execute({id}: DeletarItem){
        await prismaClient.item_pedido.delete({
            where: {
                id: id
            },
        })
        return {data: "Registro apagado com sucesso"}
    }
}

export {DeletarItemPedidoServices}