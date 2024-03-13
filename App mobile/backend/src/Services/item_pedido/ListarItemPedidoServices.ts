import prismaClient from "../../prisma";


class ListarItemPedidoService{
async execute(){
    const item = await prismaClient.item_pedido.findMany({
        select: {
            id: true,
            quantidade: true,
            produtoId: true,
            pedidoId: true,

        }
    })
    return (item)
}
}

export {ListarItemPedidoService}